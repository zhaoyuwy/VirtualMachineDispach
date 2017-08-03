define([
    "language/inventory",
    "tiny-common/UnifyValid",
    "tiny-lib/jquery",
    "tiny-widgets/Tree",
    "tiny-directives/Tree",
    "tiny-lib/Class"
], function (i18n, commonService, $, Tree, _TreeDirective, Class) {
    "use strict";

    var ctrl = ["$scope", "$rootScope", "$compile", "$location", "$timeout", "$state", "adminApplyMachineServe",
        function($scope, $rootScope, $compile, $location, $timeout, $state, adminApplyMachineServe) {
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
                                                "name": array1[index1].siteRegion+'_'+array1[index1].siteLoginIp,
                                                "nodeType": "point",
                                                "parentId": sonTreeLength,
                                                "evName":array[index].evName,
                                                "siteLoginIp":array1[index1].siteLoginIp,
                                                "siteRegion":array1[index1].siteRegion,
                                                "siteRegionName":array1[index1].siteRegionName

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
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                series: [
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
                            {value:$scope.Doughnut1Use, name:'未使用'},
                            {value:100-$scope.Doughnut1Use, name:'使用中'}
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
                series:[
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
                            {value:$scope.Doughnut2Use, name:'未使用'},
                            {value:100-$scope.Doughnut2Use, name:'使用中'}  //这里要是没有赋值，而是直接在下面赋值就会出现 环形图加载就会没有动画的效果
                        ]
                    }
                ]
            };







            //单击点击树的节点 的回调函数，同时发送请求
            function clickFn(click, treeId, treeNode) {
                //console.log(treeNode); // 节点属性的对象数据
                //console.log(treeId); //tree的id的值
                //console.log(click);//元素的jq对象

                $scope.adminClassName = false; //点击树节点 则出现右侧节点的详细信息
                $scope.adminCheckout1.selectedId ='1'; //默认选中的是 按主机查看
                $scope.chaxun = true; //默认的树显示显示按主机查询相关页面片段
                //$scope.pagingModel.totalRecords = 0;

                var str = treeNode.siteRegionName+"?siteRegion="+treeNode.siteRegion+"&siteLoginIp="+treeNode.siteLoginIp;
                //str保存在$scope.urlPostfix 后面其他的接口需要用到
                $scope.urlPostfix = str;

                $scope.siteDetailed ={
                    "getData": function(){
                        var  promise = adminApplyMachineServe.getResource(str);
                        promise.then(function(response){
                                if(response.status== 200){

                                    //var result = [];
                                    //for(var i=0,len= response.data.hostOrVmModels.length;i<len;i+=10){
                                    //    result.push( response.data.hostOrVmModels.slice(i,i+10));
                                    //}


                                    //sessionStorage.setItem("siteTreeData",JSON.stringify(result)); //把分页的数据写入缓存中
                                    //$scope.hostMangerSrcData.data = result[0]; //默认显示分页的是 第一页

                                    //分页的数据保存在sessionStorage，有bug就是点击左侧树的其他节点，要是节点没返回数据就会用缓存的数据
                                    //$scope.cacheHostTableData = result;
                                    //$scope.hostMangerSrcData.data =  $scope.cacheHostTableData[0]; //默认显示分页的是 第一页


                                    //$scope.pagingModel.totalRecords = response.data.total;   //分页 总信息数
                                    $scope.hostPagingModel.totalItems = response.data.total;
                                    //
                                    //console.log(response.data.hostOrVmModels);
                                    $scope.hostMangerSrcData.data = response.data.hostOrVmModels;

                                    $scope.startDateTime = response.data.time.split("_")[0]; //开始时间
                                    $scope.endDateTime = response.data.time.split("_")[1];//结束时间
                                    $scope.Doughnut1Use = response.data.monitorCpuUsage; //环形图1使用率
                                    $scope.Doughnut2Use = response.data.monitorCpuUsage;  //环形图2使用率



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
                                        series: [
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
                                                    {value:response.data.monitorCpuUsage, name:'未使用'},
                                                    {value:100-response.data.monitorCpuUsage, name:'使用中'}
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
                                        series:[
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
                                                    {value:response.data.monitorMemUsage, name:'未使用'},
                                                    {value:100-response.data.monitorMemUsage, name:'使用中'}
                                                ]
                                            }
                                        ]
                                    };

                                }

                            },
                            function(response){
                                alert(response.msg);
                            });
                    }
                };

                $scope.siteDetailed.getData();


            }




            //勾选的回调函数
            // function beforCheckFn(treeId, treeNode) {
            //     //console.log("this node's id is " + treeNode.id);
            //
            // }

            //复选的回调函数
                //选中的ID集合
            var idtotal = [];

            function checkdFn(event, treeId, treeNode) {}
            //节点文字样式
            function setFontCss(treeId, treeNode) {
                return ( treeNode.name == "langfang"|| treeNode.name == "hangzhou" || treeNode.name == "guangzhou" ||treeNode.name == "shanghai" || treeNode.name == "dalian") ? {"font-weight": "bold"} : {"font-weight": "normal"};
            }




            //右侧的数据
            $scope.typeIcon = true;
            $scope.closeIcon = true;

            $scope.label1 = "小贴士:  主机资源查看：查看在当前环境信息(系统管理--- ->环境名称)所有CAN，VM信息(CPU，内存，ip)！";
            $scope.type1 = "error";
            //$scope.dismissOnTimeout = 3000;

            $scope.adminClassName =true;//开始的时候右侧不显示



        //点击 树的节点
            $scope.threeCols = {number: 4, gap:["80px", "80px"]};
            $scope.tenItem = {label: "查看:", required: true, value: ""};
            $scope.elevenItem = {label: "开始时间:", required: true, value: ""};
            $scope.twelveItem = {label: "结束时间:", required: true, value: ""};


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

                    if(option.id == "2"){ //按虚拟机查询
                       $scope.chaxun = false;
                        $scope.getvmResourceData = {
                            getdata: function (){
                                var promise = adminApplyMachineServe.getVirtualResource($scope.urlPostfix);
                                promise.then(function (response) {
                                        if (response.status == 200) {

                                            //var result = [];
                                            //for (var i = 0, len = response.data.hostOrVmModels.length; i < len; i += 10) {
                                            //    result.push(response.data.hostOrVmModels.slice(i, i + 10));
                                            //}


                                            //sessionStorage.setItem("siteTreeVmData", JSON.stringify(result)); //把分页的数据写入缓存中
                                            //$scope.cacheVmTableData = result;
                                            //$scope.vmSrcData.data =  $scope.cacheVmTableData[0]; //默认显示分页的是 第一页
                                            $scope.vmpagingModel.totalItems = response.data.total;   //分页 总信息数
                                            $scope.vmSrcData.data = response.data.hostOrVmModels;

                                        }

                                    },
                                    function (response) {
                                        alert(response.msg);
                                    });
                            }
                        };
                        $scope.getvmResourceData.getdata();
                    }else{ //按主机查询
                       $scope.chaxun = true;

                    }
                }

            };





        //点击导出报告
        $scope.reportResource = function(){
                    var  promise = adminApplyMachineServe.leadingOutHostReport($scope.urlPostfix);
                    promise.then(function(response){
                            if(response.status== 200){
                                console.log(response.data.reportPath);
                                var urlAddress = response.data.reportPath;
                               // window.open("http://localhost:8088/report/2017_06_29_12_44_36.xlsx ");
                                window.open("http://10.65.65.73:8081/lld/uploads/BJ/2017/test-20170706165009.xlsx ");
                                //document.location.href = response.data.reportPath;
                            }

                        },
                        function(response){
                            alert(response.msg);
                        });
        };



            //按虚拟机查询的 环形图

            $scope.vmViewModel1 = {
                "id" : "vmCircleView1",
                //"width" : "35%",
                "height" : 240,
                "r" : "75",
                "strokeWidth" : "22",
                "rotate" : -90,//此属性设置圆环起始角度.
                "showLegend" : true,
                centerText:{
                    text : "",       //文本值(无默认值)
                    fontSize : 23,     //文字大小(默认为：46)
                    color : "#FFB600"  //文本颜色(默认为：#FF9F21)
                },
                "data" : [{
                    value : 62,
                    name : "报警",
                    tooltip : "报警:62%",
                    color:"#83D773",

                    click : function() {
                        //实现点击圆环该区域回调函数代码。。
                    }
                    },
                    {
                        value : 38,
                        name : "容灾",
                        color : "#67D6F2",
                        tooltip : "容灾:5%"
                    }
                ]
            };

            $scope.vmViewModel2 = {
                "id" : "vmCircleView2",
                //"width" : "35%",
                "height" : 240,
                "r" : "75",
                "strokeWidth" : "22",
                "rotate" : -90,//此属性设置圆环起始角度.
                "showLegend" : true,
                centerText:{
                    text : "",       //文本值(无默认值)
                    fontSize : 23,     //文字大小(默认为：46)
                    color : "#FFB600"  //文本颜色(默认为：#FF9F21)
                },
                "data" : [{
                    value : 62,
                    name : "报警",
                    tooltip : "报警:62%",
                    color:"#83D773",

                    click : function() {
                        //实现点击圆环该区域回调函数代码。。
                    }
                },
                    {
                        value : 38,
                        name : "容灾",
                        color : "#67D6F2",
                        tooltip : "容灾:5%"
                    }
                ]
            };



            //表格数据
                //按主机查询的表格
            //$scope.hostMangerDisplayed = [];

            $scope.hostProgress ={
                maxValue:1
            };


            $scope.hostMangerSrcData = {  //前端分页把displayed放入 这个对象中，要是后台分页需要把他们放出来，  pageUpdate函数可以拿到当夜点击的页号
                hostMangerDisplayed:[],
                srcData:{
                    data:[], // 源数据
                    state: {
                        filter: false,
                        sort: false,
                        pagination: false
                    }
                }
            };
            $scope.hostMangerColumns = [
                {
                    title: "主机名",
                    width: "15%"
                },
                {
                    title: "状态",
                    width: "6%"
                },
                {
                    title: "已分配cpu",
                    width: "8%"
                },
                {
                    title: "CPU大小",
                    width: "8%"
                },
                {
                    title: "cpu使用率",
                    width: "10%"
                },

                {
                    title: "已分配内存",
                    width: "8%"
                },
                {
                    title: "内存大小",
                    width: "8%"
                },
                {
                    title: "内存使用率",
                    width: "10%"
                },

                {
                    title: "所属集群",
                    width: "8%"
                },
                {
                    title: "主机ip",
                    width: "12%"
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


            $scope.hostPagingModel = {
                totalItems:'',
                currentPage:1,
                pageSize:{
                    size: 10,
                    options: [10, 20, 40, 60],
                    change:function(currentPage,pageSizeNum,totalItems){
                        console.log(currentPage);
                        console.log(pageSizeNum);
                        console.log(totalItems);
                    }
                },
                pageNumChange:function(currentPage,pageSizeNum,totalItems){
                    //前端分页 上面的hostMangerDisplayed 没有 单独放出来就会出现这里点击拿不到数据 undefined
                },
                pageUpdate:function(currentPage,pageSizeNum,totalItems){
                    //同上
                }

            };






            //按虚拟机查询
           // $scope.vmDisplayed = [];

            $scope.vmSrcData = {
                vmDisplayed:[],
                srcData:{
                    data:'', // 源数据
                    state: {
                        filter: false,
                        sort: false,
                        pagination: false
                    }
                }
            };
            $scope.vmColumns = [
                {
                    title: "虚拟机名称",
                    width: "15%"
                },
                {
                    title: "Id",
                    width: "7%"
                },
                {
                    title: "状态",
                    width: "6%"
                },
                {
                    title: "类型",
                    width: "6%"
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
                    title: "cpu使用率",
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
                    title: "内存使用率",
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





            //分页工具导航条
              //按主机查看 分页导航条
            //$scope.pagingModel = {
            //    "id":"pagid3",
            //    "totalRecords" :'',
            //    "displayLength":10,
            //    "type" : "full_numbers",
            //    "hideDisplayLength" : true,
            //    "callback" : function(obj) {  //点击分页的回调函数
            //        $scope.hostMangerSrcData.data = '';
            //
            //        //$scope.hostMangerSrcData.data = JSON.parse(sessionStorage.getItem('siteTreeData'))[obj.currentPage-1];
            //        $scope.hostMangerSrcData.data=$scope.cacheHostTableData[obj.currentPage-1];
            //
            //        $scope.$digest();//个$digest循环运行时，watchers会被执行来检查scope中的models变化，在上下文之外改变,监听函数可能没监控到，module的变化
            //        //$scope.$apply();
            //
            //    }
            //};







                //按虚拟机查看的分页导航条
            //tinyUi1的组件

            //$scope.vmpagingModel = {
            //    "id":"pagid4",
            //    "totalRecords" :'',
            //    "displayLength":10,
            //    "type" : "full_numbers",
            //    "hideDisplayLength" : true,
            //    "callback" : function(obj) {  //点击分页的回调函数
            //        $scope.vmSrcData.data = '';
            //
            //        //$scope.vmSrcData.data = JSON.parse(sessionStorage.getItem('siteTreeVmData'))[obj.currentPage-1];
            //        $scope.vmSrcData.data = $scope.cacheVmTableData[obj.currentPage-1];
            //
            //        $scope.$digest();//个$digest循环运行时，watchers会被执行来检查scope中的models变化，在上下文之外改变,监听函数可能没监控到，module的变化
            //        //$scope.$apply();
            //
            //    }
            //
            //
            //};


            $scope.vmpagingModel = {
                totalItems:'',
                currentPage:1,
                pageSize:{
                    size: 10,
                    options: [10, 20, 40, 60]
                }
            };





        }];
    var module = angular.module("frm");
    module.tinyController("adminApplyMachineCtrl.ctrl",ctrl);
    return module;
});



