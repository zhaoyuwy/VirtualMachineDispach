define([
    "language/inventory",
    "tiny-lib/jquery"
], function (i18n, $) {
    "use strict";
    var ctrl = ["$scope", "$rootScope", "$compile","$location", "$timeout", "adminEnvironmentConfigServe",
        function($scope, $rootScope, $compile, $location, $timeout, adminEnvironmentConfigServe) {
            $scope.i18n = i18n;

            // 页面加载时，防止用户点击浏览器的前进和后退带来的影响
            $rootScope.menus = {
                url: "src/app/framework/views/menus.html"
            };
            $rootScope.footer = {
                url: "src/app/framework/views/footer.html"
            };

            $scope.alertInfo = {  //提示信息
                contentNullError:false,
                type:"error",
                content:""
            };


            $scope.alertResponse = {  //提示信息
                contentNullError:false,
                type:"success",
                content:""
            };

            //分页工具导航条
            //$scope.pagingModel = {
            //    "id":"pagid3",
            //    "totalRecords" :'',
            //     displayLength:5,
            //    "type" : "full_numbers",
            //    "hideDisplayLength" : true,
            //    "callback" : function(obj) {  //点击分页的回调函数
            //        $scope.environmentData.data = '';
            //
            //        $scope.environmentData.data = JSON.parse(sessionStorage.getItem('evData'))[obj.currentPage-1];
            //        //$rootScope.environmentData.data = $scope.environmentData.data;
            //        $scope.$digest();//个$digest循环运行时，watchers会被执行来检查scope中的models变化，在上下文之外改变,监听函数可能没监控到，module的变化
            //        //$scope.$apply();
            //
            //    }
            //};


            $scope.pagingModel = {
                totalItems:'',
                currentPage:1,
                pageSize:{
                    size: 10,
                    options: [10, 20, 40, 60],
                    change:function(currentPage,pageSizeNum,totalItems){
                    }
                },
                pageNumChange:function(currentPage,pageSizeNum,totalItems){
                    //前端分页 上面的hostMangerDisplayed 没有 单独放出来就会出现这里点击拿不到数据 undefined
                },
                pageUpdate:function(currentPage,pageSizeNum,totalItems){
                    //同上
                }

            };

           // $scope.displayed = []; // 表示表格实际呈现的数据（开发者默认设置为[]即可）

            $scope.environmentData = { // 表格源数据，开发者对表格的数据设置请在这里进行
                displayed:[],
                srcData:{
                    data: [], // 源数据
                    state: {
                        filter: false, // 源数据未进行过滤处理
                        sort: false, // 源数据未进行排序处理
                        pagination: false // 源数据未进行分页处理
                    }
                }
            };


            $scope.environmentColumns = [
                {
                    title: i18n.evName,
                    width: "18%"
                },
                {
                    title: i18n.siteRegionName,
                    width: "18%"
                },
                {
                    title: i18n.siteRegion,
                    width: "15%"
                },
                {
                    title: i18n.siteLoginUser,
                    width: "18%"
                },
                //{
                //    title: "用户密码",
                //    width: "20%"
                //},
                {
                    title: i18n.siteLoginIp,
                    width: "20%"
                },
                {
                    title: i18n.operation,
                    width: "25%"
                }
            ];
            //表格的右上角 当没有数据的时候显示 当前的数据条数为0
            $scope.environmentTotal = 0;
            $scope.noDadaInfo = i18n.noDadaInfo; //暂无表格数据


            //ip框
            $rootScope.ipCongigOptions = {
                value1: "",
                disable:false,
                focused1:false,
                blur:function(value){
                    console.log("blur evt:"+value);
                },
                change : function(event, value) {
                    console.log("change evt:"+value);
                }
            };

            //增加环境 弹窗
            $(".openWindow").on('click', function(event, callback) {


                var addSiteOptions = {
                    title: i18n.addEnvironment,
                    height: "420px",
                    width: "430px",
                    "content-type": 'url',
                    content: "src/app/business/hostManger/userAdmin/views/include/addEvSite.html",
                    resizable: true,
                    beforeClose: function () {
                    },
                    buttons: [{
                        key: "btnOK",
                        label: 'OK',//按钮上显示的文字
                        focused: true,//默认焦点
                        handler: function (event) {//点击回调函数
                            //注意要修改addServe.html页面的ng-model

                            //ip框的数据传给siteIP
                            $scope.siteLoginIp = $rootScope.ipCongigOptions.value1;

                            //把添加页面的数据传给

                            //$("button.tiny-btn-without-icon").attr("disabled", true);
                            //if($('#hecpass1').val('') !=''&&$('#hecpass2').val()!='' &&$('#hecpass3').val()!=''&& $('#hecpass4').val()!='' && $('#hecpass5').val()!='' && $('#hecpass6').val()!='' &&  $("input.ti_input_ipv4_octet").val() != '   .   .   .   '){
                            //    $("button.tiny-btn-without-icon").attr("disabled", false);
                            //}

                            if (!$scope.evName || !$scope.siteRegionName || !$scope.siteRegion || !$scope.siteLoginUser || !$scope.siteLoginPwd || !$scope.siteLoginIp) {
                                $scope.alertInfo.content = i18n.evAlertInfo;
                                $scope.alertInfo.contentNullError = true;
                                return false;
                            }


                            var jsObj = {
                                "total": 1,
                                "regions": [
                                    {
                                        "evName": $scope.evName,
                                        "sites": [
                                            {
                                                "siteRegion": $scope.siteRegion,
                                                "siteRegionName": $scope.siteRegionName,
                                                "siteLoginUser": $scope.siteLoginUser,
                                                "siteLoginPwd": $scope.siteLoginPwd,
                                                "siteLoginIp": $scope.siteLoginIp
                                            }
                                        ]
                                    }
                                ]
                            };


                            var evStr = JSON.stringify(jsObj);
                            console.log(evStr);
                            $scope.operate = {
                                "addPassData": function () {

                                    var promise = adminEnvironmentConfigServe.postEvsite(evStr);
                                    promise.then(
                                        function (response) {
                                            //var responseData = JSON.parse(response);

                                            if (response.status == 200) {

                                                response.data.regionBeans.forEach(function (value, index, array) {
                                                    array[index].showSub = true;
                                                });
                                                //得到的数据实现分页
                                                //var result = [];
                                                //for (var i = 0, len = response.data.regionBeans.length; i < len; i += 5) {
                                                //    result.push(response.data.regionBeans.slice(i, i + 5));
                                                //}


                                                //sessionStorage.setItem("evData", JSON.stringify(result));
                                                //sessionStorage.setItem("evTotalNum", response.data.total);


                                                //$scope.environmentData.data = result[0]; //默认显示的是第一页
                                                $scope.environmentData.data = response.data.regionBeans;
                                                $scope.environmentTotal = response.data.total; //表格的右上角的 环境的节点数


                                                $scope.pagingModel.totalItems = response.data.total;   //分页 总信息数

                                                //置空
                                                //$scope.evName = '';
                                                //$scope.siteRegion = '';
                                                //$scope.siteRegionName = '';
                                                //$scope.siteLoginPwd = '';
                                                //$scope.siteLoginUser = '';
                                                ////$scope.siteLoginIp = '';
                                                //$rootScope.ipCongigOptions.value1 = '';

                                            }
                                        },
                                        function (response) {

                                            $scope.alertResponse = {  //提示信息
                                                contentNullError:true,
                                                type:"error",
                                                content:response.msg
                                            };

                                            //置空
                                            //$scope.evName = '';
                                            //$scope.siteRegion = '';
                                            //$scope.siteRegionName = '';
                                            //$scope.siteLoginPwd = '';
                                            //$scope.siteLoginUser = '';
                                            ////$scope.siteLoginIp = '';
                                            //$rootScope.ipCongigOptions.value1 = '';
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

            //增加节点 弹窗
            $scope.addSiteFtn = function($index){  //$index表示的是 表格的第几条（从0开始），对应着


                $rootScope.evName =  $scope.environmentData.data[$index].evName ; //注意双向绑定 这里必须用$rootScope,用$scope没解决，这是一个bug
                var addSiteOptions = {
                    title: i18n.addSite,
                    height: "420px",
                    width: "430px",
                    "content-type": 'url',
                    content: "src/app/business/hostManger/userAdmin/views/include/addSite.html",
                    resizable: true,
                    beforeClose: function () {
                    },
                    buttons: [{
                        key: "btnOK",
                        label: 'OK',//按钮上显示的文字
                        focused: true,//默认焦点
                        handler: function (event) {//点击回调函数
                            //注意要修改addServe.html页面的ng-model

                            //ip框的数据传给siteIP
                            $scope.siteLoginIp = $rootScope.ipCongigOptions.value1;

                            //把添加页面的数据传给
                            if (!$scope.evName || !$scope.siteRegionName || !$scope.siteRegion || !$scope.siteLoginUser || !$scope.siteLoginPwd || !$scope.siteLoginIp) {
                                $scope.alertInfo.content = i18n.siteAlertInfo;
                                $scope.alertInfo.contentNullError = true;
                                return false;
                            }


                            var jsObj = {
                                "total": 1,
                                "regions": [
                                    {
                                        "evName": $rootScope.evName,
                                        "sites": [
                                            {
                                                "siteRegion": $scope.siteRegion,
                                                "siteRegionName": $scope.siteRegionName,
                                                "siteLoginUser": $scope.siteLoginUser,
                                                "siteLoginPwd": $scope.siteLoginPwd,
                                                "siteLoginIp": $scope.siteLoginIp
                                            }
                                        ]
                                    }
                                ]
                            };


                            var evStr = JSON.stringify(jsObj);
                            $scope.operate = {
                                "addPassData": function () {

                                    var promise = adminEnvironmentConfigServe.postEvsite(evStr);
                                    promise.then(
                                        function (response) {
                                            //var responseData = JSON.parse(response);

                                            if (response.status == 200) {

                                                response.data.regionBeans.forEach(function (value, index, array) {
                                                    array[index].showSub = true;
                                                });
                                                //得到的数据实现分页
                                                //var result = [];
                                                //for (var i = 0, len = response.data.regionBeans.length; i < len; i += 5) {
                                                //    result.push(response.data.regionBeans.slice(i, i + 5));
                                                //}
                                                //
                                                //
                                                //sessionStorage.setItem("evData", JSON.stringify(result));
                                                //sessionStorage.setItem("evTotalNum", response.data.total);


                                                //$scope.environmentData.data = result[0]; //默认显示的是第一页
                                                $scope.environmentData.data = response.data.regionBeans;
                                                $scope.environmentTotal = response.data.total; //表格的右上角的 环境的节点数


                                                $scope.pagingModel.totalItems = response.data.total;   //分页 总信息数


                                                //置空
                                                $scope.evName = '';
                                                $scope.siteRegion = '';
                                                $scope.siteRegionName = '';
                                                $scope.siteLoginPwd = '';
                                                $scope.siteLoginUser = '';
                                                $scope.siteLoginIp = '';
                                                $rootScope.ipCongigOptions.value1 = '';
                                            }
                                        },
                                        function (response) {
                                            $scope.alertResponse = {  //提示信息
                                                contentNullError:true,
                                                type:"error",
                                                content:response.msg
                                            };

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
            };

            //子节点 "编辑节点"的功能

                //$rootScope.sonEditParaTip = { // ？号提示
                //    content:
                //    "<p ><strong style='color: red;font-size: 16px'>环境配置->编辑节点</strong></span></p><hr>"+
                //    "<p >这里的用户密码，不填代表着使用之前的密码，填入代表着修改之前的密码 </p><br>",
                //    position: "right-top",
                //    maxWidth:"300px",
                //    hideEffect:{
                //        duration:50
                //    },
                //    showEffect: {
                //        duration:200
                //    }
                //};

            $scope.EditSite = function(evName,siteRegionName,siteRegion,siteLoginUser,siteLoginIp){
                $rootScope.evName = evName;
                $rootScope.siteRegionName = siteRegionName;
                $rootScope.siteRegion = siteRegion;
                $rootScope.siteLoginUser = siteLoginUser;
                $rootScope.siteLoginPwd = '';
                //$rootScope.siteLoginPwd = siteLoginPwd;  //密码没有返回,所以拿不到，这个到时跟后台对接一下，看看要不要返回还是只要这么多字段
                $rootScope.ipCongigOptions.value1 = siteLoginIp;



                var addSiteOptions = {
                    title: i18n.editSite,
                    height: "420px",
                    width: "430px",
                    "content-type": 'url',
                    content: "src/app/business/hostManger/userAdmin/views/include/sonEditSite.html",
                    resizable: true,
                    beforeClose: function () {
                    },
                    buttons: [{
                        key: "btnOK",
                        label: 'OK',//按钮上显示的文字
                        focused: true,//默认焦点
                        handler: function (event) {//点击回调函数
                            //注意要修改addServe.html页面的ng-model

                            //ip框的数据传给siteIP
                            $rootScope.siteLoginIp = $rootScope.ipCongigOptions.value1;

                            var jsObj = {
                                "total": 1,
                                "regions": [
                                    {
                                        "evName": $rootScope.evName,
                                        "sites": [
                                            {
                                                "siteRegion": $rootScope.siteRegion,
                                                "siteRegionName": $rootScope.siteRegionName,
                                                "siteLoginUser": $rootScope.siteLoginUser,
                                                "siteLoginPwd": $rootScope.siteLoginPwd,
                                                "siteLoginIp": $rootScope.siteLoginIp
                                            }
                                        ]
                                    }
                                ]
                            };


                            var evStr = JSON.stringify(jsObj);
                            $scope.loadOperate.editSonsite(evStr);
                            win.destroy();
                            //关闭了弹窗就置空 ，以免对其他的有影响
                            $rootScope.evName = '';
                            $rootScope.siteRegionName = '';
                            $rootScope.siteRegion = '';
                            $rootScope.siteLoginUser = '';
                            $rootScope.evName = '';
                            $rootScope.ipCongigOptions.value1 = '';
                        }

                    }]
                };

                var win = new tinyWidget.Window(addSiteOptions);
                win.show();

            };
            //删除环境节点
            $scope.evDelete = function(evName,siteModels,$index){
                console.log($index);
                if(confirm(i18n.confirmDeleteEv)){

                    $scope.environmentData.data.forEach(function(value,index,arr){
                        if(arr[index].evName == evName){
                            $scope.environmentData.data.splice(index,1);
                        }
                    });
                    $scope.environmentTotal--;
                    $scope.pagingModel.totalItems--;
                }
            };


            //删除节点，子节点 删除按钮
            $scope.openDelete =function(evName,$index,siteRegionName,siteRegion,siteLoginUser,siteLoginIp) {
                if (confirm(i18n.confirmDeleteSite)){
                    //$index 指的是该节点在当前的环境的 第几个 从0开始
                    var jsObj = {
                        "total": 1,
                        "regions": [
                            {
                                "evName": evName,
                                "sites": [
                                    {
                                        "siteRegion": siteRegion,
                                        "siteRegionName": siteRegionName,
                                        "siteLoginUser": siteLoginUser,
                                        "siteLoginPwd": '', //后台没返回
                                        "siteLoginIp": siteLoginIp
                                    }
                                ]
                            }
                        ]
                    };
                    console.log($index);
                    console.log(evName);
                    console.log( $scope.environmentData.data);

                    var str = JSON.stringify(jsObj);
                  //这里调用 删除的接口函数
                    $scope.loadOperate.deleteSonsite(str);
                    //页面上删掉改 数据应该是
                    //$scope.environmentData.data.forEach(function(value,index,arr){
                    //    if(arr[index].evName == evName){
                    //        arr[index].siteModels.forEach(function(value1,index1,arr1){
                    //            arr1.splice($index,1);
                    //        })
                    //    }
                    //});
                }
            };

        //页面加载 加载数据
            $scope.loadOperate = {
                "getListData":function(){
                    var promise = adminEnvironmentConfigServe.getEvSite();
                    promise.then(
                        function(response){
                            //var responseData = JSON.parse(response);

                            if(response.status== 200){

                              if(response.data !=null){
                                  response.data.regionBeans.forEach(function(value,index,array){
                                    array[index].showSub = true;
                                });
                              }else{
                                  $scope.alertResponse = {  //提示信息
                                      contentNullError:true,
                                      type:"error",
                                      content:"没有表格数据，请添加环境！"
                                  };

                              }

                                $scope.environmentData.data = response.data.regionBeans;
                                $scope.environmentTotal = response.data.total; //表格的右上角的 环境的节点数
                                $scope.pagingModel.totalItems = response.data.total;   //分页 总信息数


                            }
                        },
                        function(response){
                            $scope.alertResponse = {  //提示信息
                                contentNullError:true,
                                type:"error",
                                content:response.msg
                            };
                        }

                    )
                },
                "deleteSonsite":function(param){
                    var promise = adminEnvironmentConfigServe.sonDeletesite(param);
                    promise.then( function(response){
                            //var responseData = JSON.parse(response);

                            if(response.status== 200){
                                response.data.regionBeans.forEach(function(value,index,array){
                                    array[index].showSub = true;
                                });
                                $scope.environmentData.data = response.data.regionBeans;

                            }
                        },
                        function(response){
                            $scope.alertResponse = {  //提示信息
                                contentNullError:true,
                                type:"error",
                                content:response.msg
                            };
                        })
                },
                "editSonsite":function(param){
                    var promise = adminEnvironmentConfigServe.sonEditsite(param);

                    promise.then( function(response){
                            if(response.status== 200){
                                console.log("执行了修改节点……");
                                response.data.regionBeans.forEach(function(value,index,array){
                                    array[index].showSub = true;
                                });
                                $scope.environmentData.data = response.data.regionBeans;

                            }else{
                                $scope.alertResponse = {  //提示信息
                                    contentNullError:true,
                                    type:"error",
                                    content:response.msg
                                };
                            }
                        },
                        function(response){
                            $scope.alertResponse = {  //提示信息
                                contentNullError:true,
                                type:"error",
                                content:response.msg
                            };
                        })
                }

            };
            $scope.loadOperate.getListData();
        }];
    var module = angular.module("frm");
    module.tinyController("adminEnvironmentConfigCtrl.ctrl",ctrl);
    return module;
});