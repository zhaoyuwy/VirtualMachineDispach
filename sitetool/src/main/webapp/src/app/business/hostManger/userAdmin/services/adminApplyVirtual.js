define([
    "language/inventory",
    "app-remote/business/hostManger/configures/config",
    "fixtures/hostManger/userAdminFixture"
], function (i18n, configures,userAdmin) {
    "use strict";
    var service = function (exception, $q, camel) {

        //configures.hostManger_url+
        this.getTree = function () {
            var promise = camel.get({
                'url': {
                    "s": "/hostManger/urlCommon/applyTree",
                    "o": {}
                },
                "timeout":500,
                "mask": true

            });
            return promise;
        };
    };
    var basicManagerModule = angular.module('frm');
    basicManagerModule.tinyService('adminApplyVirtualServe', service);
});
