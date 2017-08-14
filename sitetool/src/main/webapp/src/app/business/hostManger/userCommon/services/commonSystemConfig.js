define([
    "language/inventory",
    "app-remote/business/hostManger/configures/config"
], function (i18n, configures) {
    "use strict";
    var service = function (exception, $q, camel) {

        this.setSystemConfig = function(param) {
            var promise = camel.post({
                'url': {
                    "s": configures.hostManger_url+"/saveSystemConfig",
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
    basicManagerModule.tinyService('commonSystemConfigServe', service);
});

