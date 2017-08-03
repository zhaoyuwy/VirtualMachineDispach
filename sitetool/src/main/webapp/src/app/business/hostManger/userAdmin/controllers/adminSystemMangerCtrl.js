define([
    "language/inventory",
    "tiny-lib/jquery"
], function (i18n, $) {
    "use strict";

    var ctrl = ["$scope", "$rootScope", "$compile", "adminSystemMangerServe", "$location", "$timeout",
        function($scope, $rootScope, $compile, adminSystemMangerServe, $location, $timeout) {
            $scope.i18n = i18n;

            var token = sessionStorage.getItem("meeting_token");
            // 页面加载时，防止用户点击浏览器的前进和后退带来的影响
            $rootScope.menus = {
                url: "src/app/framework/views/menus.html"
            };
            $rootScope.footer = {
                url: "src/app/framework/views/footer.html"
            };


        }];
    var module = angular.module("frm");
    module.tinyController("adminSystemMangerCtrl.ctrl",ctrl);
    return module;
});