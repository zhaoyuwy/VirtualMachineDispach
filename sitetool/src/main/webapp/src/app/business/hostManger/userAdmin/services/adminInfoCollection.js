define([
    "language/inventory",
    "app-remote/business/hostManger/configures/config"
], function (i18n, configures) {
    "use strict";
    var service = function (exception, $q, camel) {

        //请求树的接口
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

        //下发信息收集
        this.postInfoCollection = function (params) {
            var promise = camel.post({
                'url': {
                    "s": configures.hostManger_url+"/task/savePeriodTask",
                    "o": {}
                },
                "params":params,
                "timeout":3000,
                "mask": true

            });
            return promise;
        };





        this.getPassList = function (param) {
            var promise = camel.post({
                'url': {
                    "s": configures.hostManger_url+ "hecpass/pass_list",
                    "o": {}
                },
                "params":param,
                "timeout":500,
                "mask": true

            });
            return promise;
        };


    };
    var basicManagerModule = angular.module('frm');
    basicManagerModule.tinyService('adminInfoCollectionServe', service);
});
