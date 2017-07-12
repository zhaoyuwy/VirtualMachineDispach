define([
    "language/inventory",
    "app-remote/business/hostManger/configures/config",
    "fixtures/hostManger/userAdminFixture"
], function (i18n, configures,userAdmin) {
    "use strict";
    var service = function (exception, $q, camel) {

        //
        this.getTree = function () {
            var promise = camel.get({
                'url': {
                    "s": configures.hostManger_url+"/getTopologyTreeInfo",
                    "o": {}
                },
                "timeout":500,
                "mask": true

            });
            return promise;
        };
    };
    var basicManagerModule = angular.module('frm');
    basicManagerModule.tinyService('adminApplyMachineServe', service);
});
