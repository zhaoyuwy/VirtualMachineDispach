define([
    "language/inventory",
    "tiny-lib/jquery"
], function (i18n, $) {
    "use strict";
    var ctrl = ["$scope", "$rootScope", "$compile", "adminSystemConfigServe", "$location", "$timeout",
        function($scope, $rootScope, $compile, adminSystemConfigServe, $location, $timeout) {
            $scope.i18n = i18n;
            //把从自定义服务传值，传过来的赋值给……


            //var approvalAllData = JSON.parse(sessionStorage.getItem("admin_approvalAllData"));//重新转换为JSON对象
            //var token = sessionStorage.getItem("meeting_token");
            // 页面加载时，防止用户点击浏览器的前进和后退带来的影响
            $rootScope.menus = {
                url: "src/app/framework/views/menus.html"
            };
            $rootScope.footer = {
                url: "src/app/framework/views/footer.html"
            };

            $scope.systemConfigItem ={
                placeholder1:'请选择会话超时时间',
                placeholder2:'请选择登录密码错误锁定账户',
                placeholder3:'请选择登录密码错误锁定时长',
                label1:"会话超时时间:",
                label2:"登录密码错误锁定账户:",
                label3:"登录密码错误锁定时长:",
                selectedId1:'',
                selectedId2:'',
                selectedId3:'',
                disable:false,
                panelMaxHeight:"200px",
                panelWidth:'190px',
                options1:'',
                options2:'',
                options3:'',
                change1:function(option){

                },
                change2:function(option){

                },
                change3:function(option){

                }
            }






        }];
    var module = angular.module("frm");
    module.tinyController("adminSystemConfigCtrl.ctrl",ctrl);
    return module;
});