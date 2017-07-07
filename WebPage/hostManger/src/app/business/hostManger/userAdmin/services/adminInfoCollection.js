define([
    "language/inventory",
    "app-remote/business/hostManger/configures/config"
], function (i18n, configures) {
    "use strict";
    var service = function (exception, $q, camel) {

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
