/**
 * 提供表单校验的服务
 */
define([], function () {
    "use strict";
    //Register a service constructor, which will be invoked with new to create the service instance
    function Validator() {
        /*名称长度推荐64、其次128，描述没有字符限制，推荐256个字符，特殊的地方特殊处理*/
        this.nameRe = "/^[a-zA-Z0-9-_]*$/";
        this.ChineseRe = "/^[\\u4e00-\\u9fa5a-zA-Z0-9-_]*$/";
        /*点，空格，下划线，中划线，不能以空格开头结尾*/
        this.extendName = "/^(?!\\s)(?!.*?\\s$)[a-zA-Z0-9_.\\-\\s]*$/";
        this.desRe = "/^[^<>]*$/";

        this.imageName = "/^(?!\\s)(?!.*?\\s$)[a-zA-Z0-9_.\\-\\s]{1,128}$/";
        this.notEmpty = "/^[\\S]*$/";
        this.VolumenameRe = "^[a-zA-Z0-9_]*$";
        this.unixFilePathName = "/^(/\\w+)+(\\.\\w+)?$/";
        this.winFilePathName = "/^[a-zA-Z]:(\\\\\\w+)+(\\.\\w+)?$/";
        this.letterNumber = "/^[a-zA-Z0-9]+$/";
        this.phoneRe = "((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)";
        this.macRe = "^[A-Fa-f\\d]{2}:[A-Fa-f\\d]{2}:[A-Fa-f\\d]{2}:[A-Fa-f\\d]{2}:[A-Fa-f\\d]{2}:[A-Fa-f\\d]{2}$";
        this.notAllSpaceReg = "/^.*[^ ].*$/";
        this.notAllNumReg = "/^[0-9]*$/";
        //域名校验正则表达式
        this.domainName = "(^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[-a-zA-Z0-9]{1,63})*(\.[-a-zA-Z0-9]{0,62}[a-zA-Z0-9])$)|(^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]$)|(^[a-zA-Z0-9]$)";
        //上行端口校验正则表达式
        this.upLinkPort = "((^([0-9])+/([0-9])+/([0-9])+(,(([0-9])+/([0-9])+/([0-9])+))*$)|(^$))";
        //ipv6正则表达式
        this.ipv6Reg = "^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$";

        //CIFS 共享目录正则表达式
        this.cifsDirReg = /^((\\\\(([1-9]|[1-9]\d|(10|11)\d|12[0-6]|12[8-9]|1[3-9]\d|2[0-1]\d|22[0-3])(\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])){3})){1})((((\\){1})([a-zA-Z0-9-_ .]{1,})){1,})$/;
        this.nfsDirReg = /^([1-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])){3}:\/[\S.]+$/;
        this.DeviceName = "(^/dev/xvd)[e-z]{1}$";
        this.DeviceNameRe = "/(^/dev/xvd)[e-z]{1}$/";
    }

    var subRegRex = /\{\s*([^\|\}]+?)\s*(?:\|([^\}]*))?\s*\}/g;
    /**
     * 用于替换国际化配置文件中的花括号
     */
    Validator.prototype.i18nReplace = function (s, o) {
        return ((s.replace) ? s.replace(subRegRex, function (match, key) {
            return (!angular.isUndefined(o[key])) ? o[key] : match;
        }) : s);
    };
    //掩码是否合法
    Validator.prototype.maskValidator = function (ip) {
        try {
            var data = ip.split(".");
            if (data[0] == "" || data[1] == "" || data[2] == "" || data[3] == "") {
                return false;
            }

            data[0] = parseInt(data[0]);
            data[1] = parseInt(data[1]);
            data[2] = parseInt(data[2]);
            data[3] = parseInt(data[3]);
            if (data[0] == 0 && data[1] == 0 && data[2] == 0 && data[3] == 0) {
                return false;
            }
            if (data[3] > 248) {
                return false;
            }
            var ip_binary = (data[0] + 256).toString(2).substring(1)
                + (data[1] + 256).toString(2).substring(1)
                + (data[2] + 256).toString(2).substring(1)
                + (data[3] + 256).toString(2).substring(1);

            if (-1 != ip_binary.indexOf("01")) {
                return false;
            }
            else {
                return true;
            }
        } catch (e) {
            return false;
        }
    };
    //掩码与子网IP的与是否等于子网IP
    Validator.prototype.maskAndSubnetValidator = function (mask, ip) {
        try {
            var maskData = mask.split(".");
            var ipData = ip.split(".");
            if ((parseInt(ipData[0]) & parseInt(maskData[0])) == parseInt(ipData[0])
                && (parseInt(ipData[1]) & parseInt(maskData[1])) == parseInt(ipData[1])
                && (parseInt(ipData[2]) & parseInt(maskData[2])) == parseInt(ipData[2])
                && (parseInt(ipData[3]) & parseInt(maskData[3])) == parseInt(ipData[3])) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    };
    //IPV4格式校验
    Validator.prototype.ipv4Validator = function (ip, mask) {
        var reg = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d?)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d?|0)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d?|0)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d?)$/i;
        if (!ip) {
            return true;
        }
        if (!reg.test(ip)) {
            return false;
        }

        var ipItem = [];
        var ipStr = "";
        var maskStr = "";

        ipItem = ip.split(".");
        for (var j = 0; j < (32 - mask); j++) {
            maskStr = maskStr + "1";
        }

        for (var i = 0; i < ipItem.length; i++) {
            var tmpItem = parseInt(ipItem[i]).toString(2);
            var tmpItemStr = tmpItem.toString();
            var len = tmpItemStr.length;
            while (len < 8) {
                tmpItemStr = "0" + tmpItemStr;
                len++;
            }
            ipStr = ipStr + tmpItemStr;
        }
        var ips = ipStr.substr(mask, 32 - mask);

        return ips !== maskStr;
    };

    //IP是否在子网内
    Validator.prototype.subnetValidator = function (ip, mask, subnet) {
        try {
            if (ip == subnet) {
                return false;
            }

            if (typeof mask === "number") {
                var maskArr = [0, 0, 0, 0];
                var prefix = Math.floor(mask / 8);
                var rest = mask % 8;
                var index = 0;
                for (index = 0; index < prefix; index++) {
                    maskArr[index] = 255;
                }
                if (rest) {
                    var restMask = "11111111".substr(0, rest) + "00000000".substr(0, 8 - rest);
                    maskArr[index] = parseInt(restMask, 2);
                }
                mask = maskArr.join(".")
            }

            var ipData = ip.split(".");
            var maskData = mask.split(".");
            var subnetData = subnet.split(".");
            if ((parseInt(ipData[0]) & parseInt(maskData[0])) == parseInt(subnetData[0])
                && (parseInt(ipData[1]) & parseInt(maskData[1])) == parseInt(subnetData[1])
                && (parseInt(ipData[2]) & parseInt(maskData[2])) == parseInt(subnetData[2])
                && (parseInt(ipData[3]) & parseInt(maskData[3])) == parseInt(subnetData[3])) {
                return true;
            }
            else {
                return false;
            }
        } catch (e) {
            return false;
        }
    };
    //ipv6是否合法
    Validator.prototype.ipv6Check = function (ip) {
        if (!ip) {
            return false;
        }
        if (ip.indexOf(".") >= 0) {
            return false;
        }
        var ipv6Reg = new RegExp(this.ipv6Reg);
        return ipv6Reg.test(ip);
    };
    //ip格式是否正确
    Validator.prototype.ipFormatCheck = function (ip) {
        try {
            var data = ip.split(".");
            if (data.length == 4) {
                for (var i = 0; i < 4; i++) {
                    if (data[i] === "" || data[i] !== "" + parseInt(data[i])) {
                        return false;
                    }
                }
                return true;
            }
            else {
                return false;
            }
        }
        catch (e) {
            return false;
        }
    };
    //ip是否不以127开头
    Validator.prototype.ipNotStartWith127 = function (ip) {
        try {
            var data = ip.split(".");
            if (data.length == 4) {
                var ip1 = parseInt(data[0]);
                if (ip1 === 127) {
                    return false;
                }
                return true;
            }
            else {
                return false;
            }
        }
        catch (e) {
            return false;
        }
    };
    //ip范围检查
    Validator.prototype.ipRangeCheck = function (startIp, endIp, inputIp) {
        if (!startIp || !endIp || !inputIp) {
            return false;
        }
        var startIps = startIp.split(".");
        var endIps = endIp.split(".");
        var inputIps = inputIp.split(".");

        if (startIps.length != 4 || endIps.length != 4 || inputIps.length != 4) {
            return false;
        }
        var i = 0;
        var startIpValue = 0;
        var endIpValue = 0;
        var inputIpValue = 0;
        for (i = 0; i < 4; i = i + 1) {
            startIpValue = startIpValue * 256 + parseInt(startIps[i], 10);
            endIpValue = endIpValue * 256 + parseInt(endIps[i], 10);
            inputIpValue = inputIpValue * 256 + parseInt(inputIps[i], 10);
        }
        return inputIpValue >= startIpValue && inputIpValue <= endIpValue;
    };
    //获取IP值
    Validator.prototype.getIpValue = function (inputIp) {
        if (!inputIp) {
            return 0;
        }
        var inputIps = inputIp.split(".");
        if (inputIps.length != 4) {
            return false;
        }
        var inputIpValue = 0;
        for (var i = 0; i < 4; i++) {
            inputIpValue = inputIpValue * 256 + parseInt(inputIps[i], 10);
        }
        return inputIpValue;
    };
    //ip比较
    Validator.prototype.ipCompare = function (startIp, endIp) {
        if (!startIp || !endIp) {
            return false;
        }
        var startIps = startIp.split(".");
        var endIps = endIp.split(".");
        if (startIps.length != 4 || endIps.length != 4) {
            return false;
        }
        var i = 0;
        var startIpValue = 0;
        var endIpValue = 0;
        for (i = 0; i < 4; i = i + 1) {
            startIpValue = startIpValue * 256 + parseInt(startIps[i], 10);
            endIpValue = endIpValue * 256 + parseInt(endIps[i], 10);
        }
        return startIpValue <= endIpValue;
    };

    //IPv6是否合法
    Validator.prototype.ipv6Validator = function (ip) {
        if (!ip) {
            return false;
        }
        var data = ip.split(":");
        return data.length == 8;
    };

    //校验密码必须包含大小写字符数字中的至少两种
    Validator.prototype.checkMustContain = function (pwd) {
        try {
            var reg1 = /.*[A-Z]+.*/;
            var reg2 = /.*[a-z]+.*/;
            var reg3 = /.*[0-9]+.*/;
            if (!reg1.test(pwd) && !reg2.test(pwd)) {
                return false;
            }
            if (!reg1.test(pwd) && !reg3.test(pwd)) {
                return false;
            }
            if (!reg2.test(pwd) && !reg3.test(pwd)) {
                return false;
            }
        }
        catch (e) {
            return false;
        }
        return true;
    };

    Validator.prototype.checkComplexity = function (pwd) {
        try {
            var reg1 = /.*[A-Z]+.*/;
            var reg2 = /.*[a-z]+.*/;
            var reg3 = /.*[0-9]+.*/;
            var reg4 = /[\ \`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\\\|\[\{\}\]\;\:\'\"\,\<\.\>\/\?]+/;
            var rate = 0;
            if (reg1.test(pwd)) {
                rate++;
            }
            if (reg2.test(pwd)) {
                rate++;
            }
            if (reg3.test(pwd)) {
                rate++;
            }
            if (reg4.test(pwd)) {
                rate++;
            }
            return rate >= 3;
        }
        catch (e) {
            return false;
        }
    };

    Validator.prototype.checkPwdSecLevel = function (pwd) {
        try {
            var reg1 = /[A-Z]/g;
            var reg2 = /[a-z]/g;
            var reg3 = /[0-9]/g;
            var reg4 = /[\ \`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\\\|\[\{\}\]\;\:\'\"\,\<\.\>\/\?]/g;
            var len = pwd.length >= 8 ? pwd.length >= 12 ? 20 : 10 : 0;
            var upper = reg1.test(pwd) ? pwd.match(reg1).length > 1 ? 20 : 10 : 0;
            var down = reg2.test(pwd) ? pwd.match(reg2).length > 1 ? 20 : 10 : 0;
            var number = reg3.test(pwd) ? pwd.match(reg3).length > 1 ? 20 : 10 : 0;
            var spec = reg4.test(pwd) ? pwd.match(reg4).length > 1 ? 20 : 10 : 0;

            return upper + down + number + spec + len;
        }
        catch (e) {
            return 0;
        }
    };

    //校验密码长度是否满足字符个数要求
    Validator.prototype.checkPasswordLength = function (pwd, minLength, maxLength) {
        try {
            if (pwd.length < minLength || pwd.length > maxLength) {
                return false;
            }
        }
        catch (e) {
            return false;
        }
        return true;
    };

    //校验密码是否包含特殊字符
    Validator.prototype.checkContainSpecialCharacter = function (pwd) {
        return /[\ \`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\\\|\[\{\}\]\;\:\'\"\,\<\.\>\/\?]+/.test(pwd);
    };

    //校验密码是否包含正序或逆序用户名
    Validator.prototype.checkContainUserName = function (pwd, userName) {
        try {
            if (!userName) {
                return false;
            }
            var revertUserName = userName.split("").reverse().join("");
            if (pwd.indexOf(userName) >= 0 || pwd.indexOf(revertUserName) >= 0) {
                return true;
            }
        }
        catch (e) {
            return false;
        }
        return false;
    };
    //Windows系统密码不能包含用户名中超过两个连续字符的部分。
    Validator.prototype.checkContainSubUserName = function (pwd, userName) {
        try {
            if (!userName && userName.length < 3) {
                return false;
            }

            for (var index = 0; index <= userName.length - 3; index++) {
                var sub = userName.substring(index, index + 3);
                if (pwd.indexOf(sub) >= 0) {
                    return true;
                }
            }
        }
        catch (e) {
            return false;
        }
        return false;
    };

    var module = angular.module('basic.config');
    module.tinyService('validator', Validator);
});