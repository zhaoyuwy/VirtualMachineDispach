define([
    "language/inventory",
    "tiny-lib/jquery"
], function (i18n, $) {
    "use strict";
    var ctrl = ["$scope", "$rootScope", "$compile", "$location", "$timeout","tiValid", "commonSystemConfigServe",
        function($scope, $rootScope, $compile, $location, $timeout, tiValid, commonSystemConfigServe) {
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

            $scope.$on("$viewContentLoaded", function () { //页面渲染完成执行的函数  类似于$(function(){}),或者$(document).ready()函数
                init(); //定义一个初始化函数

            });

            function init(){ //组件初始化

                $scope.systemConfigItem ={
                    required:true,
                    placeholder1:'请选择会话超时时间',
                    placeholder2:'请选择登录密码错误锁定账户',
                    placeholder3:'请选择登录密码错误锁定时长',
                    label1:"会话超时时间:",
                    label2:"登录密码错误锁定账户:",
                    label3:"登录密码错误锁定时长:",
                    value1:'',
                    value2:'',
                    value3:'',
                    tiValidation1:{//验证邮件服务器是否为ip地址
                        "validator":[{
                            rule:"required"
                        },{
                            rule:"rangeValue",
                            param:[0,100],
                            errorMsg:"请输入0-100之间的整数"
                        }]
                    },
                    tiValidation2:{//验证邮件服务器是否为ip地址
                        "validator":[{
                            rule:"required"
                        },{
                            rule:"rangeValue",
                            param:[0,100],
                            errorMsg:"请输入0-100之间的整数"
                        }]
                    },
                    tiValidation3:{//验证邮件服务器是否为ip地址
                        "validator":[{
                            rule:"required"
                        },{
                            rule:"rangeValue",
                            param:[0,100],
                            errorMsg:"请输入0-100之间的整数"
                        }]
                    }

                }

                $scope.alertResponse = {  //提示信息
                    contentNullError:false,
                    type:"success",
                    content:""
                };

            }



            function commonConfig (){
                var systemConfig = [{
                    "sessionPeriodTime": $scope.systemConfigItem.value1,
                    "lockTime": $scope.systemConfigItem.value2,
                    "loginFailedCount": $scope.systemConfigItem.value3
                }];

                return systemConfig;
            }

            $scope.setSystemConfig = function(){
                var str = commonConfig();
                if(!tiValid.check($("#validFormId"))){  //验证
                    tiValid.check($("#validFormId"));
                    return;
                }
                $scope.requestOption.postData(str);
            };

            //请求树的接口数据
            $scope.requestOption ={
                "postData": function(str){
                    var  promise = commonSystemConfigServe.setSystemConfig(str);
                    promise.then(function(response){
                            if(response.status== 200){
                                $scope.alertResponse = {  //提示信息
                                    contentNullError:true,
                                    type:"success",
                                    content:response.msg
                                };
                            }else{
                                $scope.alertResponse = {  //提示信息
                                    contentNullError:true,
                                    type:"error",
                                    content:"错误信息:"+response.msg
                                };
                            }
                        },
                        function(response){
                            $scope.alertResponse = {  //提示信息
                                contentNullError:true,
                                type:"error",
                                content:"错误信息:"+response.msg
                            };
                        });
                }
            };


        }];
    var module = angular.module("frm");
    module.tinyController("commonSystemConfigCtrl.ctrl",ctrl);
    return module;
});