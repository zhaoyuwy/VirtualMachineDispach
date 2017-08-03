define([
    "language/inventory",
    "tiny-lib/jquery"
], function (i18n, $) {
    "use strict";
    var ctrl = ["$scope", "$rootScope", "$compile", "adminThresholdConfigServe", "$location", "$timeout",
        function($scope, $rootScope, $compile, adminThresholdConfigServe, $location, $timeout) {
            $scope.i18n = i18n;
            //把从自定义服务传值，传过来的赋值给……

            //var approvalAllData = JSON.parse(sessionStorage.getItem("admin_approvalAllData"));//重新转换为JSON对象
            //var token = sessionStorage.getItem("meeting_token");
            //// 页面加载时，防止用户点击浏览器的前进和后退带来的影响
            $rootScope.menus = {
                url: "src/app/framework/views/menus.html"
            };
            $rootScope.footer = {
                url: "src/app/framework/views/footer.html"
            };

           $scope.thresholdConfigItem ={
               placeholder1:'请选择虚拟机cpu占用百分比',
               placeholder2:'请选择虚拟机内存占用百分比',
               label1:"虚拟机cpu占用百分比:",
               label2:"虚拟机内存占用百分比:",
               selectedId1:'',
               selectedId2:'',
               disable:false,
               panelMaxHeight:"200px",
               panelWidth:'190px',
               options1:'',
               options2:'',
               change1:function(option){

               },
               change2:function(option){

               }
           }


        }];
    var module = angular.module("frm");
    module.tinyController("adminThresholdConfigCtrl.ctrl",ctrl);
    return module;
});