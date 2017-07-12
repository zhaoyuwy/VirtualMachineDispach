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
                            //if(typeof(response)== "object" && response != ''){
                            //    $scope.trees.values = response.data;
                            //}

                            if(response.status== 200){
                                var listTree =[ {
                                    "id": 1, //文件名称
                                    "name": "局点信息", //局点名称
                                    "nodeType": "business",
                                    "parentId": null,


                                    //默认展开直接子节点
                                    "open": "true"
                                }];


                                response.data.regionBeans.forEach(function(value,index,array){
                                    var treeSon = {
                                        "id":index+2,
                                        "name": array[index].evName,
                                        "nodeType": "City",
                                        "parentId": 1,
                                        "open": "true"
                                    };
                                    listTree.push(treeSon);

                                    var sonTreeLength = treeSon.id; //把父节点id 保存起来
                                    if(JSON.stringify(array[index].siteModels)!='[]'){ //数组不为空对象
                                        array[index].siteModels.forEach(function(value1,index1,array1){
                                            //累加的id的值

                                            var treeGrandSon ={
                                                "id":listTree.length+index1+1,
                                                "name": array1[index1].siteRegion+'_'+array1[index1].siteIp,
                                                "nodeType": "point",
                                                "parentId": sonTreeLength,
                                                "siteLoginIp":array1[index1].siteLoginIp
                                            };

                                            listTree.push(treeGrandSon);
                                        });
                                    }

                                });

                                //$scope.trees.values = response.data.regionBeans;
                                $scope.trees.values = listTree;

                            }

                        },
                        function(response){
                            alert(response.msg);
                        });
                }
            };

            $scope.requestOption.getData();




            //单击的回调函数
            function clickFn(click, treeId, treeNode) {
                console.log(treeNode); // 改属性的对象数据
                console.log(treeId); //tree的id的值
                console.log(click);//元素的jq对象

                $scope.adminClassName = false; //点击树 则出现右侧节点的详细信息
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

            $scope.adminClassName =true;//开始的时候右侧不显示



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


            //环形图1

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
              };


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
                    monitorUsedCpu:22,
                    hostTotalSizeMHz:"2.1MHz",
                    monitorUsedMem:12,
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
                    monitorUsedCpu:22,
                    hostTotalSizeMHz:"2.1MHz",
                    monitorUsedMem:12,
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
                    monitorUsedCpu:22,
                    hostTotalSizeMHz:"2.1MHz",
                    monitorUsedMem:12,
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
                    monitorUsedCpu:22,
                    hostTotalSizeMHz:"2.1MHz",
                    monitorUsedMem:12,
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



