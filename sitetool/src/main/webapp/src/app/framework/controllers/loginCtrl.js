/**
 * Created by cWX444815 on 2017/4/19.
 */

define(["language/inventory"], function (i18n) {
    "use strict";
    var loginCtrl = ["$scope","$location","$rootScope", "frameworkService", "$state",function ($scope, $location, $rootScope, frameworkService, $state) {

        $scope.i18n = i18n;
        $scope.fieldVertivalAlign = "middle";
        $scope.itemVerticalAlign = "middle";
        $scope.userNameItem = {
            label: i18n.userName,
            required: true,
            value: ""
        };
        $scope.passWordItem = {
            label: i18n.password,
            required: true
        };

        $scope.userItem = {
            label: "",
            userType:i18n.Average_user,  //代表着单选中的值
            defaultSelected: i18n.Average_user,
            adminUser: i18n.Managing_users,
            commonUser:i18n.Average_user,
            required: true
        };

        $scope.HECPASS_button = {
            okLabel: i18n.Sign_in
        };

        // 页面加载时，防止用户点击浏览器的前进和后退带来的影响
        $rootScope.menus = {};
        $rootScope.footer = {};



        console.log($rootScope.supportLanguage);
        console.log($rootScope.language);
        console.log($rootScope.languageName);

        if($rootScope.language === 'zh-cn'){ // 判断使用了哪国的语言
            $scope.pic_loading = 'theme/default/images/login_poster_zh.png'
            $scope.form_language = "form_table form_offset_zh";

        }else if($rootScope.language === 'en-us'){
            $scope.pic_loading = 'theme/default/images/login_poster_en.png'
            $scope.form_language = "form_table form_offset_en";
        }

        //按回车键执行函数

        $scope.myKeyup = function(e){

            //IE 编码包含在window.event.keyCode中，Firefox或Safari 包含在event.which中
            var keycode = window.event?e.keyCode:e.which;
            if(keycode==13){
                $scope.hecLogin();
            }
        };



        $scope.hecLogin = function(){

            if($scope.userItem.userType==i18n.Average_user){ //是否为普通用户
                $scope.hostUserType = "0";
            }else{
                $scope.hostUserType = "1";
            }
            var HECPASSInfo = {
                "userName":$scope.userNameItem.value,
                "userPwd":$scope.passWordItem.value,
                "userType": $scope.hostUserType
            };

            if($scope.userNameItem.value == ''){
                alert(i18n.input_userName);
                return;
            }
            if($scope.passWordItem.value == ''){
                alert(i18n.input_userPassword);
                return
            }
            var str = JSON.stringify(HECPASSInfo);


            $scope.operateLogin = {
                "login":function(){
                    console.log(str);
                    var promise = frameworkService.HECPASS_login(str);
                    promise.then(function(response){
                            //把用户名赋值给menusCtrl的用户名
                            //var hecMessage = JSON.parse(response);
                            var hecMessage= response; //返回的不是string类型
                            if(hecMessage.status == 200){

                                  if($scope.hostUserType == 0){  //普通用户
                                      sessionStorage.setItem("hostManger",$scope.userNameItem.value);
                                      sessionStorage.setItem("host-leftmenuNumber","one");

                                      setTimeout(
                                          function(){
                                              $rootScope.menus = {
                                                  url: "src/app/framework/views/menus.html"
                                              };
                                              $rootScope.footer = {
                                                  url: "src/app/framework/views/footer.html"
                                              };
                                          },500
                                      );

                                      $location.path('/hostMangerTotal/commonApplyMachine');

                                  }else if($scope.hostUserType == 1){ //管理用户
                                      sessionStorage.setItem("hostManger",$scope.userNameItem.value);
                                      sessionStorage.setItem("host-leftmenuNumber","two");
                                      setTimeout(
                                          function(){
                                              $rootScope.menus = {
                                                  url: "src/app/framework/views/menus.html"
                                              };
                                              $rootScope.footer = {
                                                  url: "src/app/framework/views/footer.html"
                                              };
                                          },500
                                      );

                                      $location.path('/hostMangerTotal/adminApplyMachine');
                                  }


                            }else {
                                alert(hecMessage.msg);
                            }

                        },
                        function(response){
                          alert(i18n.input_error);
                        });
                }
            };
            $scope.operateLogin.login();
        }

    }];

    var frameModule = angular.module('frm');
    frameModule.tinyController('loginCtrl.ctrl', loginCtrl);
    return frameModule;
});