/* global define */
define([
        "lazy-load/lazyLoad",
        "ui-router/angular-ui-router"
    ],
    function (lazyLoadModule) {
        "use strict";
        //为满足框架 hash 前缀工具marsRev的限制(url不能拼接) 设置的一些变量
        //定义框架的路由配置module
        var Config = [
            {
                name: 'console',
                url: '/console',
                templateUrl: "src/app/business/common/views/index.html",
                controller: 'index.ctrl',
                scripts: {
                    'controllers': ['app/business/common/controllers/indexCtrl'],
                    'services': ['src/app/business/common/services/indexServ']
                }
            }

        ];

        var module = angular.module("basic.config", ["ui.router"]);
        module = lazyLoadModule.makeLazy(module);
        module.tinyStateConfig({stateConfig: Config});

        function getAttr(scope, attr) {
            var data = null;
            try {
                data = scope.$eval(attr);
            } catch (e) {
            }

            return data;
        }

        // 加载效果
        module.directive("localLoading", function () {
            var config = {
                restrict: 'EA',
                template: "<div></div>",
                link: function (scope, iElement, iAttrs) {
                    $(iElement).parent().css("position", "relative");
                    $(iElement).parent().addClass("clearfix");
                    iElement = $(iElement).find("div");
                    $(iElement).addClass("local-loading");
                    $(iElement).append("<div class='local-loading-gif'></div>");
                    var height = getAttr(scope, iAttrs.height) || "100%";
                    var width = getAttr(scope, iAttrs.width) || "100%";
                    var display = getAttr(scope, iAttrs.display);
                    $(iElement).css("height", height);
                    $(iElement).css("width", width);
                    if (!display) {
                        $(iElement).hide();
                    }
                    scope.$watch(iAttrs.display, function (newValue, oldValue) {
                        if (newValue) {
                            $(iElement).show();
                        }
                        else {
                            $(iElement).hide();
                        }
                    });
                }
            };

            return config;
        });

        return module;
    });
