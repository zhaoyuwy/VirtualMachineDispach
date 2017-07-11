define([
    "fixtures/frameworkFixture",
], function (fixtures) {
    "use strict";
    var service = function (exception, $q, camel) {
        var rest_prefix = window.appWebPath+"/rest";
        this.queryEndpoints = function (options) {
             options = options || {};
             var promise = camel.get({
                   'url': rest_prefix + '/silvan/rest/v1.0/endpoints',
                   "timeout": 60000,
                   "params": {
                          "start": options.start || 0,
                          "limit": options.limit || 0,
                          "region": options.region
                   }
             });
             return promise;
        };
    };
    var basicManagerModule = angular.module('basic.config');
    basicManagerModule.tinyService('indexServ', service);
});