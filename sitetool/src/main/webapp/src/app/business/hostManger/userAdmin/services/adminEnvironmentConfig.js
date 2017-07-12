define([
    "language/inventory",
    "app-remote/business/hostManger/configures/config"
], function (i18n, configures) {
    "use strict";
    var service = function (exception, $q, camel) {


        //添加环境节点的请求的数据
        this.postEvsite = function(param){
            var promise = camel.post({
                'url': {
                    "s": configures.hostManger_url+"/saveSite",
                    "o": {}
                },
                "timeout":15000,
                "params":param,
                "mask": true
            });
            return promise;
        };


        //刷新页面时请求的数据
        this.getEvSite =function(){
            var promise = camel.get({
                'url': {
                    "s": configures.hostManger_url+"/getTopologyTreeInfo",
                    "o": {}
                },
                "timeout":500,
                "mask": true
            })
            return promise;
        };




        this.getWaitDiscussionList = function () {
            var promise = camel.post({
                'url': {
                    "s": configures.hostManger_url+"",
                    "o": {}
                },
                "timeout":500,
                "params":param,
                "mask": true

            });
            return promise;
        };



    };
    var basicManagerModule = angular.module('frm');
    basicManagerModule.tinyService('adminEnvironmentConfigServe', service);
});
