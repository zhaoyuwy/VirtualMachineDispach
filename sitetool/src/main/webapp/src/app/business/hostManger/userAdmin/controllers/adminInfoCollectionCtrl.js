define([
    "language/inventory",
    "tiny-lib/jquery"
], function (i18n, $) {
    "use strict";
    var ctrl = ["$scope", "$rootScope", "$compile", "$location", "$timeout", "getCurrentDayServe", "adminInfoCollectionServe",
        function($scope, $rootScope, $compile, $location, $timeout, getCurrentDayServe, adminInfoCollectionServe) {
            $scope.i18n = i18n;

            //var approvalAllData = JSON.parse(sessionStorage.getItem("admin_approvalAllData"));//重新转换为JSON对象
            //
            //var token = sessionStorage.getItem("meeting_token");
            // 页面加载时，防止用户点击浏览器的前进和后退 或者刷新出现的问题
            $rootScope.menus = {
                url: "src/app/framework/views/menus.html"
            };
            $rootScope.footer = {
                url: "src/app/framework/views/footer.html"
            };


            $scope.$on("$viewContentLoaded", function () { //页面渲染完成执行的函数  类似于$(function(){}),或者$(document).ready()函数
                initRoles(); //定义一个初始化函数
            });

            function initRoles(){}



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

            //定义一个空数组，用于树节点复选选中插入
            var treeSiteChecked = [];

            //定义一个空数组，只用来接口数据 push全部二级子节点的
            var secondSiteData = [];

            //定义一个空数组专门用来保存一级子节点下面对应的二级字节的对象
            var firstSiteSecondData =[];

            Array.prototype.indexOf = function(val) {  //删除数组指定的某个元素
                for (var i = 0; i < this.length; i++) {
                    if (this[i] == val) return i;
                }
                return -1;
            };

            Array.prototype.remove = function(val) {  //给数组原型构造一个删除特定元素的方法
                var index = this.indexOf(val);
                if (index > -1) {
                    this.splice(index, 1);
                }
            };


            //默认是的第一个子页面 即 infoStep0
            $scope.alertInfo.content= "信息收集：对当前所配置的环境信息，所有的CAN，VM使用率(CPU，内存)进行查看任务的创建，任务结果会在主机资源查看中显示，并发送主机信息报告到管理员邮箱中。";
            $scope.alertInfo.contentNullError =true;


            $scope.currentStep = 1;
            $scope.steps = [
                {
                    state:"active",
                    title:"选择局点或区域",
                    templateUrl:"src/app/business/hostManger/userAdmin/views/include/infoStep0.html"
                },
                {
                    state:"undo",
                    title:"参数配置",
                    templateUrl:"src/app/business/hostManger/userAdmin/views/include/infoStep1.html"
                },
                {
                    state:"undo",
                    title:"下发",
                    templateUrl:"src/app/business/hostManger/userAdmin/views/include/infoStep2.html"
                }];
            $scope.infoStepModel = {
                previousTxt:"上一步",
                nextTxt:"下一步",
                finishTxt:"执行",
                cancelTxt:"取消"
            };
            $scope.stepForward = function(){

                if($scope.currentStep ==1){
                    if(JSON.stringify(treeSiteChecked)=='[]'){
                        $scope.alertInfo.content= "请选择需要收集信息的区域节点……";
                        $scope.alertInfo.contentNullError =true;
                        return;
                    }else {
                        //console.log(treeSiteChecked);
                        $scope.groups = [];
                        treeSiteChecked.forEach(function(value,index,arr){
                            var groupsOption ={
                                level: 'primary',
                                content:"局点名称："+treeSiteChecked[index].siteRegionName+'<br><br>'+ "局点信息："+treeSiteChecked[index].name
                            };
                            $scope.groups.push(groupsOption);
                        });
                    }
                }
                if($scope.currentStep ==2){

                   if(!$scope.infoCollection.value1){
                       $scope.alertInfo.content= "请输入任务名称";
                       $scope.alertInfo.contentNullError =true;
                       return;
                   }else if(!$scope.infoCollection.selectedId2){
                       $scope.alertInfo.content= "请选择任务类型";
                       $scope.alertInfo.contentNullError =true;
                       return;
                   }else if(!$scope.infoCollection.selectedId3){
                       $scope.alertInfo.content= "请选择时间";
                       $scope.alertInfo.contentNullError =true;
                       return;
                   }else if(!$scope.infoCollection.selectedId4){
                       $scope.alertInfo.content= "请选择小时";
                       $scope.alertInfo.contentNullError =true;
                       return;
                   }else if(!$scope.infoCollection.selectedId5){
                       $scope.alertInfo.content= "请选择分钟";
                       $scope.alertInfo.contentNullError =true;
                       return;
                   }
                    var sendTableData = [];
                    //先把时间多选的数据，全部拼接好
                    //console.log($scope.infoSelectOption3);
                    var initTimeOption =  $scope.infoSelectOption3[0];
                    for(var i = 1;i<$scope.infoSelectOption3.length;i++){
                        initTimeOption = initTimeOption+','+$scope.infoSelectOption3[i];
                    }


                    treeSiteChecked.forEach(function(value,index,arr){
                        var sendTableOption ={
                            evName: arr[index].evName,
                            siteRegionName:arr[index].siteRegionName,
                            siteRegion:arr[index].siteRegion,
                            siteLoginIp:arr[index].siteLoginIp,
                            taskName:$scope.infoCollection.value1,
                            taskType:$scope.infoCollection.selectedId2,
                            isSendEmail:$scope.infoCollection.checkList[0].checked,
                            periodTime:initTimeOption+' '+$scope.infoSelectOption4.label+'_'+$scope.infoSelectOption5.label
                        };
                        sendTableData.push(sendTableOption);
                    });
                    $scope.infoCollectionData.data = sendTableData;
                    //console.log( $scope.infoCollectionData.data);

                }


                $scope.steps[$scope.currentStep-1].state = "complete";
                $scope.currentStep++;
                $scope.steps[$scope.currentStep-1].state = "active";
            };
            //上一步
            $scope.stepBackward = function() {
                $scope.steps[$scope.currentStep-1].state = "undo";
                $scope.currentStep--;
                $scope.steps[$scope.currentStep-1].state = "active";
            };
            //完成
            $scope.finish = function() {
                var map = {}, dest = [];
                for(var i = 0; i < $scope.infoCollectionData.data.length; i++){
                    var ai = $scope.infoCollectionData.data[i];
                    if(!map[ai.id]){
                        dest.push({
                            evName: ai.evName,
                            siteNum:'',
                            sites: [ai]

                        });
                        map[ai.id] = ai;
                    }else{
                        for(var j = 0; j < dest.length; j++){
                            var dj = dest[j];
                            if(dj.id == ai.id){
                                dj.sites.push(ai);
                                break;
                            }
                        }
                    }
                }

                dest.forEach(function(value,index,arr){
                    arr[index].siteNum =  arr[index].sites.length;
                });

                var str = {
                    "total": 1,
                    "tasks": [{"regions": dest}]
                };

                $scope.postInfoOption ={
                    "postData": function(){
                        var  promise = adminInfoCollectionServe.postInfoCollection(str);
                        promise.then(function(response){
                                    //console.log(response);
                                if(response.status== 200){
                                    //alert("信息收集成功下发！");
                                    $scope.alertResponse = {  //提示信息
                                        contentNullError:true,
                                        type:"success",
                                        content:"信息收集成功下发!"
                                    };
                                }
                            },
                            function(response){
                                $scope.alertResponse = {  //提示信息
                                    contentNullError:true,
                                    type:"error",
                                    content:"信息收集成功下发!"
                                };
                            });
                    }
                };
                $scope.postInfoOption.postData();

                $scope.steps[$scope.currentStep-1].state = "complete";
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
                    enable: true, //选择框显不显示
                    autoCheckTriggle: true

                },
                callback: {
                    //onClick: clickFn,
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

            //树的接口数据请求
            $scope.requestOption ={
                "getData": function(){
                    var  promise = adminInfoCollectionServe.getTree();
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
                                            secondSiteData.push(treeGrandSon);
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

            //树节点复选的函数
            function checkdFn(event, treeId, treeNode) {
                    //console.log(treeNode); // 节点属性的对象数据
                    //console.log(treeId); //tree的id的值
                   // console.log(event);//元素的jq对象

                if(treeNode.nodeType == 'point'){  //点击二级子节点
                    if(treeNode.checked == true){
                        treeSiteChecked.push(treeNode);
                    }else if(treeNode.checked == false){
                        treeSiteChecked.forEach(function(value,index,arr){
                           if(value.id == treeNode.id){
                               treeSiteChecked.splice(index,1);
                           }
                        });
                        //treeSiteChecked.remove(treeNode);
                    }
                }else  if(treeNode.nodeType == 'City') {   //点击一级子节点
                    if(treeNode.checked == true) {

                        if(treeSiteChecked.length>0){  //开始为空数组，用于树节点复选选中插入
                            treeSiteChecked.forEach(function(value,index,arr){
                                treeNode.children.forEach(function(value1,index1,arr1){
                                    if(value1.id ==value.id){
                                        treeSiteChecked.splice(index,1); //有相同的删掉相同的对象
                                    }else{
                                        treeSiteChecked.push(value1);//没相同的就push
                                    }
                                })
                            })
                        }else{
                            treeNode.children.forEach(function(value1,index1,arr1){
                                treeSiteChecked.push(value1)
                            })
                        }
                    }else {
                        // 当选择为false时，treeSiteChecked长度不可能<0
                        treeNode.children.forEach(function(value1,index1,arr1){ //注意这里两个循环不能写反，否则只能删掉一个
                            var keyVal = value1.id; //不能直接比较对象本身，对象本身他们的字段不完全对等，应该比较的是id；应为
                            treeSiteChecked.forEach(function(value,index,arr){
                                if(keyVal ==value.id){
                                    treeSiteChecked.splice(index,1);
                                }
                            })
                        });

                    }
                }else if(treeNode.nodeType == 'business'){  //如果选择的是根节点，即 节点信息复选框
                    if(treeNode.checked==true){
                        treeSiteChecked.splice(0,treeSiteChecked.length);//先清空数组所有元素
                        treeSiteChecked = treeSiteChecked.concat(secondSiteData); //要把所有的二级子节点都要push进去，同时要把 根节点和一级子节点剔除出来,secondSiteData是已经保存好的全部的二级子节点

                    }else{
                        treeSiteChecked.splice(0,treeSiteChecked.length);//清空数组所有元素
                    }
                }
            }
            //节点文字样式
            function setFontCss(treeId, treeNode) {
                return ( treeNode.name == "hangzhou" ||treeNode.name == "langfang" || treeNode.name == "guangzhou" ||treeNode.name == "shanghai" || treeNode.name == "dalian") ? {"font-weight": "bold"} : {"font-weight": "normal"};
            }

            //单击点击树的节点 的回调函数，同时发送请求
            //function clickFn(click, treeId, treeNode) {
            //    console.log(treeNode); // 节点属性的对象数据
            //    console.log(treeId); //tree的id的值
            //    console.log(click);//元素的jq对象
            //}

            /*tree end*/



           /*第二个子页面*/
            /*时间轴 start*/

            //
            //$scope.groups = [
            //    {
            //        level: 'info',
            //        content: 'Dynamic Group Body - 1'
            //    },
            //    {
            //        level: 'primary',
            //        content: 'Dynamic Group Body - 2'
            //    },
            //
            //];

            /*时间轴 end*/

            /*右侧*/

            //?号提示
            $scope.paraTip = {
                content:
                "<p ><strong style='color: red;font-size: 16px'>信息收集->参数配置</strong></span></p><hr>"+
                "<p >任务类型选择的是'按天选择'" +
                "'选择时间'数据是当月的X号，0代表着1号，依次类推……</p><br>"+
                "<p>任务类型选择的是'按星期选择'" + "'选择时间'数据是对应星期中的星期X，0代表着星期一，依次类推……" + "</p>",
                position: "right-top",
                maxWidth:"300px",
                hideEffect:{
                    duration:50
                },
                showEffect: {
                    duration:200
                }
            };


            $scope.labelMaxWidth = '280px';
            $scope.fieldVertivalAlign = "middle";


            var infoOption2 =[{id:"0",type:0,label:"按天选择"},{id:"1",type:1,label:"按星期选择"}];

            var infoOption3;
            var infoOption31 = []; //按天选择
            (function(){
                var num = getCurrentDayServe.getDay();//获取当前时间对该月的天数
                for(var i = 0; i < num; i++){
                    var option = {};
                    option.id = i+'';
                    option.type = i;
                    option.label = i+1;
                    infoOption31.push(option);
                }
            })();

            //按星期选择
            var infoOption32 = [{id:"0",type:0,label:"星期一"},{id:"1",type:1,label:"星期二"},{id:"2",type:2,label:"星期三"},{id:"3",type:3,label:"星期四"},{id:"4",type:4,label:"星期五"},{id:"5",type:5,label:"星期六"},{id:"6",type:6,label:"星期天"}];

            var infoOption4=[{id:"0",label:"00"},{id:"1",label:"01"},{id:"2",label:"02"},{id:"3",label:"03"},{id:"4",label:"04"},{id:"5",label:"05"},{id:"6",label:"06"},{id:"7",label:"07"},{id:"8",label:"08"},{id:"9",label:"09"},{id:"10",label:"10"},{id:"11",label:"11"},{id:"12",label:"12"},{id:"13",label:"13"},{id:"14",label:"14"},{id:"15",label:"15"},{id:"16",label:"16"},{id:"17",label:"17"},{id:"18",label:"18"},{id:"19",label:"19"},{id:"20",label:"20"},{id:"21",label:"21"},{id:"22",label:"22"},{id:"23",label:"23"}];

            var infoOption5 = []; //按天选择
            (function(){
                var num = 60;//获取当前时间对该月的天数
                for(var i = 0; i < num; i++){
                    var option = {};
                    option.id = i+'';
                    option.type = i;
                    if(i<10){
                        option.label = "0"+i;
                    } else{
                        option.label = i+'';
                    }

                    infoOption5.push(option);
                }
            })();

            $scope.infoCollection = {
                label1:"任务名称",
                label2:"任务类型",
                label3:"选择时间",
                label4:' '+' '+' '+"时",
                label5:' '+' '+' '+"分",
                required:true,
                value1:'',
                placeholder1:'请输入任务名称',
                placeholder2:'请选择任务类型',
                placeholder3:'请选择时间',
                placeholder4:'请选择小时',
                placeholder5:'请选择分钟',
                disable:false,
                selectedId2:'',
                selectedId3:'',
                selectedId4:'',
                selectedId5:'',
                panelMaxHeight2: '200px',
                options2: infoOption2,
                options3:'',
                options4:infoOption4,
                options5:infoOption5,
                panelWidth2:'190px',
                panelWidth3:'190px',
                panelWidth4:'80px',
                panelWidth5:'80px',
                change2:function(option){
                   $scope.infoSelectOption2 = option;
                    if(option.type == 0){
                        $scope.infoCollection.options3 = infoOption31;
                    }else{
                        $scope.infoCollection.options3 = infoOption32;
                    }
                },
                change3:function(option){
                    $scope.infoSelectOption3 = option;
                    //console.log($scope.infoSelectOption3);
                },
                change4:function(option){
                    $scope.infoSelectOption4 = option;
                },
                change5:function(option){
                    $scope.infoSelectOption5 = option;
                },
                checkList: [{
                        title: "是否发送邮件",
                        checked: false
                     }]

            };



            $scope.infoCollectionData = { // 表格源数据，开发者对表格的数据设置请在这里进行
                data: '', // 源数据
                state: {
                    filter: false, // 源数据未进行过滤处理
                    sort: false, // 源数据未进行排序处理
                    pagination: false // 源数据未进行分页处理
                }


            };
            $scope.infoColumns = [
                {
                    title: "环境名称",
                    width: "10%"
                },
                {
                    title: "局点名称",
                    width: "10%"
                },
                {
                    title: "所属区域",
                    width: "10%"
                },
                {
                    title: "登录ip地址",
                    width: "25%"
                },
                {
                    title: "任务名称",
                    width: "10%"
                },
                {
                    title: "任务类型",
                    width: "10%"
                },
                {
                    title: "发送邮件",
                    width: "10%"
                },
                {
                    title: "选择时间",
                    width: "15%"
                }
            ];




        }];
    var module = angular.module("frm");
    module.tinyController("adminInfoCollectionCtrl.ctrl",ctrl);
    return module;
});