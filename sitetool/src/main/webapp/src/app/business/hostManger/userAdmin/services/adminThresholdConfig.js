define([
    "language/inventory",
    "app-remote/business/hostManger/configures/config"
], function (i18n, configures) {
    "use strict";
    var service = function (exception, $q, camel) {

        this.getWaitDiscussionList = function () {
            var promise = camel.get({
                'url': {
                    "s": configures.hostManger_url+"",
                    "o": {}
                },
                "timeout":500,
                "mask": true

            });
            return promise;
        };
    };
    var basicManagerModule = angular.module('frm');
    basicManagerModule.tinyService('adminThresholdConfigServe', service);
});
