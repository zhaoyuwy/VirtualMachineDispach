/**
 * Created on 2015/1/31.
 */
/* global define */
/* global $ */
/* global angular */
define(["fixtures/frameworkFixture", 'app-remote/framework/localization/config', "app-remote/business/hostManger/configures/config"], function (fixtures, localizationConfig, configures) {
    "use strict";
    var framework = {
        "beforeSend": function (request, setting) {
            request.setRequestHeader('X-Request-From', 'Framework');
        }
    };

    var service = function ($q, camel) {
        this.queryEndpoints = function (options) {
            options = options || {};
            var promise = camel.get({
                'url': window.appWebPath + '/rest/silvan/rest/v1.0/endpoints',
                "timeout": 60000,
                "params": {
                    "start": options.start || 0,
                    "limit": options.limit || 0,
                    "region": options.region
                },
                "beforeSend": function (request, setting) {
                    request.setRequestHeader("Frame-Domain-Type", localizationConfig.x_domain_type || '');
                    framework.beforeSend(request, setting);
                }
            });
            return promise;
        };

        this.queryRegions = function (options) {
            options = options || {};
            var promise = camel.get({
                'url': window.appWebPath + '/rest/silvan/rest/v1.0/regions',
                "timeout": 60000,
                "params": {
                    "start": options.start || 0,
                    "limit": options.limit || 0
                },
                "sync":true,
                "beforeSend": function (request, setting) {
                    request.setRequestHeader("Frame-Domain-Type", localizationConfig.x_domain_type || '');
                    framework.beforeSend(request, setting);
                }
            });
            return promise;
        };

        this.changeRegion = function (options) {
            options = options || {};
            var promise = camel.get({
                'url': window.appWebPath + '/changeRegion',
                "timeout": 60000,
                "mask": true,
                "params": {
                    "regionId": options.region
                },
                "beforeSend": framework.beforeSend
            });
            return promise;
        };

        this.getUserKeyPairs = function () {
            var promise = camel.get({
                'url': window.appWebPath + '/keyPairs',
                "timeout": 60000,
                "mask": true,
                "beforeSend": framework.beforeSend
            });
            return promise;
        };

        this.getLoginUser = function () {
            var promise = camel.get({
                'url': window.appWebPath + '/me',
                "timeout": 60000,
                "beforeSend": framework.beforeSend,
                "sync":true
            });
            return promise;
        };




        //登录页面的http请求

        this.HECPASS_login = function (param) {
            var promise = camel.post({
                'url': configures.hostManger_url+ '/login',
                "timeout": 60000,
                "beforeSend": framework.beforeSend,
                "params":param,
                "sync":true
            });
            return promise;
        };


    };

    service.$injector = ["$q", "camel"];
    return service;
});
