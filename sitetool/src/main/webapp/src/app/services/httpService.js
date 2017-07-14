/**
 * 基于jquery ajax定义最原始通信类，它默认提供了GET, POST, DELETE, PUT(可以自定义)
 * 默认支持JSON格式的媒体类型
 *
 * 所有方法返回的是支持promise接口的对象（见：http://api.jquery.com/jQuery.ajax/）
 * """
 * The jqXHR objects returned by $.ajax() as of jQuery 1.5 implement the Promise interface, giving them all the properties, methods, and behavior of a Promise (see Deferred object for more information).
 * """
 * REST 规范参考：
 *
 */
/* global define */
/* global $ */
/* global angular */
/* global tinyWidget */
define(['language-remote/framework', 'app-remote/services/tipMsgService', 'app-remote/services/cookieService'],
    function (i18n, TipMsgService, Storage) {
        "use strict";

        var subRegRex = /\{\s*([^\|\}]+?)\s*(?:\|([^\}]*))?\s*\}/g;
        /**
         * Restful接口参数解析，
         * 如/app/kkk/{id}
         * sub("/app/kkk/{id}", {id: 124})
         */
        var sub = function (s, o) {
            return ((s.replace) ? s.replace(subRegRex, function (match, key) {
                return (!angular.isUndefined(o[key])) ? o[key] : match;
            }) : s);
        };

        var TIME_OUT = 10 * 60 * 1000;
        var redirect302 = function (xhr, $state) {
            if (xhr.status === 200 && xhr.getResponseHeader('HW-AJAX-REDIRECT')) {
                (new Storage()).flush();
                window.location.reload();
                return false;
            }

            if (xhr.status === 200 && xhr.getResponseHeader('X-Frame-Maintenance')) {
                $state.go('beingMaintained');
                return false;
            }

            return true;
        };

        /**
         * 当接口返回403时会进行一次自动的容错处理（处理因URL携带agencyID导致切换用户导致的登录异常）
         * 如果URL中未携带agencyID还是出现403异常，表明系统异常则直接跳转到portal页面，避免重定向循环。
         * @param xhr 请求响应
         * @param $scope scope
         */
        var redirect403 = function (xhr, $scope) {
            if (xhr.status === 403 && xhr.getResponseHeader('HW-IAM-FORBIDDEN')) {
                var href = window.location.href;
                var hrefTarget = $scope.delUrlParameter(href, "agencyId");
                if (href !== hrefTarget) {
                    window.location.replace(hrefTarget);
                    return;
                }
                if ($('#console_frame_forbidden_confirm').length === 0) {
                    var options = {
                        type: "error",
                        content: i18n.console_term_errorForbidden_msg,
                        width: "550px",
                        modal: true,
                        "append-to": "body",
                        open: function (evt) {
                        },
                        close: function (evt) {
                            window.location.href = i18n.console_term_portal_link;
                        },
                        buttons: [{
                            key: "console_frame_forbidden_confirm",
                            label: i18n.console_term_confirm_button,
                            focused: true,
                            handler: function (event) {
                                msg.destroy();
                                window.location.href = i18n.console_term_portal_link;
                            }
                        }]
                    };

                    var msg = new tinyWidget.Message(options);
                    msg.show();
                }
            } else if (xhr.status === 403 && xhr.getResponseHeader('HW-SSO-FORBIDDEN')) {
                // redirect into sso login server
                (new Storage()).flush();
                window.location.href = window.appWebPath + '/logout';
            }
        };
        var service = function (mask, $q, storage, $rootScope, $state) {
            this.get = function (config) {
                var error,
                    deferred = $q.defer();
                var settings = {
                    "type": "GET",
                    "contentType": "application/json; charset=UTF-8",
                    "timeout": config.timeout || TIME_OUT,
                    "headers": {
                        "X-Language": window.urlParams.lang || "",
                        "cftk": storage.cookieStorage.getItem((window.app_cookie_prefix || '') + 'cftk') || "",
                        "AgencyId": $rootScope.getUrlParameter('agencyId', true) || "",
                        "region": $rootScope.getUrlParameter('region', true) || ""
                    },
                    "url": !angular.isString(config.url) ? sub(config.url.s, config.url.o) : config.url,
                    "data": config.params || {},
                    "async": config.sync===true?false:true,
                    "beforeSend": function (request, setting) {
                        //是否支持阴影遮罩
                        if (config.mask) {
                            mask.show();
                        }
                        /* jshint -W030 */
                        config.beforeSend && config.beforeSend(request, setting);
                    },
                    "complete": function (xhr, status) {
                        if (config.mask) {
                            mask.hide();
                        }
                        redirect403(xhr, $rootScope);
                    }
                };
                if (config.contentType) {
                    settings.contentType = config.contentType;
                }
                if (config.dataType) {
                    settings.dataType = config.dataType;
                }
                var $ajax = $.ajax(settings);
                if (window.app_enable_framework_503 && !config.disable_503) {
                    error = function (data) {
                        if (data && data.status === 503) {
                            var tipMsg = new TipMsgService();
                            tipMsg.alert("error", i18n.console_term_503Error_label);
                        } else {
                            deferred.reject.apply(deferred, arguments);
                        }
                    };
                } else {
                    error = function () {
                        deferred.reject.apply(deferred, arguments);
                    };
                }
                $ajax.success(function (data, status, xhr) {
                    if (redirect302(xhr, $state)) {
                        deferred.resolve.apply(deferred, arguments);
                    }
                }).error(error);
                return deferred.promise;
            };

            this.post = function (config) {
                var error,
                    deferred = $q.defer();
                var settings = {
                    "type": "POST",
                    "contentType": "application/json; charset=UTF-8",
                    "timeout": config.timeout || TIME_OUT,
                    "headers": {
                        "X-Language": window.urlParams.lang,
                        "cftk": storage.cookieStorage.getItem((window.app_cookie_prefix || '') + 'cftk') || "",
                        "AgencyId": $rootScope.getUrlParameter('agencyId', true) || "",
                        "ProjectName": $rootScope.getUrlParameter('region', true) || "",
                        "region": $rootScope.getUrlParameter('region', true) || ""
                    },
                    "url": !angular.isString(config.url) ? sub(config.url.s, config.url.o) : config.url,
                    "data": typeof config.params === "string" ? config.params : JSON.stringify(config.params),
                    "async": config.sync===true?false:true,
                    "beforeSend": function (request, setting) {
                        //是否支持阴影遮罩
                        if (config.mask) {
                            mask.show();
                        }
                        /* jshint -W030 */
                        config.beforeSend && config.beforeSend(request, setting);
                    },
                    "complete": function (xhr, status) {
                        if (config.mask) {
                            mask.hide();
                        }
                        redirect403(xhr, $rootScope);
                    }
                };
                if (config.contentType) {
                    settings.contentType = config.contentType;
                }
                if (config.dataType) {
                    settings.dataType = config.dataType;
                }
                if(config.headers){
                    settings.headers = config.headers;
                }
                if (config.async) { //异步的处理
                    settings.async = config.async;
                }
                var $ajax = $.ajax(settings);
                if (window.app_enable_framework_503 && !config.disable_503) {
                    error = function (data) {
                        if (data && data.status === 503) {
                            var tipMsg = new TipMsgService();
                            tipMsg.alert("error", i18n.console_term_503Error_label);
                        } else {
                            deferred.reject.apply(deferred, arguments);
                        }
                    };
                } else {
                    error = function () {
                        deferred.reject.apply(deferred, arguments);
                    };
                }
                $ajax.success(function (data, status, xhr) {
                    if (redirect302(xhr, $state)) {
                        deferred.resolve.apply(deferred, arguments);
                    }
                }).error(error);
                return deferred.promise;
            };

            this.deleter = function (config) {
                var error,
                    deferred = $q.defer();
                var settings = {
                    "type": "DELETE",
                    "contentType": "application/json; charset=UTF-8",
                    "timeout": config.timeout || TIME_OUT,
                    "headers": {
                        "X-Language": window.urlParams.lang,
                        "cftk": storage.cookieStorage.getItem((window.app_cookie_prefix || '') + 'cftk') || "",
                        "AgencyId": $rootScope.getUrlParameter('agencyId', true) || "",
                        "region": $rootScope.getUrlParameter('region', true) || ""
                    },
                    "url": !angular.isString(config.url) ? sub(config.url.s, config.url.o) : config.url,
                    "data": !config.params ? null : ('string' === typeof config.params ? config.params : JSON.stringify(config.params || {})),
                    "async": config.sync===true?false:true,
                    "beforeSend": function (request, setting) {
                        //是否支持阴影遮罩
                        if (config.mask) {
                            mask.show();
                        }
                        /* jshint -W030 */
                        config.beforeSend && config.beforeSend(request, setting);
                    },
                    "complete": function (xhr, status) {
                        if (config.mask) {
                            mask.hide();
                        }
                        redirect403(xhr, $rootScope);
                    }
                };
                if (config.contentType) {
                    settings.contentType = config.contentType;
                }
                if (config.dataType) {
                    settings.dataType = config.dataType;
                }
                if(config.headers){
                    settings.headers = config.headers;
                }
                var $ajax = $.ajax(settings);
                if (window.app_enable_framework_503 && !config.disable_503) {
                    error = function (data) {
                        if (data && data.status === 503) {
                            var tipMsg = new TipMsgService();
                            tipMsg.alert("error", i18n.console_term_503Error_label);
                        } else {
                            deferred.reject.apply(deferred, arguments);
                        }
                    };
                } else {
                    error = function () {
                        deferred.reject.apply(deferred, arguments);
                    };
                }
                $ajax.success(function (data, status, xhr) {
                    if (redirect302(xhr, $state)) {
                        deferred.resolve.apply(deferred, arguments);
                    }
                }).error(error);
                return deferred.promise;
            };
            this.put = function (config) {
                var error,
                    deferred = $q.defer();
                var settings = {
                    "type": "PUT",
                    "contentType": "application/json; charset=UTF-8",
                    "timeout": config.timeout || TIME_OUT,
                    "headers": {
                        "X-Language": window.urlParams.lang,
                        "cftk": storage.cookieStorage.getItem((window.app_cookie_prefix || '') + 'cftk') || "",
                        "AgencyId": $rootScope.getUrlParameter('agencyId', true) || "",
                        "region": $rootScope.getUrlParameter('region', true) || ""
                    },
                    "url": !angular.isString(config.url) ? sub(config.url.s, config.url.o) : config.url,
                    "data": typeof config.params === "string" ? config.params : JSON.stringify(config.params || {}),
                    "async": config.sync===true?false:true,
                    "beforeSend": function (request, setting) {
                        //是否支持阴影遮罩
                        if (config.mask) {
                            mask.show();
                        }
                        /* jshint -W030 */
                        config.beforeSend && config.beforeSend(request, setting);
                    },
                    "complete": function (xhr, status) {
                        if (config.mask) {
                            mask.hide();
                        }
                        redirect403(xhr, $rootScope);
                    }
                };
                if (config.contentType) {
                    settings.contentType = config.contentType;
                }
                if (config.dataType) {
                    settings.dataType = config.dataType;
                }
                var $ajax = $.ajax(settings);
                if (window.app_enable_framework_503 && !config.disable_503) {
                    error = function (data) {
                        if (data && data.status === 503) {
                            var tipMsg = new TipMsgService();
                            tipMsg.alert("error", i18n.console_term_503Error_label);
                        } else {
                            deferred.reject.apply(deferred, arguments);
                        }
                    };
                } else {
                    error = function () {
                        deferred.reject.apply(deferred, arguments);
                    };
                }
                $ajax.success(function (data, status, xhr) {
                    if (redirect302(xhr, $state)) {
                        deferred.resolve.apply(deferred, arguments);
                    }
                }).error(error);
                return deferred.promise;
            };

            this.patch = function (config) {
                var error,
                    deferred = $q.defer();
                var settings = {
                    "type": "PATCH",
                    "contentType": "application/json; charset=UTF-8",
                    "timeout": config.timeout || TIME_OUT,
                    "headers": {
                        "X-Language": window.urlParams.lang,
                        "cftk": storage.cookieStorage.getItem((window.app_cookie_prefix || '') + 'cftk') || "",
                        "AgencyId": $rootScope.getUrlParameter('agencyId', true) || "",
                        "region": $rootScope.getUrlParameter('region', true) || ""
                    },
                    "url": !angular.isString(config.url) ? sub(config.url.s, config.url.o) : config.url,
                    "data": typeof config.params === "string" ? config.params : JSON.stringify(config.params || {}),
                    "async": config.sync===true?false:true,
                    "beforeSend": function (request, setting) {
                        //是否支持阴影遮罩
                        if (config.mask) {
                            mask.show();
                        }
                        /* jshint -W030 */
                        config.beforeSend && config.beforeSend(request, setting);
                    },
                    "complete": function (xhr, status) {
                        if (config.mask) {
                            mask.hide();
                        }
                        redirect403(xhr, $rootScope);
                    }
                };
                if (config.contentType) {
                    settings.contentType = config.contentType;
                }
                if (config.dataType) {
                    settings.dataType = config.dataType;
                }
                var $ajax = $.ajax(settings);
                if (window.app_enable_framework_503 && !config.disable_503) {
                    error = function (data) {
                        if (data && data.status === 503) {
                            var tipMsg = new TipMsgService();
                            tipMsg.alert("error", i18n.console_term_503Error_label);
                        } else {
                            deferred.reject.apply(deferred, arguments);
                        }
                    };
                } else {
                    error = function () {
                        deferred.reject.apply(deferred, arguments);
                    };
                }
                $ajax.success(function (data, status, xhr) {
                    if (redirect302(xhr, $state)) {
                        deferred.resolve.apply(deferred, arguments);
                    }
                }).error(error);
                return deferred.promise;
            };

            //不建议使用：返回jqXHR ，而非 $q.deffer().promise，使得如果状态码是2XX，调用的地方有办法获取具体状态码
            this.ajax = function (config) {
                var settings = {
                    "type": config.type,
                    "contentType": "application/json; charset=UTF-8",
                    "timeout": config.timeout || TIME_OUT,
                    "headers": {
                        "X-Language": window.urlParams.lang,
                        "cftk": storage.cookieStorage.getItem((window.app_cookie_prefix || '') + 'cftk') || "",
                        "AgencyId": $rootScope.getUrlParameter('agencyId', true) || "",
                        "region": $rootScope.getUrlParameter('region', true) || ""
                    },
                    "url": !angular.isString(config.url) ? sub(config.url.s, config.url.o) : config.url,
                    "data": typeof config.params === "string" ? config.params : JSON.stringify(config.params || {}),
                    "async": config.sync===true?false:true,
                    "beforeSend": function (request, setting) {
                        //是否支持阴影遮罩
                        if (config.mask) {
                            mask.show();
                        }
                        /* jshint -W030 */
                        config.beforeSend && config.beforeSend(request, setting);
                    },
                    "complete": function (xhr, status) {
                        if (config.mask) {
                            mask.hide();
                        }
                        redirect302(xhr, $state);
                        redirect403(xhr, $rootScope);
                    }
                };
                if (config.contentType) {
                    settings.contentType = config.contentType;
                }
                if (config.dataType) {
                    settings.dataType = config.dataType;
                }
                var $ajax = $.ajax(settings);
                return $ajax;
            };
        };

        service.$injector = ["mask", "$q", "storage", "$rootScope", "$state"];
        return service;
    });