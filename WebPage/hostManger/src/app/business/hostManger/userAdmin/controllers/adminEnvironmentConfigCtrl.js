define([
    "language/inventory",
    "tiny-lib/jquery"
], function (i18n, $) {
    "use strict";
    var ctrl = ["$scope", "$rootScope", "$compile", "adminEnvironmentConfigServe", "$location", "$timeout",
        function($scope, $rootScope, $compile, adminEnvironmentConfigServe, $location, $timeout) {
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



            $scope.environmentData = { // 表格源数据，开发者对表格的数据设置请在这里进行
                data: '', // 源数据
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
                    title: "所属局域",
                    width: "15%"
                },
                {
                    title: "操作用户",
                    width: "20%"
                },
                //{
                //    title: "用户密码",
                //    width: "20%"
                //},
                {
                    title: "ip 地址",
                    width: "20%"
                },
                {
                    title: "操作",
                    width: "20%"
                }
            ];


            //增加环境

            $("#openWindow").on('click', function(event, callback) {



                var addSiteOptions = {
                    title : "添加环境",
                    height : "420px",
                    width : "430px",
                    "content-type": 'url',
                    content: "src/app/business/hostManger/userAdmin/views/include/addEvSite.html",
                    resizable:true,
                    beforeClose: function(){},
                    buttons:[{
                        key:"btnOK",
                        label : 'OK',//按钮上显示的文字
                        focused : true,//默认焦点
                        handler : function(event) {//点击回调函数
                            //注意要修改addServe.html页面的ng-model

                            //把添加页面的数据传给

                            //var jsObj = {
                            //    "total":1,
                            //    "regions": [
                            //        {
                            //            "evName":  $scope.evName,
                            //            "sites": [
                            //                {
                            //                    "siteRegionName": $scope.siteRegionName,
                            //                    "siteRegion": $scope.siteRegion,
                            //                    "siteLoginUser": $scope.siteLoginUser,
                            //                    "siteLoginPwd": $scope.siteLoginPwd,
                            //                    "siteLoginIp": $scope.siteLoginIp
                            //                }
                            //            ]
                            //        }
                            //    ]
                            //};



                            var jsObj = {
                                "total": 1,
                                "regions": [
                                {
                                    "evName": "廊坊",
                                    "sites": [
                                        {
                                            "siteRegion":"lf",
                                            "siteRegionName ": "pub",
                                            "siteLoginUser": "admin",
                                            "siteLoginPwd": "HWS_lf@pub9001",
                                            "siteLoginIp": "10.44.70.245"
                                        }
                                    ]
                                }
                            ]
                            };



                            var evStr = JSON.stringify(jsObj);
                            $scope.operate = {
                                "addPassData":function(){

                                    var promise = adminEnvironmentConfigServe.postEvsite(evStr);
                                    promise.then(
                                        function(response){
                                           //var responseData = JSON.parse(response);

                                            if(response.status== 200){

                                                response.data.regionBeans.forEach(function(value,index,array){
                                                    array[index].showSub = true;
                                                });
                                                $scope.environmentData.data = response.data.regionBeans;

                                            }
                                        },
                                        function(response){
                                            alert(response.msg);
                                        }

                                    )
                                }
                            };
                            $scope.operate.addPassData();
                            win.destroy();

                        }

                    }]
                };

                var win = new tinyWidget.Window(addSiteOptions);
                win.show();

            });

















        }];
    var module = angular.module("frm");
    module.tinyController("adminEnvironmentConfigCtrl.ctrl",ctrl);
    return module;
});