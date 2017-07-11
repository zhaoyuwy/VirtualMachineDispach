define([
    "language/inventory",
    "app-remote/business/hostManger/configures/config"
], function (i18n, configures) {
    "use strict";
    var service = function (exception, $q, camel) {




        this.postEvsite = function(param){
            var promise = camel.post({
                'url': {
                    "s": configures.hostManger_url+"/saveSite",
                    "o": {}
                },
                "timeout":500,
                "params":param,
                "mask": true
            })
            return promise;
        }


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
