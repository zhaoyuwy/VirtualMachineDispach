define([
    "language/inventory",
    "tiny-lib/jquery"
], function (i18n, $) {
    "use strict";
    var ctrl = ["$scope", "$rootScope", "$compile", "adminApplyVirtualServe", "$location", "$timeout",
        function($scope, $rootScope, $compile, adminApplyVirtualServe, $location, $timeout) {
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


            $scope.typeIcon = true;
            $scope.closeIcon = true;

            $scope.label1 = "小贴士 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad amet doloLorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad amet dolores earum facere hic incidunt molestias mollLorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad amet dolores earum facere hic incidunt molestias mollLorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad amet dolores earum facere hic incidunt molestias mollLorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad amet dolores earum facere hic incidunt molestias mollres earum facere hic incidunt molestias mollitia, nulla quas quidem repudiandae sapiente sit tenetur ut! Animi aut commodi quasi!";
            $scope.type1 = "error";
            //$scope.dismissOnTimeout = 3000;
            //$scope.adminClassName =true;//开始的时候右侧不显示



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



        }];
    var module = angular.module("frm");
    module.tinyController("adminApplyVirtualCtrl.ctrl",ctrl);
    return module;
});