define([
    "language/inventory",
    "tiny-common/UnifyValid",
    "tiny-lib/jquery",
    "tiny-widgets/Tree",
    "tiny-directives/Tree",
    "tiny-lib/Class"
], function (i18n, commonService, $, Tree, _TreeDirective, Class) {
    "use strict";

    var ctrl = ["$scope", "$rootScope", "$compile", "adminApplyMachineServe", "$location", "$timeout", "$state",
        function($scope, $rootScope, $compile, adminApplyMachineServe, $location, $timeout, $state) {
            $scope.i18n = i18n;

            //var token = sessionStorage.getItem("meeting_token");

            // 页面加载时，防止用户点击浏览器的前进和后退带来的影响
            $rootScope.menus = {
                url: "src/app/framework/views/menus.html"
            };
            $rootScope.footer = {
                url: "src/app/framework/views/footer.html"
            };






            /*** tree start ***/



            var setting = {
                treeObj: null,
                view: {
                    selectedMulti: false,//是否允许点击多个节点
                    fontCss: setFontCss
                    //expandSpeed: "slow"
                },
                data: {
                    simpleData: {
                        enable: true, // 不直接散开
                        idKey: "id",
                        pIdKey: "parentId",
                        rootPId: 0
                    }
                },
                check: {
                    enable: false, //选择框显不显示
                    autoCheckTriggle: true

                },
                callback: {
                    onClick: clickFn,
                    onCheck: checkdFn
                    // beforeCheck: beforCheckFn,
                }
            };

            $scope.trees = {
                id: "host_tree",
                setting: setting,
                values: []

            };

            //$scope.trees.values = tree;


            var treeId = $scope.trees.id;
            var treeNode = $scope.trees.values;

            var treeObj = $.fn.zTree.getZTreeObj("host_tree");



            // var nodes = treeObj.getCheckedNodes(true);

            //var idBox = [];


            //树的接口数据请求
            $scope.requestOption ={
                "getData": function(){
                    var  promise = adminApplyMachineServe.getTree();
                    promise.then(function(response){
                            //插入召开时间这个字段，是开始时间和结束时间结合的
                            if(typeof(response)== "object" && response != ''){
                                $scope.trees.values = response.data;
                            }

                        },
                        function(response){
                            console.log("get请求数据失败");
                        });
                }
            };

            $scope.requestOption.getData();



            //单击的回调函数
            function clickFn(click, treeId, treeNode) {
                console.log(treeNode); // 改属性的对象数据
                console.log(treeId); //tree的id的值
                console.log(click);//元素的jq对象
                $scope.adminClassName =false; //即向导隐藏
                $scope.adminCheckout1.selectedId ='1'; //默认选中的是 按主机查看
                $scope.chaxun = true;


            }
            //勾选的回调函数
            // function beforCheckFn(treeId, treeNode) {
            //     //console.log("this node's id is " + treeNode.id);
            //
            // }

            //复选的回调函数
            //选中的ID集合
            var idtotal = [];

            function checkdFn(event, treeId, treeNode) {



            }
            //节点文字样式
            function setFontCss(treeId, treeNode) {
                return (treeNode.id <= 4 || treeNode.name == "大连" || treeNode.name == "广州" ||treeNode.name == "廊坊" || treeNode.name == "上海") ? {"font-weight": "bold"} : {"font-weight": "normal"};
            }




            //右侧的数据



            $scope.typeIcon = true;
            $scope.closeIcon = true;

            $scope.label1 = "小贴士 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad amet doloLorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad amet dolores earum facere hic incidunt molestias mollLorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad amet dolores earum facere hic incidunt molestias mollLorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad amet dolores earum facere hic incidunt molestias mollLorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad amet dolores earum facere hic incidunt molestias mollres earum facere hic incidunt molestias mollitia, nulla quas quidem repudiandae sapiente sit tenetur ut! Animi aut commodi quasi!";
            $scope.type1 = "error";
            //$scope.dismissOnTimeout = 3000;


            $scope.adminClassName =true;
           //点击 默认按钮事件
            $scope.selectBtn = function(){
                $scope.adminClassName =true;

            };




          //按钮默认事件


            //向导


            $scope.currentStep = 1;
            $scope.steps = [{
                state:"active",
                title:"模板导入",
                templateUrl:"src/app/business/hostManger/userAdmin/views/include/wizardstep0.html"
            },{
                state:"undo",
                title:"状态查询",
                templateUrl:"src/app/business/hostManger/userAdmin/views/include/wizardstep1.html"
            },{
                state:"undo",
                title:"规格审核",
                templateUrl:"src/app/business/hostManger/userAdmin/views/include/wizardstep2.html"
            },
            {
                state:"undo",
                title:"ip分配",
                templateUrl:"src/app/business/hostManger/userAdmin/views/include/wizardstep3.html"
            },
            {
                state:"undo",
                title:"创建成功",
                templateUrl:"src/app/business/hostManger/userAdmin/views/include/wizardstep4.html"
            },
            {
                state:"undo",
                title:"审核通过",
                templateUrl:"src/app/business/hostManger/userAdmin/views/include/wizardstep5.html"
            }
            ];
            $scope.stepWardmodel = {
                previousTxt:"previous",
                nextTxt:"下一步",
                finishTxt:"完成",
                cancelTxt:"取消"
            };
            $scope.stepForward = function(){
                $scope.steps[$scope.currentStep-1].state = "complete";
                $scope.currentStep++;
                $scope.steps[$scope.currentStep-1].state = "active";
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
            };








            //第一个 0页面的 逻辑功能
            $scope.zeroCols = {
                number: 2,
                gap:["180px", "180px"]
            };
            $scope.fieldVertivalAlign = "middle";
            $scope.itemVerticalAlign = "middle";
            $scope.firstItem = {
                label: "局点名称:",
                required: true,
                value: ""
            };
            var pointOptions= [{id:"1",label:"上海"},{id:"2",label:"廊坊"}];


            $scope.selectModel1 = {
                selectedId: '1',
                disable: false,
                placeholder: "请选择你所需要的局点...",
                panelMaxHeight: '300px',
                panelWidth: '180px',
                options: pointOptions,
                change: function(option){
                    console.log('Select1 change event fired.');
                    console.log(option);
                },
                focus: function(option){
                    console.log('Select1 focus event fired.');
                    console.log(option);
                },
                blur: function(option){
                    console.log('Select1 blur event fired.');
                    console.log(option);
                }
            };

            var regionOptions = [{id:"1",label:"PO_12.123.45.23"},{id:"2",label:"DO_56gfsdg"}];
            $scope.selectModel2 = {
                selectedId: '1',
                disable: false,
                placeholder: "请选择你所在的区域...",
                panelMaxHeight: '300px',
                panelWidth: '180px',
                options: regionOptions,
                change: function(option){
                    console.log('Select1 change event fired.');
                    console.log(option);
                },
                focus: function(option){
                    console.log('Select1 focus event fired.');
                    console.log(option);
                },
                blur: function(option){
                    console.log('Select1 blur event fired.');
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

            $scope.loadModel={
                uploaderConfig:{
                    url:"myUploadUrl",
                    onCompleteItem:function(fileItem,response,status){
                        // 根据状态码和返回消息设置详情信息
                        console.log("response:"+response);
                    }
                },
                text:"导入申请列表"
            };



            //第一个 1页面的 逻辑功能

            $scope.oneCols = {
                number: 2,
                gap:["80px", "80px"]
            };
            $scope.twoCols = {
                number: 5,
                gap:["80px", "80px"]
            };


            $scope.fourItem = {
                label: "模板:",
                required: true,
                value: ""
            };


            $scope.fiveItem = {
                label: "主机名:",
                required: true,
                value: ""
            };
            $scope.sixItem = {
                label: "CPU:",
                required: true,
                value: ""
            };
            $scope.sevenItem = {
                label: "内存:",
                required: true,
                value: ""
            };
            $scope.eightItem = {
                label: "硬盘:",
                required: true,
                value: ""
            };


            var templateOptions= [{id:"1",label:"Eull2"},{id:"2",label:"Nonfh_3"}];


            $scope.selectModel3 = {
                selectedId: '1',
                disable: false,
                placeholder: "请选择模板...",
                panelMaxHeight: '300px',
                panelWidth: '180px',
                options: templateOptions,
                change: function(option){
                    console.log('Select1 change event fired.');
                    console.log(option);
                },
                focus: function(option){
                    console.log('Select1 focus event fired.');
                    console.log(option);
                },
                blur: function(option){
                    console.log('Select1 blur event fired.');
                    console.log(option);
                }
            };

            var nameOptions = [{id:"1",label:"DNS_DL_PC"},{id:"2",label:"uNI_fdas_4"}];
            $scope.selectModel4 = {
                selectedId: '1',
                disable: false,
                placeholder: "请选择主机名...",
                panelMaxHeight: '300px',
                panelWidth: '180px',
                options: nameOptions,
                change: function(option){
                    console.log('Select1 change event fired.');
                    console.log(option);
                },
                focus: function(option){
                    console.log('Select1 focus event fired.');
                    console.log(option);
                },
                blur: function(option){
                    console.log('Select1 blur event fired.');
                    console.log(option);
                }
            };

            var cpuOptions = [{id:"1",label:1},{id:"2",label:2},{id:"3",label:3},{id:"4",label:4},{id:"5",label:5},{id:"6",label:6}];
            $scope.selectModel5 = {
                selectedId: '1',
                disable: false,
                placeholder: "请选择CPU...",
                panelMaxHeight: '300px',
                panelWidth: '180px',
                options: cpuOptions,
                change: function(option){
                    console.log('Select1 change event fired.');
                    console.log(option);
                }
            };

            $scope.selectModel6 = {
                value:2,
                //format:"N2",
                max:30,
                min:0,
                step:1,
                disable:false,
                //focused:true,
                change : function(event, value) {
                    if(value== ""){ $scope.selectModel6.value = 0}
                    console.log("change evt:"+value);

                }

            };
            $scope.selectModel7 = {
                value: 1,
                max:30,
                min:0,
                step:1,
                disable:false,
                change : function(event, value) {

                    if(value== ""){ $scope.selectModel7.value = 0}
                    console.log("change evt:"+value);
                }
            };





            //增加功能 +
            $scope.buttonAdd = false; //开始的时候就置为假
            $scope.machineModel = {};
            $scope.machineModel.action = [];
            var sum = [];

            //angular.forEach(sum,function(data,$index){
            //    $index++;
            //   $scope.machineModel.action.push({key:$index,value:data});
            //});

            var totalAdd = 0;
            $scope.machineAdd =function($index){
                totalAdd += $index;
                $scope.machineModel.action.splice($scope.machineModel.action.length, 0, {key:totalAdd,data:""});
                console.log( $scope.machineModel);
            };

            $scope.machineDel = function($index){
                $scope.machineModel.action.splice($index,1);

            };





            //第三个页面 即页号为2的页面
            $scope.nineItem = {
                label: "描述:",
                required: true
            };




            $scope.test1 = "这是向导的第2个页面";
            $scope.test2 = "这是向导的第3个页面";
            $scope.test3 = "这是向导的第4个页面";
            $scope.test4 = "这是向导的第5个页面";
            $scope.test5 = "这是向导的第6个页面";



        //点击做的树的节点
            $scope.threeCols = {
                number: 4,
                gap:["80px", "80px"]
            };

            $scope.tenItem = {
                label: "查看:",
                required: true,
                value: ""
            };
            $scope.elevenItem = {
                label: "开始时间:",
                required: true,
                value: ""
            };

            $scope.twelveItem = {
                label: "结束时间:",
                required: true,
                value: ""
            };

            var checkoutOptions= [{id:"1",label:"按主机查看"},{id:"2",label:"按虚拟机查看"}];

            $scope.chaxun = true;//默认开始的时候就是按主机查询
            $scope.adminCheckout1 = {
                selectedId: '1',
                disable: false,
                placeholder: "请选择查看...",
                panelMaxHeight: '200px',
                panelWidth: '180px',
                options: checkoutOptions,
                change: function(option){

                    console.log(option);

                    if(option.id == "2"){
                       $scope.chaxun = false;
                    }else{
                       $scope.chaxun = true;
                    }
                }

            };



            $scope.startDateTime = {
                format : {
                    date : "yyyy.MM.dd",
                    time : "HH:mm:ss"
                },
                clearBtn : true,
                okBtn : true,
                value3 : new Date(2015, 6, 2),
                minValue : new Date(2015, 6, 2),
                maxValue : new Date(2117, 8, 27),
                disable : false,
                close : function(value) {
                    console.log(value);
                }
            };


            $scope.endDateTime = {
                format : {
                    date : "yyyy.MM.dd",
                    time : "HH:mm:ss"
                },
                clearBtn : true,
                okBtn : true,
                value3 : new Date(2015, 6, 2),
                minValue : new Date(2015, 6, 2),
                maxValue : new Date(2117, 8, 27),
                disable : false,
                close : function(value) {
                    console.log(value);
                }
            };


            //饼图


            $scope.quanCharts1 = {};
            $scope.quanCharts1.options = {
                id: "firstItem",
                title : {
                    text: 'cpu使用率',
                    subtext: '',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient : 'vertical',
                    x : 'right',
                    y: 'center',
                    data:["未使用","使用中"]  //这和下面33% 67% 要对应好否则显示的图 颜色不好看
                },
                toolbox: {  //工具箱
                    show : true,
                    feature : {
                        //mark : {show: false},
                        //dataView : {show: true, readOnly: false},
                        //magicType : {
                        //    show: true,
                        //    type: ['pie', 'funnel'],
                        //    option: {
                        //        funnel: {
                        //            x: '25%',
                        //            width: '50%',
                        //            funnelAlign: 'left',
                        //            max: 1548
                        //        }
                        //    }
                        //},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                series : [
                    {
                        name:'cpu使用率',
                        type:'pie',
                        radius : ['40%', '60%'], //这里的数据是指环的厚度
                        itemStyle : {
                            normal : {
                                label : {
                                    show : true
                                },
                                labelLine : {
                                    show : true
                                }
                            },
                            emphasis : {
                                label : {
                                    show : true,
                                    position : 'center',
                                    textStyle : {
                                        fontSize : '22',
                                        fontWeight : 'bold'
                                    }
                                }
                            }
                        },
                        data:[
                            {value:33, name:'未使用'},
                            {value:67, name:'使用中'}
                        ]
                    }
                ]
            };

            //环形图2

            $scope.quanCharts2 = {};
            $scope.quanCharts2.options = {
                id: "secondItem",
                title : {
                    text: '内存使用率',
                    subtext: '',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient : 'vertical',
                    x : 'right',
                    y: 'center',
                    data:["未使用","使用中"]  //这和下面33% 67% 要对应好否则显示的图 颜色不好看
                },
                toolbox: {  //工具箱
                    show : true,
                    feature : {
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                series : [
                    {
                        name:'内存使用率',
                        type:'pie',
                        radius : ['40%', '60%'],//这里的数据是指环的厚度
                        itemStyle : {
                            normal : {
                                label : {
                                    show : true
                                },
                                labelLine : {
                                    show : true
                                }
                            },
                            emphasis : {
                                label : {
                                    show : true,
                                    position : 'center',
                                    textStyle : {
                                        fontSize : '22',
                                        fontWeight : 'bold'
                                    }
                                }
                            }
                        },
                        data:[
                            {value:88, name:'未使用'},
                            {value:12, name:'使用中'}
                        ]
                    }
                ]
            };


            //表格数据
                //按主机查询的表格
            $scope.hostMangerDisplayed = [];
            var srcData = [
                {
                    hostName:"CAN_FAFD",
                    hostStatus:"运行中",
                    monitorUsedCpu:22,
                    hostTotalSizeMHz:"2.1MHz",
                    monitorUsedMem:12,
                    hostTotalSizeMB:"120MB",
                    clusterName:"NMvdfnas",
                    hostIp:"120.35.64.23"
                },
                {
                    hostName:"CAN_FAFD",
                    hostStatus:"运行中",
                    monitorUsedCpu:22,
                    hostTotalSizeMHz:"2.1MHz",
                    monitorUsedMem:12,
                    hostTotalSizeMB:"120MB",
                    clusterName:"NMvdfnas",
                    hostIp:"120.35.64.23"
                },
                {
                    hostName:"CAN_FAFD",
                    hostStatus:"运行中",
                    monitorUsedCpu:22,
                    hostTotalSizeMHz:"2.1MHz",
                    monitorUsedMem:12,
                    hostTotalSizeMB:"120MB",
                    clusterName:"NMvdfnas",
                    hostIp:"120.35.64.23"
                },
                {
                    hostName:"CAN_FAFD",
                    hostStatus:"运行中",
                    monitorUsedCpu: 22,
                    hostTotalSizeMHz:"2.1MHz",
                    monitorUsedMem:12,
                    hostTotalSizeMB:"120MB",
                    clusterName:"NMvdfnas",
                    hostIp:"120.35.64.23"
                }

            ];

              $scope.hostProgress ={
                  maxValue:1
              }


            $scope.hostMangerSrcData = {
                data: srcData, // 源数据
                state: {
                    filter: false,
                    sort: false,
                    pagination: false
                }
            };
            $scope.hostMangerColumns = [
                {
                    title: "主机名",
                    width: "10%"
                },
                {
                    title: "状态",
                    width: "10%"
                },
                {
                    title: "已分配cpu",
                    width: "10%"
                },
                {
                    title: "CPU大小",
                    width: "10%"
                },
                {
                    title: "已分配内存",
                    width: "10%"
                },
                {
                    title: "内存大小",
                    width: "10%"
                },
                {
                    title: "所属集群",
                    width: "10%"
                },
                {
                    title: "主机ip",
                    width: "10%"
                },
                {
                    title: "操作",
                    width: "10%"
                }
            ];

            $scope.hostMangerProgress = {
                maxValue: 1,
                value: 20
            };



              //按虚拟机查询
            $scope.vmDisplayed = [];
            var vmData = [
                {
                    vmName:"CAN_FAFD",
                    vmId:"1",
                    vmStatus:"运行中",
                    vmType:"one",
                    monitorUsedCpu:"22%",
                    hostTotalSizeMHz:"2.1MHz",
                    monitorUsedMem:"12%",
                    hostTotalSizeMB:"120MB",
                    vmIp:"120.35.64.23",
                    vmLocation:"fdhasif",
                    hostName:"host1",
                    vmCreateTime:"2017-07-02"
                },
                {
                    vmName:"CAN_FAFD",
                    vmId:"1",
                    vmStatus:"运行中",
                    vmType:"one",
                    monitorUsedCpu:"22%",
                    hostTotalSizeMHz:"2.1MHz",
                    monitorUsedMem:"12%",
                    hostTotalSizeMB:"120MB",
                    vmIp:"120.35.64.23",
                    vmLocation:"fdhasif",
                    hostName:"host1",
                    vmCreateTime:"2017-07-02"
                },
                {
                    vmName:"CAN_FAFD",
                    vmId:"1",
                    vmStatus:"运行中",
                    vmType:"one",
                    monitorUsedCpu:"22%",
                    hostTotalSizeMHz:"2.1MHz",
                    monitorUsedMem:"12%",
                    hostTotalSizeMB:"120MB",
                    vmIp:"120.35.64.23",
                    vmLocation:"fdhasif",
                    hostName:"host1",
                    vmCreateTime:"2017-07-02"
                },
                {
                    vmName:"CAN_FAFD",
                    vmId:"1",
                    vmStatus:"运行中",
                    vmType:"one",
                    monitorUsedCpu:"22%",
                    hostTotalSizeMHz:"2.1MHz",
                    monitorUsedMem:"12%",
                    hostTotalSizeMB:"120MB",
                    vmIp:"120.35.64.23",
                    vmLocation:"fdhasif",
                    hostName:"host1",
                    vmCreateTime:"2017-07-02"
                }
            ];




            $scope.vmSrcData = {
                data: vmData, // 源数据
                state: {
                    filter: false,
                    sort: false,
                    pagination: false
                }
            };
            $scope.vmColumns = [
                {
                    title: "虚拟机名称",
                    width: "10%"
                },
                {
                    title: "Id",
                    width: "10%"
                },
                {
                    title: "状态",
                    width: "10%"
                },
                {
                    title: "类型",
                    width: "10%"
                },
                {
                    title: "已分配cpu",
                    width: "10%"
                },
                {
                    title: "cpu大小",
                    width: "10%"
                },
                {
                    title: "已分配内存",
                    width: "10%"
                },
                {
                    title: "内存大小",
                    width: "10%"
                },
                {
                    title: "ip地址",
                    width: "10%"
                },
                {
                    title: "所在集群",
                    width: "10%"
                },
                {
                    title: "所在主机",
                    width: "10%"
                },
                {
                    title: "创建时间",
                    width: "10%"
                },
                {
                    title: "操作",
                    width: "10%"
                }
            ];










        }];
    var module = angular.module("frm");
    module.tinyController("adminApplyMachineCtrl.ctrl",ctrl);
    return module;
});



