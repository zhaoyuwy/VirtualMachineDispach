define([
    "language/inventory",
    "tiny-lib/jquery"
], function (i18n, $) {
    "use strict";
    var ctrl = ["$scope", "$rootScope", "$compile", "$location", "$timeout","tiValid","commonThresholdConfigServe",
        function($scope, $rootScope, $compile, $location, $timeout, tiValid, commonThresholdConfigServe) {
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

            $scope.$on("$viewContentLoaded", function () { //页面渲染完成执行的函数  类似于$(function(){}),或者$(document).ready()函数
                init(); //定义一个初始化函数
                $scope.requestOption.getData();

            });

            function init(){ //组件初始化

                $scope.thresholdConfigItem ={
                    required:true,
                    placeholder1:'请选择虚拟机cpu占用百分比',
                    placeholder2:'请选择虚拟机内存占用百分比',
                    label1:"虚拟机cpu占用百分比:",
                    label2:"虚拟机内存占用百分比:",
                    value1:'',
                    value2:'',
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
                    }

                }

                $scope.alertResponse = {  //提示信息
                    contentNullError:false,
                    type:"success",
                    content:""
                };
            }



            function commonConfig (){
                var thresholds = [{
                    "vmCpuAlarmPercent": $scope.thresholdConfigItem.value1,
                    "vmMemAlarmPercent": $scope.thresholdConfigItem.value2
                }];

                $scope.evNameList.forEach(function(value,index,array){
                        array[index].thresholds = thresholds;
                    }
                );

                var option = {
                    "total": $scope.evNameList.length,
                    "regions": $scope.evNameList
                };
                return option;
            }

            $scope.sendThreshold = function(){
                var str = commonConfig();

                if(!tiValid.check($("#validFormId"))){  //验证
                    tiValid.check($("#validFormId"));
                    return;
                }
                $scope.requestOption.postData(str);
            };

            //请求树的接口数据
            $scope.requestOption ={
                "getData": function(){
                    var  promise = commonThresholdConfigServe.getTree();
                    promise.then(function(response){
                            if(response.status== 200){
                                $scope.evNameList = [];
                                response.data.regionBeans.forEach(function(value,index,array){
                                    $scope.evNameList.push({evName:array[index].evName});
                                });


                            } else if(response.status== -1){
                                $scope.alertResponse = {  //提示信息
                                    contentNullError:true,
                                    type:"error",
                                    content:response.msg+"请检查是否添加环境节点！"
                                };
                            }else{
                                $scope.alertResponse = {  //提示信息
                                    contentNullError:true,
                                    type:"error",
                                    content:response.msg+"请检查是否添加环境节点！"
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
                },
                "postData": function(str){
                    var  promise = commonThresholdConfigServe.sendThresholdData(str);
                    console.log(str);
                    promise.then(function(response){
                            console.log(response);
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
    module.tinyController("commonThresholdConfigCtrl.ctrl",ctrl);
    return module;
});