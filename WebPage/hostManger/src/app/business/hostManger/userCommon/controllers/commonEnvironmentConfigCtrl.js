define([
    "language/inventory",
    "tiny-lib/jquery"
], function (i18n, $) {
    "use strict";
    var ctrl = ["$scope", "$rootScope", "$compile", "commonEnvironmentConfigServe", "$location", "$timeout",
        function($scope, $rootScope, $compile, commonEnvironmentConfigServe, $location, $timeout) {
            $scope.i18n = i18n;
            //把从自定义服务传值，传过来的赋值给……


            var approvalAllData = JSON.parse(sessionStorage.getItem("admin_approvalAllData"));//重新转换为JSON对象
            var token = sessionStorage.getItem("meeting_token");
            // 页面加载时，防止用户点击浏览器的前进和后退带来的影响
            $rootScope.menus = {
                url: "src/app/framework/views/menus.html"
            };
            $rootScope.footer = {
                url: "src/app/framework/views/footer.html"
            };

            $scope.list = "环境配置页面";


            $scope.displayed = []; // 表示表格实际呈现的数据（开发者默认设置为[]即可）

            var srcData = [
                {
                    "environmentName":"廊坊局点", //环境名称
                    "pointName":"langfang", //局点名称
                    "belongRegion":"Po_123refda" //所属区域

                },
                {
                    "environmentName":"上海局点", //环境名称
                    "pointName":"shanghai", //局点名称
                    "belongRegion":"Po_123refda"

                },
                {
                    "environmentName":"大连局点", //环境名称
                    "pointName":"dalian", //局点名称
                    "belongRegion":"Po_123refda" //所属区域

                },
                {
                    "environmentName":"广州局点", //环境名称
                    "pointName":"guangzhou", //局点名称
                    "belongRegion":"Po_123refda" //所属区域
                }
            ];


            $scope.environmentData = { // 表格源数据，开发者对表格的数据设置请在这里进行
                data: srcData, // 源数据
                state: {
                    filter: false, // 源数据未进行过滤处理
                    sort: false, // 源数据未进行排序处理
                    pagination: false // 源数据未进行分页处理
                }
            };


            $scope.environmentColumns = [
                {
                    title: "环境名称",
                    width: "20%"
                },
                {
                    title: "局点名称",
                    width: "20%"
                },
                {
                    title: "所在局域",
                    width: "15%"
                },
                //{
                //    title: "描述",
                //    width: "20%"
                //},
                {
                    title: "操作",
                    width: "20%"
                }
            ];


        }];
    var module = angular.module("frm");
    module.tinyController("commonEnvironmentConfigCtrl.ctrl",ctrl);
    return module;
});