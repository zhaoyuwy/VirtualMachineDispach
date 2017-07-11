define([
    "language/inventory",
    "tiny-lib/jquery"
], function (i18n, $) {
    "use strict";
    var ctrl = ["$scope", "$rootScope", "$compile", "adminInfoCollectionServe", "$location", "$timeout",
        function($scope, $rootScope, $compile, adminInfoCollectionServe, $location, $timeout) {
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

            // 初始值  我的跟踪 我的代办 会议查询 (出系统用户外，其他都显示)
            $rootScope.userSystemBlank = true;





        }];
    var module = angular.module("frm");
    module.tinyController("adminInfoCollectionCtrl.ctrl",ctrl);
    return module;
});