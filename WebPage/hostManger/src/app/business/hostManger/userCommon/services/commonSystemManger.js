define([
    "language/inventory",
    "app-remote/business/hostManger/configures/config"
], function (i18n, configures) {
    "use strict";
    var service = function (exception, $q, camel) {

        this.getmenuData = function (param) {
            var promise = camel.get({
                'url': {
                    "s": configures.hostManger_url+"",
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
    basicManagerModule.tinyService('commonSystemMangerServe', service);
});

