/**
 * 定义的整体框架的 路由地址
 * Created on 13-12-25.
 */
/* global define */
/* global $ */
/* global angular */
define(["tiny-lib/angular", "lazy-load/lazyLoad"],
    function (angular, lazyLoadModule) {
        "use strict";
        var nonsupportRegion = {
            url: "src/app/framework/views/nonsupportRegion.html"
        };

        var beingMaintained = {
            url: "src/app/framework/views/beingMaintained.html"
        };

        var accessDeclined = {
            url: "src/app/framework/views/accessDeclined.html"
        };
        var  hostMangerTotal = {
            url: "src/app/framework/views/hostMangerTotal.html"
        };
        var login = {
            url:"src/app/framework/views/login.html"
        };

        var configArr = [
            {
                name: "home",
                url: "/home"
            },


            {
                name: 'hostMangerTotal',
                url: "/hostMangerTotal",
                templateUrl: hostMangerTotal.url,
                controller: "hostMangerTotal.ctrl",
                scripts: {
                    'controllers': ['app-remote/framework/controllers/hostMangerTotalCtrl']
                }
            },


            //主机管理系统的路由配置

            //普通用户
                //虚拟机申请
            {
               name:"hostMangerTotal.commonApplyMachine",
                url:"/commonApplyMachine",
                templateUrl:"src/app/business/hostManger/userCommon/views/commonApplyMachine.html",
                controller:"commonApplyMachineCtrl.ctrl",
                scripts:{
                    'controllers':['app/business/hostManger/userCommon/controllers/commonApplyMachineCtrl'],
                    'services': ['app/business/hostManger/userCommon/services/commonApplyMachine']
                }
            },

            {
                name:"hostMangerTotal.commonSystemManger",
                url:"/commonSystemManger",
                templateUrl:"src/app/business/hostManger/userCommon/views/commonSystemManger.html",
                controller:"commonSystemMangerCtrl.ctrl",
                scripts:{
                    'controllers':['app/business/hostManger/userCommon/controllers/commonSystemMangerCtrl'],
                    'services': ['app/business/hostManger/userCommon/services/commonSystemManger']
                }
            },

            //系统管理的四个子页面
            {
                name:"hostMangerTotal.commonEnvironmentConfig",
                url:"/commonEnvironmentConfig",
                templateUrl:"src/app/business/hostManger/userCommon/views/commonEnvironmentConfig.html",
                controller:"commonEnvironmentConfigCtrl.ctrl",
                scripts:{
                    'controllers':['app/business/hostManger/userCommon/controllers/commonEnvironmentConfigCtrl'],
                    'services': ['app/business/hostManger/userCommon/services/commonEnvironmentConfig']
                }
            },

            {
                name:"hostMangerTotal.commonEmailConfig",
                url:"/commonEmailConfig",
                templateUrl:"src/app/business/hostManger/userCommon/views/commonEmailConfig.html",
                controller:"commonEmailConfigCtrl.ctrl",
                scripts:{
                    'controllers':['app/business/hostManger/userCommon/controllers/commonEmailConfigCtrl'],
                    'services': ['app/business/hostManger/userCommon/services/commonEmailConfig']
                }
            },
            {
                name:"hostMangerTotal.commonThresholdConfig",
                url:"/commonThresholdConfig",
                templateUrl:"src/app/business/hostManger/userCommon/views/commonThresholdConfig.html",
                controller:"commonThresholdConfigCtrl.ctrl",
                scripts:{
                    'controllers':['app/business/hostManger/userCommon/controllers/commonThresholdConfigCtrl'],
                    'services': ['app/business/hostManger/userCommon/services/commonThresholdConfig']
                }
            },
            {
                name:"hostMangerTotal.commonSystemConfig",
                url:"/commonSystemConfig",
                templateUrl:"src/app/business/hostManger/userCommon/views/commonSystemConfig.html",
                controller:"commonSystemConfigCtrl.ctrl",
                scripts:{
                    'controllers':['app/business/hostManger/userCommon/controllers/commonSystemConfigCtrl'],
                    'services': ['app/business/hostManger/userCommon/services/commonSystemConfig']
                }
            },



            //管理者用户
                //虚拟机申请
            {
                name:"hostMangerTotal.adminApplyMachine",
                url:"/adminApplyMachine",
                templateUrl:"src/app/business/hostManger/userAdmin/views/adminApplyMachine.html",
                controller:"adminApplyMachineCtrl.ctrl",
                scripts:{
                    'controllers':['app/business/hostManger/userAdmin/controllers/adminApplyMachineCtrl'],
                    'services': ['app/business/hostManger/userAdmin/services/adminApplyMachine']
                }
            },

                //信息收集
            {
                name:"hostMangerTotal.adminInfoCollection",
                url:"/adminInfoCollection",
                templateUrl:"src/app/business/hostManger/userAdmin/views/adminInfoCollection.html",
                controller:"adminInfoCollectionCtrl.ctrl",
                scripts:{
                    'controllers':['app/business/hostManger/userAdmin/controllers/adminInfoCollectionCtrl'],
                    'services': ['app/business/hostManger/userAdmin/services/adminInfoCollection']
                }

            },
                //系统管理
            {
                name:"hostMangerTotal.adminSystemManger",
                url:"/adminSystemManger",
                templateUrl:"src/app/business/hostManger/userAdmin/views/adminSystemManger.html",
                controller:"adminSystemMangerCtrl.ctrl",
                scripts:{
                    'controllers':['app/business/hostManger/userAdmin/controllers/adminSystemMangerCtrl'],
                    'services': ['app/business/hostManger/userAdmin/services/adminSystemManger']
                }
            },
                //系统管理的四个子页面
            {
                name:"hostMangerTotal.adminEnvironmentConfig",
                url:"/adminEnvironmentConfig",
                templateUrl:"src/app/business/hostManger/userAdmin/views/adminEnvironmentConfig.html",
                controller:"adminEnvironmentConfigCtrl.ctrl",
                scripts:{
                    'controllers':['app/business/hostManger/userAdmin/controllers/adminEnvironmentConfigCtrl'],
                    'services': ['app/business/hostManger/userAdmin/services/adminEnvironmentConfig']
                }
            },

            {
                name:"hostMangerTotal.adminEmailConfig",
                url:"/adminEmailConfig",
                templateUrl:"src/app/business/hostManger/userAdmin/views/adminEmailConfig.html",
                controller:"adminEmailConfigCtrl.ctrl",
                scripts:{
                    'controllers':['app/business/hostManger/userAdmin/controllers/adminEmailConfigCtrl'],
                    'services': ['app/business/hostManger/userAdmin/services/adminEmailConfig']
                }
            },
            {
                name:"hostMangerTotal.adminThresholdConfig",
                url:"/adminThresholdConfig",
                templateUrl:"src/app/business/hostManger/userAdmin/views/adminThresholdConfig.html",
                controller:"adminThresholdConfigCtrl.ctrl",
                scripts:{
                    'controllers':['app/business/hostManger/userAdmin/controllers/adminThresholdConfigCtrl'],
                    'services': ['app/business/hostManger/userAdmin/services/adminThresholdConfig']
                }
            },
            {
                name:"hostMangerTotal.adminSystemConfig",
                url:"/adminSystemConfig",
                templateUrl:"src/app/business/hostManger/userAdmin/views/adminSystemConfig.html",
                controller:"adminSystemConfigCtrl.ctrl",
                scripts:{
                    'controllers':['app/business/hostManger/userAdmin/controllers/adminSystemConfigCtrl'],
                    'services': ['app/business/hostManger/userAdmin/services/adminSystemConfig']
                }
            },




            {name:"login",
             url:"/login",
             templateUrl: login.url,
             controller: "loginCtrl.ctrl",
             scripts: {
                'controllers': ['app-remote/framework/controllers/loginCtrl']
             }
            },

            {
                name: "nonsupportRegion",
                url: "/nonsupportRegion",
                templateUrl: nonsupportRegion.url,
                controller: "nonsupportRegion.ctrl",
                scripts: {
                    'controllers': ['app-remote/framework/controllers/nonsupportRegionCtrl']
                }

            },
            {
                name: "beingMaintained",
                url: "/beingMaintained",
                templateUrl: beingMaintained.url,
                controller: "beingMaintained.ctrl",
                scripts: {
                    'controllers': ['app-remote/framework/controllers/beingMaintainedCtrl']
                }

            },
            {
                name: "accessDeclined",
                url: "/accessDeclined",
                templateUrl: accessDeclined.url,
                controller: "accessDeclined.ctrl",
                scripts: {
                   'controllers': ['app-remote/framework/controllers/accessDeclinedCtrl']
                }
            }
        ];

        var frmModule = angular.module("frm", ["ui.router"]);
        frmModule = lazyLoadModule.makeLazy(frmModule);
        frmModule.tinyStateConfig({stateConfig: configArr});
        frmModule.tinyStateConfig({urlMatch: [["/login"]]});
        return frmModule;
    });



//define(["ui-router/angular-ui-router"], function (router) {
//    "use strict";
//
//    var serviceConfigs = ["$stateProvider","$urlRouterProvider", "$controllerProvider", function ($stateProvider,  $urlRouterProvider, $controllerProvider) {
//
//        //$urlRouterProvider.when("/home/configurationManage","/home/configurationManage/configurationManageIAM");
//        $urlRouterProvider.otherwise("/console/hostManger");
//
//
//    }];
//
//    var frameworkConfig = angular.module("frm", ["ui.router"]);
//    frameworkConfig.config(serviceConfigs);
//    return frameworkConfig;
//});
