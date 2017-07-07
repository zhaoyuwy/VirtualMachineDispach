define([
    "language/inventory",
    "tiny-lib/jquery"
], function (i18n, $) {
    "use strict";
    var ctrl = ["$scope", "$rootScope", "$compile", "commonEmailConfigServe", "$location", "$timeout",
        function($scope, $rootScope, $compile, commonEmailConfigServe, $location, $timeout) {
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

            $scope.list = "邮件配置页面";



            $scope.displayed = [];

            var srcData = [
                {
                    "email_Info":"fhdajkfh", //信息
                    "email_name":"langfang" //名称

                },
                {
                    "email_Info":"fhdajkfh",
                    "email_name":"上海"
                },
                {
                    "email_Info":"fhdajkfh",
                    "email_name":"大连"

                },
                {
                    "email_Info":"fhdajkfh",
                    "email_name":"广州"
                }
            ];


            $scope.emailData = { // 表格源数据，开发者对表格的数据设置请在这里进行
                data: srcData, // 源数据
                state: {
                    filter: false, // 源数据未进行过滤处理
                    sort: false, // 源数据未进行排序处理
                    pagination: false // 源数据未进行分页处理
                }
            };


            $scope.emailColumns = [
                {
                    title: "信息",
                    width: "20%"
                },
                {
                    title: "名称",
                    width: "20%"
                },
                {
                    title: "操作",
                    width: "20%"
                }
            ];


        }];
    var module = angular.module("frm");
    module.tinyController("commonEmailConfigCtrl.ctrl",ctrl);
    return module;
});