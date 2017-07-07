/*global define*/
define([
    "language/inventory",
    'bootstrap/bootstrap.min'
], function (i18n,bootstrap) {
    "use strict";

    var ctrl = ["$scope", "$state","indexServ",
        function ($scope, $state,indexServ) {
            $scope.i18n = i18n;
            $scope.regionIdUserInfo = '';
            $scope.serviceEndpointData=[];
            $scope.homeEndpoints = null;
            $scope.resourceCenterDisable=true;
            $scope.missionCenterDisable=true;
            $scope.tenantProtectionDisable=true;
            $scope.evaluationAnalysisDisable=true;
            $scope.changeAnalysisDisable=true;
            $scope.securityCenterDisable=true;
            $scope.monitoringCenterDisable=true;
            $scope.resourceCenter=[];
            $scope.missionCenter=[];
            $scope.tenantProtection=[];
            $scope.evaluationAnalysis=[];
            $scope.changeAnalysis=[];
            $scope.securityCenter=[];
            $scope.monitoringCenter=[];
            $scope.language=false;

            if($scope.languageName=='English'){
                $(".resourceCenter-construction").attr('src','./theme/home/images/1.1-1.png');
                $(".missionCenter-construction").attr('src','./theme/home/images/2.1-1.png');
                $(".changeAnalysis-construction").attr('src','./theme/home/images/5.1-1.png');
                $(".evaluationAnalysis-construction").attr('src','./theme/home/images/4.1-1.png');
                $(".tenantProtection-construction").attr('src','./theme/home/images/3.1-1.png');
                $(".securityCenter-construction").attr('src','./theme/home/images/6.1-1.png');
                $(".monitoringCenter-construction").attr('src','./theme/home/images/7.1-1.png');
            }

            var promiseUser=indexServ.queryEndpoints({"region": $scope.regionIdUserInfo});
            promiseUser.then(function (data) {
                dealAllEndpoints(data);
            }).then(function (data) {
                dealServiceEndpoints();
            });

        function dealAllEndpoints(data) {
            if (!data || !data.endpoints) {
                return;
            }
            var endpoints = data.endpoints;
            var tmpEndpoints = [];
            var endpoint;
            for (var item = 0; item < endpoints.length; item++) {
                endpoint = endpoints[item];
                if (endpoint.id === window.global_endpoint_id) {
                    $scope.endpointNames = endpoint.name;
                }
                if (endpoint.id === "home") {
                    $scope.homeEndpoints = endpoint;
                } else {
                    tmpEndpoints.push(endpoint);
                }
            }
            $scope.serviceEndpointData = tmpEndpoints;
        }

        function dealServiceEndpoints() {
            var endpoints = $scope.serviceEndpointData;
            if (!endpoints) {
                return [];
            }
            var catalogs = {};
            var endpoint;
            var catalog;
            for (var item = 0; item < endpoints.length; item++) {
                //根据类别分类
                endpoint = endpoints[item];
                catalog = $.trim(endpoint.catalog);
                catalogs[catalog] = catalogs[catalog] || [];
                catalogs[catalog].push(endpoint);
            }
            var result = [];
            var index;
            for (index in catalogs) {
                if (catalogs.hasOwnProperty(index)) {
                    result.push({
                        catalog: index,
                        endpoints: catalogs[index]
                    });
                }
            }
            $scope.serviceEndpoint = result;
            serviceEndpoint();
        }

        function serviceEndpoint(){
            var endpoints = $scope.serviceEndpoint;
            if (!endpoints) {
                 return [];
            }
            var endpoint;
            for(var item = 0; item < endpoints.length ; item++){
                endpoint = endpoints[item];
                var object={'name':'...'};
                if(endpoint.catalog==i18n.resourceCenter){
                    $(".resourceCenter-shadow").attr('src','./theme/home/images/enabled/colour1.11.png');
                    $(".resourceCenter").attr('src','./theme/home/images/enabled/colour1.png');
                    $(".resourceCenter").addClass('resourceCenter-yes');
                    $(".resourceCenter-vehice").attr('src','./theme/home/images/enabled/che.png');
                    $(".resourceCenter-construction").attr('src','');
                    $scope.resourceCenterDisable=false;
                    if(endpoint.endpoints.length >= 3){
                       $scope.resourceCenter.endpoints = endpoint.endpoints.slice(0,3);
                       $scope.resourceCenter.endpoints.push(object);
                    }else{
                        $scope.resourceCenter.endpoints = endpoint.endpoints;
                    }
                    console.log($scope.resourceCenter.endpoints);
                    $('.resourceCenter-tip .titleOne').addClass('enable');
                }
                if(endpoint.catalog==i18n.missionCenter){
                    $(".missionCenter-shadow").attr('src','./theme/home/images/enabled/colour2.11.png');
                    $(".missionCenter").attr('src','./theme/home/images/enabled/colour2.png');
                    $(".missionCenter").addClass('missionCenter-yes');
                    $(".missionCenter-construction").attr('src','');
                    $scope.missionCenterDisable=false;
                    if(endpoint.endpoints.length >= 3){
                       $scope.missionCenter.endpoints = endpoint.endpoints.slice(0,3);
                       $scope.missionCenter.endpoints.push(object);
                    }else{
                        $scope.missionCenter.endpoints = endpoint.endpoints;
                    }
                    $('.missionCenter-tip .titleOne').addClass('enable');
                }
                if(endpoint.catalog==i18n.tenantProtection){
                    $(".tenantProtection-shadow").attr('src','./theme/home/images/enabled/colour3.11.png');
                    $(".tenantProtection").attr('src','./theme/home/images/enabled/colour3.png');
                    $(".tenantProtection").addClass('tenantProtection-yes');
                    $(".tenantProtection-construction").attr('src','');
                    $scope.tenantProtectionDisable=false;
                    if(endpoint.endpoints.length >= 3){
                       $scope.tenantProtection.endpoints = endpoint.endpoints.slice(0,3);
                       $scope.tenantProtection.endpoints.push(object);
                    }else{
                        $scope.tenantProtection.endpoints = endpoint.endpoints;
                    }
                    $('.tenantProtection-tip .titleOne').addClass('enable');
                }
                if(endpoint.catalog==i18n.evaluationAnalysis){
                    $(".evaluationAnalysis-shadow").attr('src','./theme/home/images/enabled/colour4.11.png');
                    $(".evaluationAnalysis").attr('src','./theme/home/images/enabled/colour4.png');
                    $(".evaluationAnalysis").addClass('evaluationAnalysis-yes');
                    $(".evaluationAnalysis-construction").attr('src','');
                    $scope.evaluationAnalysisDisable=false;
                    if(endpoint.endpoints.length >= 3){
                       $scope.evaluationAnalysis.endpoints = endpoint.endpoints.slice(0,3).push({'name':'...'});
                       $scope.evaluationAnalysis.endpoints.push(object);
                    }else{
                        $scope.evaluationAnalysis.endpoints = endpoint.endpoints;
                    }
                    $('.evaluationAnalysis-tip .titleOne').addClass('enable');
                }
                if(endpoint.catalog==i18n.changeAnalysis){
                    $(".changeAnalysis-shadow").attr('src','./theme/home/images/enabled/colour5.11.png');
                    $(".changeAnalysis").attr('src','./theme/home/images/enabled/colour5.png');
                    $(".changeAnalysis").addClass('changeAnalysis-yes');
                    $(".changeAnalysis-construction").attr('src','');
                    $scope.changeAnalysisDisable=false;
                    if(endpoint.endpoints.length >= 3){
                       $scope.changeAnalysis.endpoints = endpoint.endpoints.slice(0,3);
                       $scope.changeAnalysis.endpoints.push(object);
                    }else{
                        $scope.changeAnalysis.endpoints = endpoint.endpoints;
                    }
                    $('.changeAnalysis-tip .titleOne').addClass('enable');
                }
                if(endpoint.catalog==i18n.securityCenter){
                    $(".securityCenter-shadow").attr('src','./theme/home/images/enabled/colour6.11.png');
                    $(".securityCenter").attr('src','./theme/home/images/enabled/colour6.png');
                    $(".securityCenter").addClass('securityCenter-yes');
                    $(".securityCenter-vehice").attr('src','./theme/home/images/enabled/che2.png');
                    $(".securityCenter-construction").attr('src','');
                    $scope.securityCenterDisable=false;
                    if(endpoint.endpoints.length >= 3){
                       $scope.securityCenter.endpoints = endpoint.endpoints.slice(0,3);
                       $scope.securityCenter.endpoints.push(object);
                    }else{
                        $scope.securityCenter.endpoints = endpoint.endpoints;
                    }
                    $('.securityCenter-tip .titleOne').addClass('enable');
                }
                if(endpoint.catalog==i18n.monitoringCenter){
                    $(".monitoringCenter-shadow").attr('src','./theme/home/images/enabled/colour7.11.png');
                    $(".monitoringCenter").attr('src','./theme/home/images/enabled/colour7.png');
                    $(".monitoringCenter").addClass('monitoringCenter-yes');
                    $(".monitoringCenter-vehice").attr('src','./theme/home/images/enabled/che1.png');
                    $(".monitoringCenter-construction").attr('src','');
                    $scope.monitoringCenterDisable=false;
                    if(endpoint.endpoints.length >= 3){
                       $scope.monitoringCenter.endpoints = endpoint.endpoints.slice(0,3);
                       $scope.monitoringCenter.endpoints.push(object);
                    }else{
                        $scope.monitoringCenter.endpoints = endpoint.endpoints;
                    }
                    $('.monitoringCenter-tip .titleOne').addClass('enable');
                }

            }
        }


    }];
    var module = angular.module('basic.config');
    module.tinyController('index.ctrl', ctrl);
    return module;
});
