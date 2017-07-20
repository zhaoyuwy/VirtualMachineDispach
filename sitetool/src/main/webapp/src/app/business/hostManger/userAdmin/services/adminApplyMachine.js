define([
    "language/inventory",
    "app-remote/business/hostManger/configures/config",
    "fixtures/hostManger/userAdminFixture"
], function (i18n, configures,userAdmin) {
    "use strict";
    var service = function (exception, $q, camel) {

        //请求树的数据
        this.getTree = function () {
            var promise = camel.get({
                'url': {
                    "s": configures.hostManger_url+"/getTopologyTreeInfo",
                    "o": {}
                },
                "timeout":3000,
                "mask": true

            });
            return promise;
        };

        //点击树的节点，然后请求数据
            //默认是按照主机资源查看
        this.getResource = function (param) {
            var promise = camel.get({
                'url': {
                    "s": configures.hostManger_url+"/getCanInfo/"+param,
                    "o": {}
                },
                "timeout":30000,
                //"async":true,
                "mask": true

            });
            return promise;
        };


        //获取虚拟机资源（按虚拟机查看资源）
        this.getVirtualResource = function (param) {
            var promise = camel.get({
                'url': {
                    "s": configures.hostManger_url+"/getVmInfo/"+param,
                    "o": {}
                },
                "timeout":30000,
                "mask": true

            });
            return promise;
        };

        //导出报告

        this.leadingOutHostReport = function (param) {
            var promise = camel.get({
                'url': {
                    "s": configures.hostManger_url+"/report/getHostReport/"+param,
                    "o": {}
                },
                "timeout":3000,
                //"async":true,
                "mask": true

            });
            return promise;
        };



    };
    var basicManagerModule = angular.module('frm');
    basicManagerModule.tinyService('adminApplyMachineServe', service);
});
