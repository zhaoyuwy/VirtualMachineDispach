/*global define*/
define([], function () {
    "use strict";

    var service = {
        //本地与UTC的时差
        offset: -new Date().getTimezoneOffset() * 60 * 1000,
        //增加本地时区后缀
        addSuffix:function(localTime){
            var timeZone = -new Date().getTimezoneOffset();
            var timeZoneAbs = Math.abs(timeZone);
            var timeZoneMinute = timeZoneAbs % 60;
            var timeZoneHour = (timeZoneAbs - timeZoneMinute) / 60;
            timeZoneHour = timeZoneHour < 10 ? "0" + timeZoneHour : timeZoneHour;
            timeZoneMinute = timeZoneMinute < 10 ? "0" + timeZoneMinute : timeZoneMinute;
            var timeZoneStr = timeZoneHour + ":" + timeZoneMinute;
            timeZoneStr = timeZone < 0 ? "-" + timeZoneStr : "+" + timeZoneStr;
            return localTime + " GMT" + timeZoneStr;
        },
        //时间戳转为本地时间 11233445566  ->  2014-04-03 15:31:15
        milli2LocalWithoutSuffix :function (milliseconds) {
            //时间戳，不包含时区信息，new Date()会自动算上时区
            var time = new Date(milliseconds);
            var year = time.getFullYear();
            var month = time.getMonth() + 1;
            month = month < 10 ? "0" + month : month;
            var date = time.getDate();
            date = date < 10 ? "0" + date : date;
            var hour = time.getHours();
            hour = hour < 10 ? "0" + hour : hour;
            var minute = time.getMinutes();
            minute = minute < 10 ? "0" + minute : minute;
            var second = time.getSeconds();
            second = second < 10 ? "0" + second : second;
            return  year + '-' + month + '-' + date + " " + hour + ":" + minute + ":" + second;
        },
        //时间戳转为本地时间 11233445566  ->  2014-04-03 15:31:15 GMT+08:00
        milliseconds2LocalTime: function (milliseconds) {
            //时间戳，不包含时区信息，new Date()会自动算上时区
            var localTime = this.milli2LocalWithoutSuffix(milliseconds);
            return this.addSuffix(localTime);
        },
        //本地时间转换为时间戳 2014-04-03 15:31:15 -> 11233445566
        localTime2Milliseconds: function (localTime) {
            var year = localTime.substr(0, 4);
            var month = localTime.substr(5, 2);
            var date = localTime.substr(8, 2);
            var hour = localTime.substr(11, 2);
            var minute = localTime.substr(14, 2);
            var second = localTime.substr(17, 2);
            var time = new Date(+year, month - 1, +date, +hour, +minute, +second);
            //getTime()得到时间戳，会把时区信息去掉
            return time.getTime();
        },
        //utc时间转换为时间戳 2014-04-03 15:31:15 -> 11233445566
        utcTime2Milliseconds: function (utcTime) {
            //把utcTime当做本地时间转换为时间戳，后要加上时差
            var milliseconds = this.localTime2Milliseconds(utcTime) + this.offset;
            return milliseconds;
        },
        //时间戳转为utc时间 11233445566 -> 2014-04-03 15:31:15
        milliseconds2UtcTime: function (milliseconds) {
            //本地时间的过去8小时，相当于本地时间对应的UTC时间
            milliseconds = milliseconds - this.offset;
            return this.milli2LocalWithoutSuffix(milliseconds);
        },
        //utc时间转为本地时间 格式：2014-04-03 15:31:15
        utc2Local: function (utcTime) {
            if (!utcTime) {
                return "";
            }
            var milliSeconds = this.utcTime2Milliseconds(utcTime);
            return this.milliseconds2LocalTime(milliSeconds);
        },
        //本地时间转为utc时间 格式：2014-04-03 15:31:15
        local2Utc: function (localTime) {
            if (!localTime) {
                return "";
            }
            var milliSeconds = this.localTime2Milliseconds(localTime);
            //时间戳减去8小时，即本地的前8小时，即utc时间
            return this.milliseconds2UtcTime(milliSeconds);
        }
    };

    return service;
});
