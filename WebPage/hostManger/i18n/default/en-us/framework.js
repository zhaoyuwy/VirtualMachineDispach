/**
 * Created on 2015/1/31.
 */
/* global define */
/* global $ */
define(["i18n/default/en-us/framework.common", "language-remote/framework.ext"], function (common, ext) {
    "use strict";
    var framework = $.extend(common, ext);
    return framework;
});