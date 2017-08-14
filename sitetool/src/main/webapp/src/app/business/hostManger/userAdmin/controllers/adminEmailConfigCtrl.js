define([
    "language/inventory",
    "tiny-lib/jquery"
], function (i18n, $) {
    "use strict";
    var ctrl = ["$scope", "$rootScope", "$compile", "$location", "$timeout","tiValid", "adminEmailConfigServe",
        function($scope, $rootScope, $compile, $location, $timeout, tiValid, adminEmailConfigServe) {
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
                initRoles(); //定义一个初始化函数
                $scope.requestOption.getData();
            });

            function initRoles(){
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
                    label8:"显示发送邮箱:",
                    placeholder5:"请输入测试邮件",
                    placeholder6:"请输入发送主题",
                    placeholder7:"请输入显示接收邮箱",
                    placeholder8:"请输入显示发送邮箱",
                    value5:'',
                    value6:'',
                    value7:'',
                    value8:'',
                    tiValidation1:{//验证邮件服务器是否为ip地址
                        "validator":[{
                            rule:"required"
                        },{
                            rule:"ipv4"
                        }]
                    },
                    tiValidation2:{//验证端口号
                        "validator":[{
                            rule:"required"
                        },
                        {rule:"number"}]
                    },
                    tiValidation3:{//验证端口号
                        "validator":[]
                    },
                    tiValidation4:{//验证端口号
                        "validator":[]
                    },
                    tiValidation5:{//验证端口号
                        "validator":[{
                            rule:"required"
                        },{
                            rule:"email"
                        }]
                    },
                    tiValidation6:{//验证端口号
                        "validator":[{
                            rule:"required"
                        }]
                    },
                    tiValidation7:{//验证端口号
                        "validator":[{
                            rule:"required"
                        },{
                            rule:"email"
                        }]
                    },

                    tiValidation8:{//验证端口号
                        "validator":[{
                            rule:"required"
                        },{
                            rule:"email"
                        }]
                    }

                };
                $scope.alertResponse = {  //提示信息
                    contentNullError:false,
                    type:"success",
                    content:""
                };

            }


            function commonConfig (){

                if($scope.emailConfigItem.IdChecked){
                    var mails = [{
                        "mailServer":  $scope.emailConfigItem.value1,//邮件服务器:
                        "sslPort": $scope.emailConfigItem.value2,//端口号
                        "enableSSL":$scope.emailConfigItem.safetyChecked  ,  //安全证书
                        "fromAddr":$scope.emailConfigItem.value8,  //显示发送邮箱:
                        "testAddr": $scope.emailConfigItem.value5 ,  //测试邮件
                        "mailTitle": $scope.emailConfigItem.value6 ,  //发送主题
                        "toAddr":  $scope.emailConfigItem.value7 ,
                        "userName": $scope.emailConfigItem.value3,  //用户名
                        "userPwd": $scope.emailConfigItem.value4   //密码
                    }];
                    $scope.emailConfigItem. tiValidation3 = {//验证用户名
                        "validator":[{ rule:"required"}]
                    };
                    $scope.emailConfigItem. tiValidation4 = {//验证密码
                        "validator":[{ rule:"required"}]
                    }
                }else{
                    var mails = [{
                        "mailServer":  $scope.emailConfigItem.value1,
                        "sslPort": $scope.emailConfigItem.value2,
                        "enableSSL":$scope.emailConfigItem.safetyChecked  ,
                        "fromAddr": $scope.emailConfigItem.value8,
                        "testAddr": $scope.emailConfigItem.value5 ,
                        "mailTitle": $scope.emailConfigItem.value6 ,
                        "toAddr": $scope.emailConfigItem.value7
                    }];
                    $scope.emailConfigItem. tiValidation3 = {//验证用户名
                        "validator":[]
                    };
                    $scope.emailConfigItem. tiValidation4 = {//验证密码
                        "validator":[]
                    }
                }

                $scope.evNameList.forEach(function(value,index,array){
                        console.log( array[index]);
                        //array[index].mails =[] ;
                        array[index].mails = mails;
                    }
                );

                var option = {
                    "total": $scope.evNameList.length,
                    "regions": $scope.evNameList
                };
                return option;
            }


            $scope.sendEmailConfigBtn = function(){

                var str = commonConfig();

                if(!tiValid.check($("#validFormId"))){  //验证
                    tiValid.check($("#validFormId"));
                    return;
                }
                $scope.requestsavaEmail.postSaveData(str);

            };


            $scope.testEmailConfigBtn = function(){
                var str = commonConfig();

                if(!tiValid.check($("#validFormId"))){  //验证
                    tiValid.check($("#validFormId"));
                    return;
                }
                console.log(str);
                $scope.requestsavaEmail.postTestData(str);

            };







            //下发邮件配置
            $scope.requestsavaEmail ={
                "postSaveData": function(str){
                    var  promise = adminEmailConfigServe.sendEmailConfig(str);
                    promise.then(function(response){

                            if(response.status== 200){
                                $scope.alertResponse = {  //提示信息
                                    contentNullError:true,
                                    type:"success",
                                    content:response.msg
                                };
                            }else {
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
                                content:response.msg
                            };

                        });
                },
                "postTestData": function(str){
                    var  promise = adminEmailConfigServe.testEmailConfig(str);
                    promise.then(function(response){

                            if(response.status== 200){
                                $scope.alertResponse = {  //提示信息
                                    contentNullError:true,
                                    type:"success",
                                    content:"邮件配置成功"
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



            //树的接口数据请求
            $scope.requestOption ={
                "getData": function(){
                    var  promise = adminEmailConfigServe.getTree();
                    promise.then(function(response){
                            console.log(response);
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
                }
            };



        }];
    var module = angular.module("frm");
    module.tinyController("adminEmailConfigCtrl.ctrl",ctrl);
    return module;
});