/**
 * Created by cWX444815 on 2017/3/28.
 */
define([ "language/inventory"], function (i18n) {
    "use strict";
    var ctrl = ["$rootScope", "$scope", "$sce","$state","$location",function ($rootScope, $scope, $sce,$state, $location) {
        $scope.i18n = i18n;
        var navList = {"children":[]};
        $rootScope.leftmenuNumber =sessionStorage.getItem('host-leftmenuNumber');
        if( $rootScope.leftmenuNumber == null || $rootScope.leftmenuNumber ==""){ //重新登录
            $rootScope.meeting_username = '';
            sessionStorage.setItem('hostManger','');
            //$rootScope.meeting_token = '';
            //sessionStorage.setItem('meeting_token','');
            $location.path('/login');
        }else if($rootScope.leftmenuNumber=="one"){
            navList.children = [
                                    {
                                        "text": i18n.virtualMachine_apply,
                                        "icons":'icons-image',
                                        "state":"hostMangerTotal.commonApplyMachine"
                                    },
                                    {
                                        "text": i18n.system_manger,
                                        "icons":'icons-image',
                                        //"state":"hostMangerTotal.commonSystemManger"
                                        "state":"hostMangerTotal.commonEnvironmentConfig",
                                        "children":[
                                            {
                                                "text": i18n.environmentConfig,
                                                "icons":'icons-image',
                                                "state":"hostMangerTotal.commonEnvironmentConfig"
                                            },
                                            {
                                                "text": i18n.emailConfig,
                                                "icons":'icons-image',
                                                "state":"hostMangerTotal.commonEmailConfig"
                                            },
                                            {
                                                "text": i18n.thresholdConfig,
                                                "icons":'icons-image',
                                                "state":"hostMangerTotal.commonThresholdConfig"
                                            },
                                            {
                                                "text": i18n.systemConfig,
                                                "icons":'icons-image',
                                                "state":"hostMangerTotal.commonSystemConfig"
                                            }
                                        ]
                                    }
                                ];
        }else if($rootScope.leftmenuNumber=="two"){
            navList.children = [
                                    {
                                        "text": i18n.virtualMachine_apply,
                                        "icons":'icons-image',
                                        "state":"hostMangerTotal.adminApplyMachine"
                                    },
                                    {
                                        "text": i18n.info_collection,
                                        "icons":'icons-image',
                                        "state":"hostMangerTotal.adminInfoCollection"
                                    },
                                    {
                                        "text": i18n.system_manger,
                                        "icons":'icons-image',
                                        //"state":"hostMangerTotal.adminSystemManger",
                                        "state":"hostMangerTotal.adminEnvironmentConfig",
                                        "children":[
                                            {
                                                "text": i18n.environmentConfig,
                                                "icons":'icons-image',
                                                "state":"hostMangerTotal.adminEnvironmentConfig"
                                            },
                                            {
                                                "text": i18n.emailConfig,
                                                "icons":'icons-image',
                                                "state":"hostMangerTotal.adminEmailConfig"
                                            },
                                            {
                                                "text": i18n.thresholdConfig,
                                                "icons":'icons-image',
                                                "state":"hostMangerTotal.adminThresholdConfig"
                                            },
                                            {
                                                "text": i18n.systemConfig,
                                                "icons":'icons-image',
                                                "state":"hostMangerTotal.adminSystemConfig"
                                            }
                                        ]
                                    }
                                ];

        }




        $scope.leftMenu = navList;

    }];

    var frameModule = angular.module('frm');
    frameModule.tinyController('hostMangerTotal.ctrl',ctrl);
    return frameModule;
});