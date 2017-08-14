define([
    "language/inventory",
    "app-remote/business/hostManger/configures/config",
    "fixtures/hostManger/userAdminFixture"
], function (i18n, configures,userAdmin) {
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



        this.vmApply= function (param) {
            var promise = camel.post({
                'url': {
                    "s": configures.hostManger_url+"/vmApply",
                    "o": {}
                },
                "timeout":3000,
                "params":param,
                "mask": true

            });
            return promise;
        };



        //configures.hostManger_url+
        //this.getTreeData = function () {
        //    var promise = camel.get({
        //        'url': {
        //            "s": "/hostManger/urlCommon/applyTree",
        //            "o": {}
        //        },
        //        "timeout":500,
        //        "mask": true
        //
        //    });
        //    return promise;
        //};
    };
    var basicManagerModule = angular.module('frm');
    basicManagerModule.tinyService('adminApplyVirtualServe', service);
});
