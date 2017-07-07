define([], function () {
    "use strict";
    var ctrl = function ($scope, $state) {
        setTimeout( function(){
            var lay = new tinyWidget.Layout({
                "id" : "leftBar",
                "subheight" : 67 //页面中除了Layout区域外的高度之和
                //"footerHeight" : 60 //页脚部分高度
            });
            function setCurActive() {
                try {
                    lay.opActive($("a[ui-sref='" + $state.current.name + "']"));
                    lay.opActive($("a[ui-sref='" + $state.current.name + "']", $(".tiny-layout-west", $("#leftBar"))).last());
                    // 内容解析后，重置layout高度
                    setTimeout(function(){
                        lay.resetHeight();
                    },0);
                } catch (e) {

                }
            }
            setCurActive();

            // 用于标志是否为点击 tiny-layout-head 所导致的stateChangeSuccess事件，此种情况下无需设置layout层级菜单激活状态
            var isheadClick = false;
            $scope.headClickFn = function() {
                isheadClick = true;
            };
            $scope.$on("$stateChangeSuccess", function (event) {
                if(isheadClick) {
                    isheadClick = false;
                    return;
                }
                lay&&setCurActive();
            })

        }, 0);
    };
    ctrl.$injector = ["$scope", "$state"];
    return ctrl;
});