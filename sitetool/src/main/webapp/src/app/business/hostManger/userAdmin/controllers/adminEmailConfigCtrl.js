define([
    "language/inventory",
    "tiny-lib/jquery"
], function (i18n, $) {
    "use strict";
    var ctrl = ["$scope", "$rootScope", "$compile", "adminEmailConfigServe", "$location", "$timeout",
        function($scope, $rootScope, $compile, adminEmailConfigServe, $location, $timeout) {
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


            $scope.emailConfigItem = {
                label1:"邮件服务器:",
                required:true,
                placeholder1:"请输入邮件服务器",
                itemVerticalAlign1:'width:73px',
                value1:'',
                value2:'',
                label2:'端口号:',
                placeholder2:"请输入端口号",
                IdChecked:false,
                IdTitle:"身份验证",
                IdDisabled:true,
                IDClick:function(IdChecked){
                    if(IdChecked ==true){
                        $scope.emailConfigItem.IdDisabled =false;

                    }else if(IdChecked ==false){
                        $scope.emailConfigItem.IdDisabled =true;

                    }
                },
                IDChange:function(IdChecked){
                    if(IdChecked ==true){
                        $scope.emailConfigItem.IdDisabled =false;

                    }else if(IdChecked ==false){
                        $scope.emailConfigItem.IdDisabled =true;

                    }
                },
                label3:"用户名:",
                label4:"密码:",
                placeholder3:"请输入用户名",
                placeholder4:"请输入密码",
                value3:'',
                value4:'',
                safetyCols:{
                    number: 2,
                    gap:["80px", "80px"]
                },
                safetyChecked:false,
                safetyTitle:"服务器是要求安全连接",

                safetyClick:function(safetyChecked){

                },
                safetyChange:function(safetyChecked){

                },
                label5:"测试邮件:",
                label6:"发送主题:",
                label7:"显示接收邮箱:",
                placeholder5:"请输入测试邮件",
                placeholder6:"请输入发送主题",
                placeholder7:"请输入显示接收邮箱",
                value5:'',
                value6:'',
                value7:''

            };



        }];
    var module = angular.module("frm");
    module.tinyController("adminEmailConfigCtrl.ctrl",ctrl);
    return module;
});