define([
    "language/inventory",
    "tiny-lib/jquery"
], function (i18n, $) {
    "use strict";
    var ctrl = ["$scope", "$rootScope", "$compile", "adminApplyVirtualServe", "$location", "$timeout",
        function($scope, $rootScope, $compile, adminApplyVirtualServe, $location, $timeout) {
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

            //页面顶部的提示信息
            $scope.typeIcon = true;
            $scope.closeIcon = true;

            $scope.label1 = "小贴士 虚拟机申请：申请人员登陆后，选择填写虚拟机信息(所属Region，pod,主机名，操作系统，CPU，内存，pod网段，主被，描述)，提交申请后，通知相关审核人员，对所申请的机器进行审核，LLD规划，主机自动创建!";
            $scope.type1 = "error";
            //$scope.dismissOnTimeout = 3000;
            //$scope.adminClassName =true;//开始的时候右侧不显示



            $scope.currentStep = 1;
            $scope.steps = [
                {
                    state:"active",
                    title:"模板导入",
                    templateUrl:"src/app/business/hostManger/userAdmin/views/include/wizardstep0.html"
                },
                {
                    state:"undo",
                    title:"状态查询",
                    templateUrl:"src/app/business/hostManger/userAdmin/views/include/wizardstep1.html"
                },
                {
                    state:"undo",
                    title:"规格审核",
                    templateUrl:"src/app/business/hostManger/userAdmin/views/include/wizardstep2.html"
                },
                {
                    state:"undo",
                    title:"LLD规划",
                    templateUrl:"src/app/business/hostManger/userAdmin/views/include/wizardstep3.html"
                },
                //{
                //    state:"undo",
                //    title:"LLD审核",
                //    templateUrl:"src/app/business/hostManger/userAdmin/views/include/wizardstep4.html"
                //},
                {
                    state:"undo",
                    title:"创建成功",
                    templateUrl:"src/app/business/hostManger/userAdmin/views/include/wizardstep5.html"
                }
            ];
            $scope.stepWardmodel = {
                previousTxt:"上一步",
                nextTxt:"下一步",
                finishTxt:"完成",
                cancelTxt:"取消"
            };
            $scope.stepForward = function(){
                $scope.steps[$scope.currentStep-1].state = "complete";
                $scope.currentStep++;
                $scope.steps[$scope.currentStep-1].state = "active";
                console.log($scope.currentStep);
                if($scope.currentStep ==4){ //第二个字页面点击事件

                    //console.log( $scope.selectModel3);
                    //console.log( $scope.statusTableData.data);
                    //console.log($scope.nineItem);
                    if( $scope.selectModel3.selectedId =='1'){
                        $scope.selectModel3.value = "Eull2";
                    }else if($scope.selectModel3.selectedId =='2'){
                        $scope.selectModel3.value = "Nonfh_3";
                    }
                    _.each($scope.statusTableData.data, function(element, index, list){
                        element.operatSystem =  $scope.selectModel3.value;
                        element.describe = $scope.nineItem.value;
                    });
                     console.log($scope.statusTableData.data);

                    $scope.hostTableData.data = $scope.statusTableData.data;
                }
            };
            $scope.stepBackward = function() {
                $scope.steps[$scope.currentStep-1].state = "undo";
                $scope.currentStep--;
                $scope.steps[$scope.currentStep-1].state = "active";

            };
            $scope.finish = function() {
                $scope.steps[$scope.currentStep-1].state = "complete";
            };
            $scope.buttonCancel = function() { //返回到第一步1

                //$scope.steps[0].state = "active";
                $scope.currentStep = 1;//回到起始步
                $scope.steps.forEach(function(value,index,array) { //这里value的参数可以不管
                    if (index == 0) {
                        array[index].state = "active"
                    } else {
                        array[index].state = "undo"
                    }
                });
                //把所有的子页面数据清空

                $scope.$on("$viewContentLoaded", function () {  //页面渲染完成 执行 执行渲染0号页面的 、请求树的结构
                    pageLoad();
                   // $scope.requestOption.getData();//请求树的数据

                });

            };


            //树的接口数据请求
            $scope.requestOption = {
                "getData": function(){
                    var  promise = adminApplyVirtualServe.getTree();
                    promise.then(function(response){
                            //if(typeof(response)== "object" && response != ''){
                            //    $scope.trees.values = response.data;
                            //}


                            if(response.status== 200){
                                $scope.pointArr =[];
                                response.data.regionBeans.forEach(function(value, index, arr){
                                    var pointOption ={};
                                    pointOption.id= index;
                                    pointOption.label = arr[index].evName;
                                    pointOption.sonSiteArr =[];

                                    arr[index].siteModels.forEach(function(value1, index1, arr1){
                                          //arr1[index1].siteRegionName;
                                        var sonPointOption ={};
                                        sonPointOption.id= index1;
                                        sonPointOption.label = arr1[index1].siteRegion;
                                        pointOption.sonSiteArr.push(sonPointOption);
                                    });
                                    $scope.pointArr.push(pointOption);
                                });
                                $scope.selectModel1.options = $scope.pointArr;   //把局点名称     变成这样的数据结构 var pointOptions= [{id:"1",label:"hangzhou",sonSiteArr:[{id:"1",label:"pub"}]},{id:"2",label:"廊坊"}]; 其中sonSiteArr就是 “所属区域”的数据的

                                console.log($scope.pointArr);
                            }
                        },
                        function(response){
                            alert(response.msg);
                        });
                }
            };

            //$scope.requestOption.getData();



            $scope.$on("$viewContentLoaded", function () {  //页面渲染完成 执行 执行渲染0号页面的 、请求树的结构
                pageLoad();
                $scope.requestOption.getData();//请求树的数据

            });


            //第一个 0页面的 逻辑功能
            function pageLoad(){
                $scope.zeroCols = {
                    number: 2,
                    gap: ["180px", "180px"]
                };
                $scope.fieldVertivalAlign = "middle";
                $scope.itemVerticalAlign = "top";
                $scope.firstItem = {
                    label: "局点名称:",
                    required: true,
                    value: ""
                };
                //var pointOptions= [{id:"1",label:"上海"},{id:"2",label:"廊坊"}];
                $scope.paraTip = {
                    content: "<p ><strong style='color: red;font-size: 16px'>虚拟机申请->模板导入</strong></span></p><hr>" +
                    "<p >局点名称与父节点的环境名称相同，这里实际取的是环境名称 </p><br>",
                    position: "right-top",
                    maxWidth: "300px",
                    hideEffect: {
                        duration: 50
                    },
                    showEffect: {
                        duration: 200
                    }
                };


                $scope.selectModel1 = {
                    selectedId: '',
                    disable: false,
                    placeholder: "请选择你所需要的局点...",
                    panelMaxHeight: '300px',
                    panelWidth: '180px',
                    options: $scope.pointArr,
                    change: function (option) {
                        $scope.selectModel2.options = option.sonSiteArr;
                    }
                };

                //var regionOptions = [{id:"1",label:"PO_12.123.45.23"},{id:"2",label:"DO_56gfsdg"}];
                $scope.selectModel2 = {
                    selectedId: '',
                    disable: false,
                    placeholder: "请选择你所在的区域...",
                    panelMaxHeight: '300px',
                    panelWidth: '180px',
                    options: '',
                    change: function (option) {
                        console.log('Select1 change event fired.');
                        console.log(option);
                    }
                };


                $scope.secondItem = {
                    label: "文件导入:",
                    required: true
                };
                $scope.thirdItem = {
                    label: "所属区域:",
                    required: true,
                    value: ""
                };

                $scope.loadModel = {
                    uploaderConfig: {
                        url: "myUploadUrl",
                        onCompleteItem: function (fileItem, response, status) {
                            // 根据状态码和返回消息设置详情信息
                            console.log("response:" + response);
                        }
                    },
                    text: "导入申请列表"
                };



            //第一个 1页面的 逻辑功能


                $scope.fourItem = {
                    label: "操作系统:",
                    required: true,
                    value: ""
                };
                $scope.nineItem = {
                    label: "描述:",
                    required: true,
                    value:''
                };

                $scope.oneCols = {
                    number: 2,
                    gap: ["80px", "80px"]
                };

                $scope.twoCols = {
                    number: 7,
                    gap: ["80px", "80px"]
                };

                var templateOptions = [{id: "1", label: "Eull2"}, {id: "2", label: "Nonfh_3"}];


                $scope.selectModel3 = {
                    selectedId: '1',
                    disable: false,
                    placeholder: "请选择模板...",
                    panelMaxHeight: '300px',
                    panelWidth: '180px',
                    value:'',
                    options: templateOptions,
                    change: function (option) {
                        $scope.selectModel3.value= option.label;
                    }
                };

                //主机名是自己填写的

                var cpuOptions = [{id: 2, label: 2}, {id: 4, label: 4}, {id: 6, label: 6}, {id: 8, label: 8}, {id: 16, label: 16}]; //这些是每一种的可能性，可以前端固定死
                $scope.selectModel5 = {
                    selectedId: '1',
                    disable: false,
                    placeholder: "请选择CPU...",
                    panelMaxHeight: '300px',
                    panelWidth: '80px',
                    options: cpuOptions,
                    change: function (option) {
                    }
                };

                $scope.selectModel6 = {
                    selectedId: '1',
                    disable: false,
                    placeholder: "请选择内存...",
                    panelMaxHeight: '300px',
                    panelWidth: '80px',
                    options: cpuOptions,
                    change: function (option) {
                    }

                };
                $scope.selectModel7 = {
                    value: 1,
                    max: 3000,
                    min: 0,
                    step: 1,
                    disable: false,
                    change: function (event, value) {

                        if (value == "") {
                            $scope.selectModel7.value = 0
                        }
                    }
                };


                var hostOptions = [{id: "master", label: "master"}, {id: "slaver", label: "slaver"}];  //k多种可能性，前端可以写死
                $scope.selectModel8 = {
                    selectedId: 'master',
                    disable: false,
                    placeholder: "请选择主备...",
                    panelMaxHeight: '300px',
                    panelWidth: '80px',
                    options: hostOptions,
                    change: function (option) {
                    }
                };


                //多种可能性，需要后台返回，前端没办法写死
                var netSegOptions = [{id:"192.145.56.68", label:"192.145.56.68"},{id:"192.145.36.28", label:"192.145.56.68"}, {id:"192.72.36.28", label:"192.72.56.68"},{id:"192.96.36.28", label:"192.96.56.68"}];
                $scope.selectModel9 = {
                    selectedId: "192.145.56.68",
                    disable: false,
                    placeholder: "请选择网段...",
                    panelMaxHeight: '300px',
                    panelWidth: '80px',
                    options:netSegOptions ,
                    change: function (option) {
                    }
                };

                //最新改变的代码
                //这条数据模仿的是请求的数据
                var statusSrcData =[{hostName:"",cpu:2,menu:6,hardpan:8,netSegment:"192.145.56.68" ,hostEquipment:"master" }];  //这个是 返回给页面显示的代码
                 $scope.queryStatus = statusSrcData;
                $scope.statusTableData = {
                    displayed:[],
                    srcData:{
                        data:'', // 源数据
                        state:{
                            filter: false,
                            sort: false,
                            pagination: false
                        }
                    }
                };

                $scope.statusColumns = [
                    {
                        title: "主机名",
                        width: "15%"
                    },
                    {
                        title: "CPU",
                        width: "15%"
                    },
                    {
                        title: "内存",
                        width: "15%"
                    },
                    {
                        title: "硬盘",
                        width: "15%"
                    },
                    {
                        title: "网段",
                        width: "15%"
                    },
                    {
                        title: "主备",
                        width: "15%"
                    },
                     {
                         title: "操作",
                         width: "15%"
                     }
                ];

                $scope.statusTableData.data = statusSrcData;




                var step2Item1Option = [{id:1,label:"张倍麒"},{id:2,label:"赵宇"}];
                //第三个页面 即页号为2的页面
                $scope.step2Item1 ={
                    label1:"审核人：",
                    required:true,
                    disable:false,
                    selectedId:'',
                    placeholder:'请选择审核人',
                    panelMaxHeight:'200px',
                    panelWidth:'190px',
                    change1:function(option){
                        console.log(option);
                    },
                    option1:step2Item1Option,
                    checked:true,
                    title:'邮件通知'
                };
                $scope.step2Item1.option1 = step2Item1Option;
                $scope.step2Item2 ={
                    option1:step2Item1Option,
                    checked:true,
                    title:'邮件通知'
                };

                $scope.step3Item ={
                    required:true,
                    label1:"导入申请列表",
                    uploaderConfig:{
                        url:"myUploadUrl",
                        onCompleteItem:function(fileItem,response,status){
                            // 根据状态码和返回消息设置详情信息
                            console.log("response:"+response);
                        }
                    }
                };

                $scope.hostTableData= {
                    displayed:[],
                    srcData:{
                        data:'', // 源数据
                        state: {
                            filter: false, // 源数据未进行过滤处理
                            sort: false, // 源数据未进行排序处理
                            pagination: false // 源数据未进行分页处理
                        }
                    },
                    columns:[
                        {
                            title: "主机名",
                            width: "15%"
                        },
                        {
                            title: "操作系统",
                            width: "15%"
                        },
                        {
                            title: "CPU",
                            width: "15%"
                        },
                        {
                            title: "内存",
                            width: "15%"
                        },
                        {
                            title: "硬盘",
                            width: "15%"
                        },
                        {
                            title: "网段",
                            width: "15%"
                        },
                        {
                            title: "主备",
                            width: "15%"
                        },
                        {
                            title: "描述",
                            width: "15%"
                        }
                    ]
                };

                //$scope.hostTableData.data = $scope.statusTableData.data;

                //$scope.nineItem1 = {
                //    label: "描述:",
                //    required: true
                //};
                $scope.test2 = "这是向导的第3个页面";
                $scope.test3 = "这是向导的第4个页面";
                $scope.test4 = "这是向导的第5个页面";
                $scope.test5 = "这是向导的第6个页面";
        }


            //添加
            $scope.newmachineAdd = function ($index) {
                var statusOption ={hostName:"",cpu:2,menu:4,hardpan:8,netSegment:"192.145.36.28" ,hostEquipment:"master" };
                $scope.statusTableData.data.push(statusOption);
            };

            //删除
            $scope.newmachineDel = function($index) {
                $scope.statusTableData.data.splice($index, 1);

            };




        }];
    var module = angular.module("frm");
    module.tinyController("adminApplyVirtualCtrl.ctrl",ctrl);
    return module;
});