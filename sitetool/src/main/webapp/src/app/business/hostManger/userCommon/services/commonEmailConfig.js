define([
    "language/inventory",
    "app-remote/business/hostManger/configures/config"
], function (i18n, configures) {
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


        this.sendEmailConfig = function (param) {
            var promise = camel.post({
                'url': {
                    "s": configures.hostManger_url+"/saveMail",
                    "o": {}
                },
                "timeout":3000,
                "params":param,
                "mask": true

            });
            return promise;
        };


        this.testEmailConfig = function (param) {
            var promise = camel.post({
                'url': {
                    "s": configures.hostManger_url+"/Email",
                    "o": {}
                },
                "timeout":3000,
                "params":param,
                "mask": true

            });
            return promise;
        };


    };
    var basicManagerModule = angular.module('frm');
    basicManagerModule.tinyService('commonEmailConfigServe', service);
});
