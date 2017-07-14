define([
    "language/inventory",
    "tiny-lib/jquery"
], function (i18n, $) {
    "use strict";
    var ctrl = ["$scope", "$rootScope", "$compile","$location", "$timeout", "adminEnvironmentConfigServe",
        function($scope, $rootScope, $compile, $location, $timeout, adminEnvironmentConfigServe) {
            $scope.i18n = i18n;



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

            $scope.alertInfo = {  //提示信息
                contentNullError:false,
                type:"error",
                content:""
            };




            //分页工具导航条
            $scope.pagingModel = {
                "id":"pagid3",
                "totalRecords" :'',
                 displayLength:5,
                "type" : "full_numbers",
                "hideDisplayLength" : true,
                "callback" : function(obj) {  //点击分页的回调函数
                    $scope.environmentData.data = '';

                    $scope.environmentData.data = JSON.parse(sessionStorage.getItem('evData'))[obj.currentPage-1];
                    $rootScope.environmentData.data = $scope.environmentData.data
                    $scope.$digest();//个$digest循环运行时，watchers会被执行来检查scope中的models变化，在上下文之外改变,监听函数可能没监控到，module的变化
                    //$scope.$apply();

                }
            };












            $scope.displayed = []; // 表示表格实际呈现的数据（开发者默认设置为[]即可）

            $scope.environmentData = { // 表格源数据，开发者对表格的数据设置请在这里进行
                data: [], // 源数据
                state: {
                    filter: false, // 源数据未进行过滤处理
                    sort: false, // 源数据未进行排序处理
                    pagination: false // 源数据未进行分页处理
                }
            };


            $scope.environmentColumns = [
                {
                    title: "环境名称",
                    width: "18%"
                },
                {
                    title: "局点名称",
                    width: "18%"
                },
                {
                    title: "所属局域",
                    width: "15%"
                },
                {
                    title: "操作用户",
                    width: "18%"
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
                    width: "25%"
                }
            ];
            //表格的右上角 当没有数据的时候显示 当前的数据条数为0
            $scope.environmentTotal = 0;
            $scope.noDadaInfo = "暂无表格数据，请添加环境节点……";


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
                    title: "添加环境",
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
                                $scope.alertInfo.content = "请输入添加环境字段的信息";
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
                                                var result = [];
                                                for (var i = 0, len = response.data.regionBeans.length; i < len; i += 5) {
                                                    result.push(response.data.regionBeans.slice(i, i + 5));
                                                }


                                                sessionStorage.setItem("evData", JSON.stringify(result));
                                                sessionStorage.setItem("evTotalNum", response.data.total);


                                                $scope.environmentData.data = result[0]; //默认显示的是第一页
                                                //$scope.environmentData.data = response.data.regionBeans;
                                                $scope.environmentTotal = response.data.total; //表格的右上角的 环境的节点数


                                                $scope.pagingModel.totalRecords = response.data.total;   //分页 总信息数

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
                                            alert(response.msg);

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
                    title: "添加环境",
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
                                $scope.alertInfo.content = "请输入添加环境字段的信息";
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
                                                var result = [];
                                                for (var i = 0, len = response.data.regionBeans.length; i < len; i += 5) {
                                                    result.push(response.data.regionBeans.slice(i, i + 5));
                                                }


                                                sessionStorage.setItem("evData", JSON.stringify(result));
                                                sessionStorage.setItem("evTotalNum", response.data.total);


                                                $scope.environmentData.data = result[0]; //默认显示的是第一页
                                                //$scope.environmentData.data = response.data.regionBeans;
                                                $scope.environmentTotal = response.data.total; //表格的右上角的 环境的节点数


                                                $scope.pagingModel.totalRecords = response.data.total;   //分页 总信息数


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
            };


            //默认页面显示的数据提前写，否则会对分页的callback 回调函数有影响

            //$scope.environmentData.data = JSON.parse(sessionStorage.getItem('evData'))[0];//默认显示的是分页 第一个 页面
            //$scope.environmentTotal = sessionStorage.getItem('evTotalNum');
            //
            //
            //$scope.pagingModel.totalRecords = sessionStorage.getItem('evTotalNum');

        //页面加载 加载数据
            $scope.loadOperate = {
                "getListData":function(){

                    var promise = adminEnvironmentConfigServe.getEvSite();
                    promise.then(
                        function(response){
                            //var responseData = JSON.parse(response);

                            if(response.status== 200){

                                console.log(response);

                                response.data.regionBeans.forEach(function(value,index,array){
                                    array[index].showSub = true;
                                });
                                //得到的数据实现分页
                                var result = [];
                                for(var i=0,len= response.data.regionBeans.length;i<len;i+=5){
                                    result.push( response.data.regionBeans.slice(i,i+5));
                                }


                                sessionStorage.setItem("evData",JSON.stringify(result)); //把分页的数据写入缓存中
                                sessionStorage.setItem("evTotalNum",response.data.total);


                                $scope.environmentData.data = result[0]; //默认显示分页的是 第一页
                                //$scope.environmentData.data = response.data.regionBeans;
                                $scope.environmentTotal = response.data.total; //表格的右上角的 环境的节点数


                                $scope.pagingModel.totalRecords = response.data.total;   //分页 总信息数


                            }
                        },
                        function(response){
                            alert(response.msg);
                        }

                    )
                }
            };
            $scope.loadOperate.getListData();



        }];
    var module = angular.module("frm");
    module.tinyController("adminEnvironmentConfigCtrl.ctrl",ctrl);
    return module;
});