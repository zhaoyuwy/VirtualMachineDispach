 /*global define*/
define(["language/inventory"], function (i18n) {
    "use strict";
    var service = function () {
        //当时间改变时 days的值可以是7,30,60
        this.changeDate = function (interval) {
            var startTime;
            var endTime;
            var now = new Date();
            var date = new Date(now.getTime() - interval * 24 * 3600 * 1000);
            var startYear = date.getFullYear();
            var startMonth = date.getMonth();
            var startDay = date.getDate();
            var startHour=date.getHours();
            var startMinute=date.getMinutes();
            var startSecond=date.getSeconds();
            startMonth < 10 && (startMonth = "0" + startMonth);
            startDay < 10 && (startDay = "0" + startDay);
            startHour<10 && (startHour="0" +startHour);
            startMinute<10 &&(startMinute="0"+ startMinute);
            startSecond<10 &&(startSecond="0"+startSecond);

            var endYear = now.getFullYear();
            var endMonth = now.getMonth();
            var endDay = now.getDate();
            var endHour=date.getHours();
            var endMinute=date.getMinutes();
            var endSecond=date.getSeconds();
            endMonth < 10 && (endMonth = "0" + endMonth);
            endDay < 10 && (endDay = "0" + endDay);
            endHour<10 && (endHour="0" +endHour);
            endMinute<10 &&(endMinute="0"+ endMinute);
            endSecond<10 &&(endSecond="0"+endSecond);
            return {
                startTime: new Date(startYear,startMonth,startDay,startHour,startMinute,startSecond),
                endTime:new Date(endYear,endMonth,endDay,endHour,endMinute,endSecond)
            }
        };
        //当时间改变时 days的值可以是7,30,60
//        this.changeUtcDate = function (interval) {
//            var startTime;
//            var endTime;
//            var now = new Date();
//            var date = new Date(now.getTime() - interval * 24 * 3600 * 1000);
//            var startYear = date.getUTCFullYear();
//            var startMonth = date.getUTCMonth() + 1;
//            var startDay = date.getUTCDate();
//            startMonth < 10 && (startMonth = "0" + startMonth);
//            startDay < 10 && (startDay = "0" + startDay);
//            var endYear = now.getUTCFullYear();
//            var endMonth = now.getUTCMonth() + 1;
//            var endDay = now.getUTCDate();
//            endMonth < 10 && (endMonth = "0" + endMonth);
//            endDay < 10 && (endDay = "0" + endDay);
//            return {
//                startTime: [[startYear, startMonth, startDay].join("-")].join(" "),
//                endTime: [[endYear, endMonth, endDay].join("-")].join(" ")
//            }
//        };
        this.getTomorrow = function (AddDayCount, timeInfor) {
            var tomorrow = (new Date(timeInfor)).setDate((new Date(timeInfor)).getDate() + AddDayCount);
            var time = new Date(tomorrow);
            var year = time.getFullYear();
            var month = time.getMonth() + 1;
            month = month < 10 ? "0" + month : month;
            var date = time.getDate();
            date = date < 10 ? "0" + date : date;
            var hours = time.getHours();
            hours = hours < 10 ? "0" + hours : hours;
            var minutes = time.getMinutes();
            minutes = minutes < 10 ? "0" + minutes : minutes;
            var seconds = time.getSeconds();
            seconds = seconds < 10 ? "0" + seconds : seconds;
            return new Date(year,month,date,hours,minutes,seconds);
        };
        this.getStartTimeMin = function (dd, interval) {
            //可以加上错误处理
            var a = new Date(dd)
            a = a.valueOf()
            a = a + interval * 24 * 60 * 60 * 1000
            a = new Date(a);
            var y = a.getFullYear();
            var m = a.getMonth() + 1;
            if (m.toString().length == 1) {
                m = '0' + m;
            }
            var d = a.getDate();
            if (d.toString().length == 1) {
                d = '0' + d;
            }
            var D = a.getDate();
            if (D.toString().length == 1) {
                D = '0' + D;
            }
            var M = a.getMinutes();
            if (M.toString().length == 1) {
                M = '0' + M;
            }
            var S = a.getSeconds();
            if (S.toString().length == 1) {
                S = '0' + S;
            }
            return new Date(y,m,d,D,M,S);
        };



//        this.getStartUtcTimeMin = function (dd, interval) {
//            //可以加上错误处理
//            var a = new Date(dd)
//            a = a.valueOf()
//            a = a + interval * 24 * 60 * 60 * 1000
//            a = new Date(a);
//            var m = a.getUTCMonth() + 1;
//            if (m.toString().length == 1) {
//                m = '0' + m;
//            }
//            var d = a.getUTCDate();
//            if (d.toString().length == 1) {
//                d = '0' + d;
//            }
//            return a.getUTCFullYear() + "-" + m + "-" + d;
//        };
        this.timeUtils = {
            //本地与UTC的时差
//            offset: -new Date().getTimezoneOffset() * 60 * 1000,
            //增加本地时区后缀
            addSuffix: function (localTime) {
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
            //时间戳转为本地时间 11233445566 -> 2014-04-03 15:31:15
            milli2LocalWithoutSuffix: function (milliseconds) {
                //时间戳，不包含时区信息，new Date()会自动算上时区
                var time = new Date(milliseconds);
                var year = time.getFullYear();
                var month = time.getMonth() + 1;
                month = month < 10 ? "0" + month : month;
                var date = time.getDate();
                date = date < 10 ? "0" + date : date;
                var hour = time.getHours();
                hour = hour < 10 ? "0" + hour : hour;
                var minutes = time.getMinutes();
                minutes = minutes < 10 ? "0" + minutes : minutes;
                var senconds = time.getSeconds();
                senconds = senconds < 10 ? "0" + senconds : senconds;

                return year + "-" + month + "-" + date + " " + hour + ":" + minutes+ ":" + senconds;
            },
            //时间戳转为UTC时间 11233445566 -> 2014-04-03 15:31:15
//            milli2UTCWithoutSuffix: function (milliseconds) {
//                //时间戳，不包含时区信息，new Date()会自动算上时区
//                var time = new Date(milliseconds);
//                var year = time.getUTCFullYear();
//                var month = time.getUTCMonth() + 1;
//                month = month < 10 ? "0" + month : month;
//                var date = time.getUTCDate();
//                date = date < 10 ? "0" + date : date;
//                return year + '-' + month + '-' + date;
//            },
            //时间戳转为本地时间 11233445566 -> 2014-04-03 15:31:15 GMT+08:00
            milliseconds2LocalTime: function (milliseconds) {
                //时间戳，不包含时区信息，new Date()会自动算上时区
                var localTime = this.milli2LocalWithoutSuffix(milliseconds);
                return this.addSuffix(localTime);
            },
            //本地时间转换为时间戳 2014-04-03 15:31:15 -> 11233445566
            localTime2Milliseconds: function (dateInfor,dateTime) {
                var year = dateInfor.getFullYear();
                var month = dateInfor.getMonth() + 1;
                month = month < 10 ? "0" + month : month;
                var date = dateInfor.getDate();
                date = date < 10 ? "0" + date : date;
                var hour = dateInfor.getHours();
                hour = hour < 10 ? "0" + hour : hour;
                var minutes = dateInfor.getMinutes();
                minutes = minutes < 10 ? "0" + minutes : minutes;
                var senconds=dateInfor.getSeconds();
                senconds= senconds < 10 ? "0" + senconds : senconds;

                var localTime = year + "-" + month + "-" + date + " " + hour + ":" + minutes+ ":" + senconds;

                var year = localTime.substr(0, 4);
                var month = localTime.substr(5, 2);
                var date = localTime.substr(8, 2);
                var hour = localTime.substr(11, 2);
                var minute = localTime.substr(14, 2);
                var second = localTime.substr(17, 2);
                var ms=0;
                if(dateTime=="endTime"){
                    ms=999;
                }
                var time = new Date(+year, month - 1, +date, +hour, +minute, +second, +ms);
                //getTime()得到时间戳，会把时区信息去掉
                return time.getTime();
            },
            //utc时间转化成UTC的时间戳
//            localTime2UtcMilliseconds: function (localTime) {
//                var year = localTime.substr(0, 4);
//                var month = localTime.substr(5, 2);
//                var date = localTime.substr(8, 2);
//                var hour = localTime.substr(11, 2);
//                var minute = localTime.substr(14, 2);
//                var second = localTime.substr(17, 2);
//                var time = new Date(+year, month - 1, +date, +hour, +minute, +second);
//                //getTime()得到时间戳，会把时区信息去掉
//                return time.getTime() - (new Date().getTimezoneOffset() * 60 * 1000);
//            },
            //utc时间转换为时间戳 2014-04-03 15:31:15 -> 11233445566
//            utcTime2Milliseconds: function (utcTime) {
//                //把utcTime当做本地时间转换为时间戳，后要加上时差
//                var milliseconds = this.localTime2Milliseconds(utcTime) + this.offset;
//                return milliseconds;
//            },
            //utc时间转为本地时间 格式：2014-04-03 15:31:15
//            utc2Local: function (utcTime) {
//                if (!utcTime) {
//                    return "";
//                }
//                var milliSeconds = this.utcTime2Milliseconds(utcTime);
//                return this.milliseconds2LocalTime(milliSeconds);
//            }
        };
        //图表加载数据时的loading
//        this.chartShowLoading = function ($scope, optionId) {
//            $scope.$tinyCharts[optionId].showLoading({
//                text: i18n.uba_inventory_chartLoading,
//                'x': 'center',
//                'y': 'center'
//            });
//        };
//        this.chartApiClick = function ($scope, $state, optionId) {
//            if (optionId === "requestTotalChart") {
//                $scope.$tinyCharts[optionId].on('click', requestTotalClick);
//            } else if (optionId === "serverApiChart") {
//                $scope.$tinyCharts[optionId].on('click', serverApiClick);
//            } else if (optionId === "requestTotalTrendChart") {
//                $scope.$tinyCharts[optionId].on('click', requestTotalTrendClick);
//            } else if (optionId === "responseTypeTrendChart") {
//                $scope.$tinyCharts[optionId].on('click', responseTypeTrendClick);
//            }
//            //概况
//            function requestTotalClick(param) {
//                var generalSelect = "responseType";
//                var responseType = "";
//                var resource;
//                if (generalSelect === "responseType") {
//                    var responseTypeName = param.data.nameTip;
//                    if (responseTypeName === i18n.uba_inventory_success) {
//                        responseType = "nb2xx";
//                    } else if (responseTypeName === i18n.uba_inventory_redirection) {
//                        responseType = "nb3xx";
//                    } else if (responseTypeName === i18n.uba_inventory_clientFailed) {
//                        responseType = "nb4xx";
//                    } else if (responseTypeName === i18n.uba_inventory_serverFailed) {
//                        responseType = "nb5xx";
//                    } else if (responseTypeName === i18n.uba_inventory_other) {
//                        responseType = "nb1xx";
//                    }
//                    resource = "ApiCall";
//                } else if (generalSelect === "callResource") {
//                    responseType = "empty";
//                    var resourceName = param.data.nameTip;
//                    if (resourceName === i18n.uba_inventory_nbSourceApi) {
//                        resource = "ApiCall";
//                    } else {
//                        resource = "ConsoleAction";
//                    }
//                }
//                $state.go("wa.apiCallDetailTable", {
//                    startTime: $scope.startTime,
//                    endTime: $scope.endTime,
//                    serviceName: "empty",
//                    responseType: responseType,
//                    resource: resource
//                });
//            };
//            //服务API请求量TOP5
//            function serverApiClick(param) {
//                var generalSelect = "";
//                var responseType = "";
//                var resource = "";
//                if ($("#" + $scope.serviceApiRequestSelect.id).widget().getSelectedId() != undefined) {
//                    generalSelect = $("#" + $scope.serviceApiRequestSelect.id).widget().getSelectedId();
//                } else {
//                    generalSelect = "opsuba_total";
//                }
//                if (generalSelect === "opsuba_total") {
//                    responseType = "empty";
//                } else {
//                    if (generalSelect === "opsuba_nb_2xx") {
//                        responseType = "nb2xx";
//                    } else if (generalSelect === "opsuba_nb_3xx") {
//                        responseType = "nb3xx";
//                    } else if (generalSelect === "opsuba_nb_4xx") {
//                        responseType = "nb4xx";
//                    } else if (generalSelect === "opsuba_nb_5xx") {
//                        responseType = "nb5xx";
//                    } else if (generalSelect === "opsuba_nb_1xx") {
//                        responseType = "nb1xx";
//                    }
//                }
//                var resourceName = param.seriesName;
//                if (resourceName === i18n.uba_inventory_nbSourceApi) {
//                    resource = "ApiCall";
//                } else {
//                    resource = "ConsoleAction";
//                }
//                $state.go("wa.apiCallDetailTable", {
//                    startTime: $scope.startTime,
//                    endTime: $scope.endTime,
//                    serviceName: param.data.name.toLowerCase(),
//                    responseType: responseType,
//                    resource: resource
//                });
//            };
//            //请求总数趋势
//            function requestTotalTrendClick(param) {
//                var generalSelect = "classifyRequest";
//                var responseType = "";
//                var resource = "";
//                if (generalSelect === "classifyRequest") {
//                    var responseTypeName = param.seriesName;
//                    if (responseTypeName === i18n.uba_inventory_success) {
//                        responseType = "nb2xx";
//                    } else if (responseTypeName === i18n.uba_inventory_redirection) {
//                        responseType = "nb3xx";
//                    } else if (responseTypeName === i18n.uba_inventory_clientFailed) {
//                        responseType = "nb4xx";
//                    } else if (responseTypeName === i18n.uba_inventory_serverFailed) {
//                        responseType = "nb5xx";
//                    } else if (responseTypeName === i18n.uba_inventory_other) {
//                        responseType = "nb1xx";
//                    }
//                    resource = "ApiCall";
//                } else {
//                    responseType = "empty";
//                    var resourceName = param.seriesName;
//                    if (resourceName === i18n.uba_inventory_nbSourceApi) {
//                        resource = "ApiCall";
//                    } else {
//                        resource = "ConsoleAction";
//                    }
//                }
//                var prefix;
//                var detailTime = $("#" + $scope.dateTime.endTime.endId).widget().getDateTime();
//                if (detailTime != undefined) {
//                    prefix = detailTime.split("-")[0];
//                    $scope.startTime = getUTCTimeStamp(prefix + "-" + param.data.time + " 00:00:00");
//                    var end = getUTCTomorrow(1, prefix + "-" + param.data.time);
//                    $scope.endTime = getUTCTimeStamp(end);
//                }
//                $state.go("wa.apiCallDetailTable", {
//                    startTime: $scope.startTime,
//                    endTime: $scope.endTime,
//                    serviceName: $scope.radioModel.current,
//                    responseType: responseType,
//                    resource: resource
//                });
//            };
//            //响应类型趋势
//            function responseTypeTrendClick(param) {
//                var resource;
//                var responseType;
//                var responseTypeName = "";
//                var responseSelect = $("#" + $scope.classifyRequestSelect.id).widget().getSelectedId();
//                if (responseSelect != undefined) {
//                    responseTypeName = responseSelect;
//                } else {
//                    responseTypeName = "2";
//                }
//                if (responseTypeName === "2") {
//                    responseType = "nb2xx";
//                } else if (responseTypeName === "3") {
//                    responseType = "nb3xx";
//                } else if (responseTypeName === "4") {
//                    responseType = "nb4xx";
//                } else if (responseTypeName === "5") {
//                    responseType = "nb5xx";
//                } else if (responseTypeName === "1") {
//                    responseType = "nb1xx";
//                }
//                if (param.seriesName === i18n.uba_inventory_nbSourceConsole) {
//                    resource = "ConsoleAction";
//                } else if (param.seriesName === i18n.uba_inventory_nbSourceApi) {
//                    resource = "ApiCall";
//                }
//                var prefix;
//                var detailTime = $("#" + $scope.dateTime.endTime.endId).widget().getDateTime();
//                if (detailTime != undefined) {
//                    prefix = detailTime.split("-")[0];
//                    $scope.startTime = getUTCTimeStamp(prefix + "-" + param.data.time + " 00:00:00");
//                    var end = getUTCTomorrow(1, prefix + "-" + param.data.time);
//                    $scope.endTime = getUTCTimeStamp(end);
//                }
//                $state.go("wa.apiCallDetailTable", {
//                    startTime: $scope.startTime,
//                    endTime: $scope.endTime,
//                    serviceName: $scope.radioModel.current,
//                    responseType: responseType,
//                    resource: resource
//                });
//            };
//        };
//        this.chartConsoleClick = function ($scope, $state, optionId) {
//            if (optionId === "responseTypeRate") {
//                $scope.$tinyCharts[optionId].on('click', responseTypeRateClick);
//            } else if (optionId === "requestFrequencyTrend") {
//                $scope.$tinyCharts[optionId].on('click', requestFrequencyTrendClick);
//            }
//            //响应类型占比
//            function responseTypeRateClick(param) {
//                var generalSelect = "responseType";
//                var responseType = "";
//                var resource = "";
//                if (generalSelect === "responseType") {
//                    var responseTypeName = param.data.nameTip;
//                    if (responseTypeName === i18n.uba_inventory_success) {
//                        responseType = "nb2xx";
//                    } else if (responseTypeName === i18n.uba_inventory_redirection) {
//                        responseType = "nb3xx";
//                    } else if (responseTypeName === i18n.uba_inventory_clientFailed) {
//                        responseType = "nb4xx";
//                    } else if (responseTypeName === i18n.uba_inventory_serverFailed) {
//                        responseType = "nb5xx";
//                    } else if (responseTypeName === i18n.uba_inventory_other) {
//                        responseType = "nb1xx";
//                    }
//                    resource = "ApiCall";
//                } else if (generalSelect === "callResource") {
//                    responseType = "empty";
//                    var resourceName = param.data.nameTip;
//                    if (resourceName === i18n.uba_inventory_nbSourceApi) {
//                        resource = "ApiCall";
//                    } else {
//                        resource = "ConsoleAction";
//                    }
//                }
//                $state.go("wa.consoleCallDetailTable", {
//                    startTime: $scope.startTime,
//                    endTime: $scope.endTime,
//                    serviceName: "empty",
//                    responseType: responseType,
//                    resource: resource
//                });
//            };
//            //请求次数趋势
//            function requestFrequencyTrendClick(param) {
//                var generalSelect = param.seriesName;
//                var responseType = "";
//                if (generalSelect === "Successful") {
//                    responseType = "nb2xx";
//                } else if (generalSelect === "Redirection") {
//                    responseType = "nb3xx";
//                } else if (generalSelect === "Client error") {
//                    responseType = "nb4xx";
//                } else if (generalSelect === "Server error") {
//                    responseType = "nb5xx";
//                } else if (generalSelect === "Others") {
//                    responseType = "nb1xx";
//                }
//                var prefix;
//                var detailTime = $("#" + $scope.dateTime.endTime.endId).widget().getDateTime();
//                if (detailTime != undefined) {
//                    prefix = detailTime.split("-")[0];
//                    $scope.startTime = getUTCTimeStamp(prefix + "-" + param.data.time + " 00:00:00");
//                    var end = getUTCTomorrow(1, prefix + "-" + param.data.time);
//                    $scope.endTime = getUTCTimeStamp(end);
//                }
//                $state.go("wa.consoleCallDetailTable", {
//                    startTime: $scope.startTime,
//                    endTime: $scope.endTime,
//                    serviceName: "empty",
//                    responseType: responseType,
//                    resource: "empty"
//                });
//            };
//        };
//        this.chartOperationClick = function ($scope, $state, optionId) {
//            if (optionId === "serviceApiChart") {
//                $scope.$tinyCharts[optionId].on('click', serviceApiClick);
//            }
//            if (optionId === "operationFrequencyChart") {
//                $scope.$tinyCharts[optionId].on('click', operationFrequencyClick);
//            }
//            if (optionId === "operationFailChart") {
//                $scope.$tinyCharts[optionId].on('click', operationFailChartClick);
//            }
//            if (optionId === "expenseDurationTrendChart") {
//                $scope.$tinyCharts[optionId].on('click', expenseDurationTrendClick);
//            }
//            //关键操作TOP5
//            function serviceApiClick(param) {
//                var responseType;
//                var resource;
//                var resourceName;
//                if ($("#" + $scope.keyOperationSelect.id).widget().getSelectedId() != undefined) {
//                    var selectInfor = $("#" + $scope.keyOperationSelect.id).widget().getSelectedId();
//                } else {
//                    var selectInfor = "opsuba_nb_fail";
//                }
//                if (selectInfor === "opsuba_nb_fail") {
//                    responseType = "failed";
//                    resourceName = param.seriesName;
//                    if (resourceName === i18n.uba_inventory_nbSourceConsole) {
//                        resource = "ConsoleAction";
//                    } else if (resourceName === i18n.uba_inventory_nbSourceApi) {
//                        resource = "ApiCall";
//                    } else {
//                        resource = "SystemAction";
//                    }
//                } else {
//                    if ($("#" + $scope.operationResponseSelect.id).widget().getSelectedId() != undefined) {
//                        var operationResource = $("#" + $scope.operationResponseSelect.id).widget().getSelectedId();
//                    } else {
//                        var operationResource = "operationSource";
//                    }
//                    if (operationResource === "operationSource") {
//                        responseType = "empty";
//                        resourceName = param.seriesName;
//                        if (resourceName === i18n.uba_inventory_nbSourceConsole) {
//                            resource = "ConsoleAction";
//                        } else if (resourceName === i18n.uba_inventory_nbSourceApi) {
//                            resource = "ApiCall";
//                        } else {
//                            resource = "SystemAction";
//                        }
//                    } else {
//                        resource = "empty";
//                        var responseTypeName = param.seriesName;
//                        if (responseTypeName === i18n.uba_inventory_success) {
//                            responseType = "success";
//                        } else {
//                            responseType = "failed";
//                        }
//                    }
//                }
//                var traceName = getTraceCode(param.name);
//                $state.go("wa.operationStatisticsDetailTable", {
//                    startTime: $scope.startTime,
//                    endTime: $scope.endTime,
//                    serviceName: $scope.radioModel.current,
//                    traceName: traceName,
//                    responseType: responseType,
//                    resource: resource
//                });
//            };
//            //操作次数统计
//            function operationFrequencyClick(param) {
//                var responseType;
//                var resource;
//                var resourceName;
//                var responseTypeName;
//                var selectInfor = "";
//                if ($("#" + $scope.classifyRequestSelect.id).widget().getSelectedId() != undefined) {
//                    selectInfor = $("#" + $scope.classifyRequestSelect.id).widget().getSelectedId();
//                } else {
//                    selectInfor = "operationResult";
//                }
//                if (selectInfor === "operationResult") {
//                    responseTypeName = param.seriesName;
//                    if (responseTypeName === i18n.uba_inventory_success) {
//                        responseType = "success";
//                    } else {
//                        responseType = "failed";
//                    }
//                    resource = "empty";
//                } else {
//                    responseType = "empty";
//                    resourceName = param.seriesName;
//                    if (resourceName === i18n.uba_inventory_nbSourceConsole) {
//                        resource = "ConsoleAction";
//                    } else if (resourceName === i18n.uba_inventory_nbSourceApi) {
//                        resource = "ApiCall";
//                    } else {
//                        resource = "SystemAction";
//                    }
//                }
//                var prefix;
//                var detailTime = $("#" + $scope.dateTime.endTime.endId).widget().getDateTime();
//                if (detailTime != undefined) {
//                    prefix = detailTime.split("-")[0];
//                    $scope.startTime = getUTCTimeStamp(prefix + "-" + param.data.time + " 00:00:00");
//                    var end = getUTCTomorrow(1, prefix + "-" + param.data.time);
//                    $scope.endTime = getUTCTimeStamp(end);
//                }
//                $state.go("wa.operationStatisticsDetailTable", {
//                    startTime: $scope.startTime,
//                    endTime: $scope.endTime,
//                    serviceName: $scope.radioModel.current,
//                    traceName: $scope.oprationModel.current,
//                    responseType: responseType,
//                    resource: resource
//                });
//            };
//            //操作失败统计
//            function operationFailChartClick(param) {
//                var resource;
//                if (param.seriesName === i18n.uba_inventory_nbSourceConsole) {
//                    resource = "ConsoleAction";
//                } else if (param.seriesName === i18n.uba_inventory_nbSourceApi) {
//                    resource = "ApiCall";
//                } else {
//                    resource = "SystemAction";
//                }
//                var prefix;
//                var detailTime = $("#" + $scope.dateTime.endTime.endId).widget().getDateTime();
//                if (detailTime != undefined) {
//                    prefix = detailTime.split("-")[0];
//                    $scope.startTime = getUTCTimeStamp(prefix + "-" + param.data.time + " 00:00:00");
//                    var end = getUTCTomorrow(1, prefix + "-" + param.data.time);
//                    $scope.endTime = getUTCTimeStamp(end);
//                }
//                $state.go("wa.operationStatisticsDetailTable", {
//                    startTime: $scope.startTime,
//                    endTime: $scope.endTime,
//                    serviceName: $scope.radioModel.current,
//                    traceName: $scope.oprationModel.current,
//                    responseType: "failed",
//                    resource: resource
//                });
//            };
//            //花费时长趋势
//            function expenseDurationTrendClick(param) {
//                var prefix;
//                var detailTime = $("#" + $scope.dateTime.endTime.endId).widget().getDateTime();
//                if (detailTime != undefined) {
//                    prefix = detailTime.split("-")[0];
//                    $scope.startTime = getTimeStamp(prefix + "-" + param.data.time + " 00:00:00");
//                    var end = getTomorrow(1, prefix + "-" + param.data.time);
//                    $scope.endTime = getTimeStamp(end);
//                }
//                $state.go("wa.operationStatisticsDetailTable", {
//                    startTime: $scope.startTime,
//                    endTime: $scope.endTime,
//                    serviceName: $scope.radioModel.current,
//                    traceName: $scope.oprationModel.current,
//                    responseType: "empty",
//                    resource: "empty"
//                });
//            };
//        };
//        //花费时长分布
//        this.chartCreateOperationClick = function ($scope, $state, optionId) {
//            $scope.$tinyCharts[optionId].on('click', eConsole);
//            function eConsole(param) {
//                var imageSize = param.data.imageSize;
//                var dataArray = [];
//                if (imageSize != undefined) {
//                    if (imageSize.indexOf(i18n.uba_inventory_larger) < 0) {
//                        dataArray = imageSize.split("-");
//                    } else {
//                        dataArray[0] = imageSize.split("than")[1];
//                        dataArray[1] = 2147483647;
//                    }
//                }
//                if ($scope.radioModel.current === "ecs" || $scope.radioModel.current === "evs") {
//                    $state.go("wa.createVmDetailTable", {
//                        startTime: $scope.startTime,
//                        endTime: $scope.endTime,
//                        serviceName: $scope.radioModel.current,
//                        lowSize: dataArray[0],
//                        highSize: dataArray[1]
//                    });
//                }
//            };
//        };
//        //响应时长范围请求次数分布
//        this.responseTimeExtentRequestClick = function ($scope, flag, optionId, $state) {
//            $scope.$tinyCharts[optionId].on('click', eConsole);
//            function eConsole(param) {
//                var imageSize = param.data.imageSize;
//                var dataArray = [];
//                if (imageSize != undefined) {
//                    if (imageSize.indexOf(i18n.uba_inventory_larger) < 0) {
//                        dataArray = imageSize.split("-");
//                    } else {
//                        dataArray[0] = imageSize.substring(2);
//                        dataArray[1] = 2147483647;
//                    }
//                }
//                var serviceName = "";
//                if (flag == "console") {
//                    serviceName = "empty";
//                } else {
//                    serviceName = $scope.radioModel.current;
//                }
//                $state.go("wa.responseTimeExtentRequest", {
//                    startTime: $scope.startTime,
//                    endTime: $scope.endTime,
//                    serviceName: serviceName,
//                    lowSize: dataArray[0]*1000,
//                    highSize: dataArray[1]*1000
//                });
//
//            };
//        };
//        //获取关键操作的名称
//        this.getTraceName = function (type) {
//            var traceName;
//            switch (type) {
//                case  "createSingleServer" :
//                    traceName = i18n.uba_inventory_createVM;
//                    break;
//                case "deleteVM":
//                    traceName = i18n.uba_inventory_deleteVM;
//                    break;
//                case "actionStart":
//                    traceName = i18n.uba_inventory_startVM;
//                    break;
//                case  "actionReboot" :
//                    traceName = i18n.uba_inventory_restartVM;
//                    break;
//                case  "actionStop" :
//                    traceName = i18n.uba_inventory_stopVM;
//                    break;
//                case "addNic":
//                    traceName = i18n.uba_inventory_addVMNetworkCard;
//                    break;
//                case "delNic":
//                    traceName = i18n.uba_inventory_deleteVMNetworkCard;
//                    break;
//                case  "attachVolume" :
//                    traceName = i18n.uba_inventory_VMMountDisk;
//                    break;
//                case "detachVolume":
//                    traceName = i18n.uba_inventory_VMUnloadDisk;
//                    break;
//                case "createVolume":
//                    traceName = i18n.uba_inventory_createVolume;
//                    break;
//                case  "updateVolume" :
//                    traceName = i18n.uba_inventory_updateVolume;
//                    break;
//                case "extendVolume":
//                    traceName = i18n.uba_inventory_extendVolume;
//                    break;
//                case "deleteVolume":
//                    traceName = i18n.uba_inventory_deleteVolume;
//                    break;
//                case  "BulkcreateVolumes" :
//                    traceName = i18n.uba_inventory_BulkcreateVolumes;
//                    break;
//                case "BulkDeleteVolumes":
//                    traceName = i18n.uba_inventory_BulkDeleteVolumes;
//                    break;
//                case "createVpc":
//                    traceName = i18n.uba_inventory_createVpc;
//                    break;
//                case  "deleteVpc" :
//                    traceName = i18n.uba_inventory_deleteVpc;
//                    break;
//                case "modifyVpc":
//                    traceName = i18n.uba_inventory_modifyVpc;
//                    break;
//                case "createSubnet":
//                    traceName = i18n.uba_inventory_createSubnet;
//                    break;
//                case  "deleteSubnet" :
//                    traceName = i18n.uba_inventory_deleteSubnet;
//                    break;
//                case "modifySubnet":
//                    traceName = i18n.uba_inventory_modifySubnet;
//                    break;
//                case "createEip":
//                    traceName = i18n.uba_inventory_createEip;
//                    break;
//                case  "deleteEip" :
//                    traceName = i18n.uba_inventory_deleteEip;
//                    break;
//                case "bindEip":
//                    traceName = i18n.uba_inventory_bindEip;
//                    break;
//                case "unbindEip":
//                    traceName = i18n.uba_inventory_unbindEip;
//                    break;
//                case "modifyDirectConnect":
//                    traceName = i18n.uba_inventory_modifyDirectConnect;
//                    break;
//                case  "createImage" :
//                    traceName = i18n.uba_inventory_createImage;
//                    break;
//                case "updateImage":
//                    traceName = i18n.uba_inventory_updateImage;
//                    break;
//                case "deleteImage":
//                    traceName = i18n.uba_inventory_deleteImage;
//                    break;
//                case "addMember":
//                    traceName = i18n.uba_inventory_addMember;
//                    break;
//                case "updateMember":
//                    traceName = i18n.uba_inventory_updateMember;
//                    break;
//                case "deleteMemeber":
//                    traceName = i18n.uba_inventory_deleteMemeber;
//                    break;
//                case "exportImage":
//                    traceName = i18n.uba_inventory_exportImage;
//                    break;
//                case  "createScalingGroup" :
//                    traceName = i18n.uba_inventory_createScalingGroup;
//                    break;
//                case "modifyScalingGroup":
//                    traceName = i18n.uba_inventory_modifyScalingGroup;
//                    break;
//                case "deleteScalingGroup":
//                    traceName = i18n.uba_inventory_deleteScalingGroup;
//                    break;
//                case "enableScalingGroup":
//                    traceName = i18n.uba_inventory_enableScalingGroup;
//                    break;
//                case  "disableScalingGroup" :
//                    traceName = i18n.uba_inventory_disableScalingGroup;
//                    break;
//                case "createScalingConfiguration":
//                    traceName = i18n.uba_inventory_createScalingConfiguration;
//                    break;
//                case "deleteScalingConfiguration":
//                    traceName = i18n.uba_inventory_deleteScalingConfiguration;
//                    break;
//                case "scaling_configuration_id":
//                    traceName = i18n.uba_inventory_scaling_configuration_id;
//                    break;
//                case  "createScalingPolicy" :
//                    traceName = i18n.uba_inventory_createScalingPolicy;
//                    break;
//                case "modifyScalingPolicy":
//                    traceName = i18n.uba_inventory_modifyScalingPolicy;
//                    break;
//                case "deleteScalingPolicy":
//                    traceName = i18n.uba_inventory_deleteScalingPolicy;
//                    break;
//                case "enableScalingPolicy":
//                    traceName = i18n.uba_inventory_enableScalingPolicy;
//                    break;
//                case  "disableScalingPolicy" :
//                    traceName = i18n.uba_inventory_disableScalingPolicy;
//                    break;
//                case "executeScalingPolicy":
//                    traceName = i18n.uba_inventory_executeScalingPolicy;
//                    break;
//                case "removeInstance":
//                    traceName = i18n.uba_inventory_removeInstance;
//                    break;
//                case "batchRemoveInstances":
//                    traceName = i18n.uba_inventory_batchRemoveInstances;
//                    break;
//                case "batchAddInstances":
//                    traceName = i18n.uba_inventory_batchAddInstances;
//                    break;
//                default:
//                    traceName = type;
//
//            }
//            return traceName;
//        };
//        //获取关键操作的code
//        var getTraceCode = function (name) {
//            var traceCode;
//            switch (name) {
//                case  i18n.uba_inventory_createVM:
//                    traceCode = "createSingleServer";
//                    break;
//                case i18n.uba_inventory_deleteVM:
//                    traceCode = "deleteVM";
//                    break;
//                case i18n.uba_inventory_startVM:
//                    traceCode = "actionStart";
//                    break;
//                case i18n.uba_inventory_restartVM :
//                    traceCode = "actionReboot";
//                    break;
//                case i18n.uba_inventory_stopVM:
//                    traceCode = "actionStop";
//                    break;
//                case i18n.uba_inventory_addVMNetworkCard:
//                    traceCode = "addNic";
//                    break;
//                case i18n.uba_inventory_deleteVMNetworkCard:
//                    traceCode = "delNic";
//                    break;
//                case  i18n.uba_inventory_VMMountDisk:
//                    traceCode = "attachVolume";
//                    break;
//                case i18n.uba_inventory_VMUnloadDisk:
//                    traceCode = "detachVolume";
//                    break;
//                case i18n.uba_inventory_createVolume:
//                    traceCode = "createVolume";
//                    break;
//                case i18n.uba_inventory_updateVolume:
//                    traceCode = "updateVolume";
//                    break;
//                case  i18n.uba_inventory_extendVolume:
//                    traceCode = "extendVolume";
//                    break;
//                case i18n.uba_inventory_deleteVolume:
//                    traceCode = "deleteVolume";
//                    break;
//                case  i18n.uba_inventory_BulkcreateVolumes:
//                    traceCode = "BulkcreateVolumes";
//                    break;
//                case  i18n.uba_inventory_BulkDeleteVolumes:
//                    traceCode = "BulkDeleteVolumes";
//                    break;
//                case i18n.uba_inventory_createVpc:
//                    traceCode = "createVpc";
//                    break;
//                case  i18n.uba_inventory_deleteVpc:
//                    traceCode = "deleteVpc";
//                    break;
//                case i18n.uba_inventory_modifyVpc:
//                    traceCode = "modifyVpc";
//                    break;
//                case i18n.uba_inventory_createSubnet:
//                    traceCode = "createSubnet";
//                    break;
//                case  i18n.uba_inventory_deleteSubnet:
//                    traceCode = "deleteSubnet";
//                    break;
//                case i18n.uba_inventory_modifySubnet:
//                    traceCode = "modifySubnet";
//                    break;
//                case  i18n.uba_inventory_createEip:
//                    traceCode = "createEip";
//                    break;
//                case  i18n.uba_inventory_deleteEip:
//                    traceCode = "deleteEip";
//                    break;
//                case i18n.uba_inventory_bindEip:
//                    traceCode = "bindEip";
//                    break;
//                case i18n.uba_inventory_unbindEip:
//                    traceCode = "unbindEip";
//                    break;
//                case i18n.uba_inventory_modifyDirectConnect:
//                    traceCode = "modifyDirectConnect";
//                    break;
//                case  i18n.uba_inventory_createImage:
//                    traceCode = "createImage";
//                    break;
//                case i18n.uba_inventory_updateImage:
//                    traceCode = "updateImage";
//                    break;
//                case i18n.uba_inventory_deleteImage:
//                    traceCode = "deleteImage";
//                    break;
//
//                case i18n.uba_inventory_addMember:
//                    traceCode = "addMember";
//                    break;
//                case i18n.uba_inventory_updateMember:
//                    traceCode = "updateMember";
//                    break;
//                case i18n.uba_inventory_deleteMemeber:
//                    traceCode = "deleteMemeber";
//                    break;
//                case i18n.uba_inventory_exportImage:
//                    traceCode = "exportImage";
//                    break;
//                case  i18n.uba_inventory_createScalingGroup:
//                    traceCode = "createScalingGroup";
//                    break;
//                case i18n.uba_inventory_modifyScalingGroup:
//                    traceCode = "modifyScalingGroup";
//                    break;
//                case i18n.uba_inventory_deleteScalingGroup:
//                    traceCode = "deleteScalingGroup";
//                    break;
//                case  i18n.uba_inventory_enableScalingGroup:
//                    traceCode = "enableScalingGroup";
//                    break;
//                case  i18n.uba_inventory_disableScalingGroup:
//                    traceCode = "disableScalingGroup";
//                    break;
//                case i18n.uba_inventory_createScalingConfiguration:
//                    traceCode = "createScalingConfiguration";
//                    break;
//                case i18n.uba_inventory_deleteScalingConfiguration:
//                    traceCode = "deleteScalingConfiguration";
//                    break;
//                case i18n.uba_inventory_scaling_configuration_id:
//                    traceCode = "scaling_configuration_id";
//                    break;
//                case  i18n.uba_inventory_createScalingPolicy:
//                    traceCode = "createScalingPolicy";
//                    break;
//                case i18n.uba_inventory_modifyScalingPolicy:
//                    traceCode = "modifyScalingPolicy";
//                    break;
//                case i18n.uba_inventory_deleteScalingPolicy:
//                    traceCode = "deleteScalingPolicy";
//                    break;
//                case i18n.uba_inventory_enableScalingPolicy:
//                    traceCode = "enableScalingPolicy";
//                    break;
//                case  i18n.uba_inventory_disableScalingPolicy :
//                    traceCode = "disableScalingPolicy";
//                    break;
//                case i18n.uba_inventory_executeScalingPolicy:
//                    traceCode = "executeScalingPolicy";
//                    break;
//                case i18n.uba_inventory_removeInstance:
//                    traceCode = "removeInstance";
//                    break;
//                case i18n.uba_inventory_batchRemoveInstances:
//                    traceCode = "batchRemoveInstances";
//                    break;
//                case i18n.uba_inventory_batchAddInstances:
//                    traceCode = "batchAddInstances";
//                    break;
//                default:
//                    traceCode = name;
//
//            }
//            return traceCode;
//        };
//        var getTimeStamp = function (localTime) {
//            var year = localTime.substr(0, 4);
//            var month = localTime.substr(5, 2);
//            var date = localTime.substr(8, 2);
//            var hour = localTime.substr(11, 2);
//            var minute = localTime.substr(14, 2);
//            var second = localTime.substr(17, 2);
//            var time = new Date(+year, month - 1, +date, +hour, +minute, +second);
//            //getTime()得到时间戳，会把时区信息去掉
//            return time.getTime();
//        };
//        var getUTCTimeStamp = function (localTime) {
//            var year = localTime.substr(0, 4);
//            var month = localTime.substr(5, 2);
//            var date = localTime.substr(8, 2);
//            var hour = localTime.substr(11, 2);
//            var minute = localTime.substr(14, 2);
//            var second = localTime.substr(17, 2);
//            var time = new Date(+year, month - 1, +date, +hour, +minute, +second);
//            //getTime()得到时间戳，会把时区信息去掉
//            return time.getTime() - (new Date().getTimezoneOffset() * 60 * 1000);
//        };
//        var getTomorrow = function (AddDayCount, timeInfor) {
//            var tomorrow = (new Date(timeInfor)).setDate((new Date(timeInfor)).getDate() + AddDayCount);
//            var time = new Date(tomorrow);
//            var year = time.getFullYear();
//            var month = time.getMonth() + 1;
//            month = month < 10 ? "0" + month : month;
//            var date = time.getDate();
//            date = date < 10 ? "0" + date : date;
//            return year + '-' + month + '-' + date + " 00:00:00";
//        };
//        var getUTCTomorrow = function (AddDayCount, timeInfor) {
//            var tomorrow = (new Date(timeInfor)).setDate((new Date(timeInfor)).getDate() + AddDayCount);
//            var time = new Date(tomorrow);
//            var year = time.getUTCFullYear();
//            var month = time.getUTCMonth() + 1;
//            month = month < 10 ? "0" + month : month;
//            var date = time.getUTCDate();
//            date = date < 10 ? "0" + date : date;
//            return year + '-' + month + '-' + date + " 00:00:00";
//        };
//        this.getUTCTomorrow = function (AddDayCount, timeInfor) {
//            var tomorrow = (new Date(timeInfor)).setDate((new Date(timeInfor)).getDate() + AddDayCount);
//            var time = new Date(tomorrow);
//            var year = time.getUTCFullYear();
//            var month = time.getUTCMonth() + 1;
//            month = month < 10 ? "0" + month : month;
//            var date = time.getUTCDate();
//            date = date < 10 ? "0" + date : date;
//            return year + '-' + month + '-' + date + " 00:00:00";
//        };
//        this.getKeyOperation = function (serviceName, $scope) {
//            if (serviceName === "ecs") {
//                $scope.keyOperationSelect.values = [
//                    {
//                        "selectId": "empty",
//                        "label": i18n.uba_inventory_allKeyOperation
//                    },
//                    {"label": i18n.uba_inventory_createVM, "selectId": "createSingleServer"},
//                    {"label": i18n.uba_inventory_deleteVM, "selectId": "deleteVM"},
//                    {"label": i18n.uba_inventory_startVM, "selectId": "actionStart"},
//                    {"label": i18n.uba_inventory_restartVM, "selectId": "actionReboot"},
//                    {"label": i18n.uba_inventory_stopVM, "selectId": "actionStop"},
//                    {"label": i18n.uba_inventory_addVMNetworkCard, "selectId": "addNic"},
//                    {"label": i18n.uba_inventory_deleteVMNetworkCard, "selectId": "delNic"},
//                    {"label": i18n.uba_inventory_VMMountDisk, "selectId": "attachVolume"},
//                    {"label": i18n.uba_inventory_VMUnloadDisk, "selectId": "detachVolume"}
//                ];
//                $scope.keyOperationSelect.defaultSelectId = "empty";
//            } else if (serviceName === "evs") {
//                $scope.keyOperationSelect.values = [
//                    {
//                        "selectId": "empty",
//                        "label": i18n.uba_inventory_allKeyOperation
//                    },
//                    {"label": i18n.uba_inventory_createVolume, "selectId": "createVolume"},
//                    {"label": i18n.uba_inventory_updateVolume, "selectId": "updateVolume"},
//                    {"label": i18n.uba_inventory_extendVolume, "selectId": "extendVolume"},
//                    {"label": i18n.uba_inventory_deleteVolume, "selectId": "deleteVolume"},
//                    {
//                        "label": i18n.uba_inventory_BulkcreateVolumes,
//                        "selectId": "BulkcreateVolumes"
//                    },
//                    {
//                        "label": i18n.uba_inventory_BulkDeleteVolumes,
//                        "selectId": "BulkDeleteVolumes"
//                    }
//                ];
//                $scope.keyOperationSelect.defaultSelectId = "empty";
//            } else if (serviceName === "vpc") {
//                $scope.keyOperationSelect.values = [
//                    {
//                        "selectId": "empty",
//                        "label": i18n.uba_inventory_allKeyOperation
//                    },
//                    {"label": i18n.uba_inventory_createVpc, "selectId": "createVpc"},
//                    {"label": i18n.uba_inventory_deleteVpc, "selectId": "deleteVpc"},
//                    {"label": i18n.uba_inventory_modifyVpc, "selectId": "modifyVpc"},
//                    {"label": i18n.uba_inventory_createSubnet, "selectId": "createSubnet"},
//                    {"label": i18n.uba_inventory_deleteSubnet, "selectId": "deleteSubnet"},
//                    {"label": i18n.uba_inventory_modifySubnet, "selectId": "modifySubnet"},
//                    {"label": i18n.uba_inventory_createEip, "selectId": "createEip"},
//                    {"label": i18n.uba_inventory_deleteEip, "selectId": "deleteEip"},
//                    {"label": i18n.uba_inventory_bindEip, "selectId": "bindEip"},
//                    {"label": i18n.uba_inventory_unbindEip, "selectId": "unbindEip"}
//                ];
//                $scope.keyOperationSelect.defaultSelectId = "empty";
//            } else if (serviceName === "ims") {
//                $scope.keyOperationSelect.values = [
//                    {
//                        "selectId": "empty",
//                        "label": i18n.uba_inventory_allKeyOperation
//                    },
//                    {"label": i18n.uba_inventory_createImage, "selectId": "createImage"},
//                    {"label": i18n.uba_inventory_updateImage, "selectId": "updateImage"},
//                    {"label": i18n.uba_inventory_deleteImage, "selectId": "deleteImage"},
//                    {"label": i18n.uba_inventory_addMember, "selectId": "addMember"},
//                    {"label": i18n.uba_inventory_updateMember, "selectId": "updateMember"},
//                    {"label": i18n.uba_inventory_deleteMemeber, "selectId": "deleteMemeber"},
//                    {"label": i18n.uba_inventory_exportImage, "selectId": "exportImage"}
//                ];
//                $scope.keyOperationSelect.defaultSelectId = "empty";
//            } else if (serviceName === "as") {
//                $scope.keyOperationSelect.values = [
//                    {
//                        "selectId": "empty",
//                        "label": i18n.uba_inventory_allKeyOperation
//                    },
//                    {
//                        "label": i18n.uba_inventory_createScalingGroup,
//                        "selectId": "createScalingGroup"
//                    },
//                    {
//                        "label": i18n.uba_inventory_modifyScalingGroup,
//                        "selectId": "modifyScalingGroup"
//                    },
//                    {
//                        "label": i18n.uba_inventory_deleteScalingGroup,
//                        "selectId": "deleteScalingGroup"
//                    },
//                    {
//                        "label": i18n.uba_inventory_enableScalingGroup,
//                        "selectId": "enableScalingGroup"
//                    },
//                    {
//                        "label": i18n.uba_inventory_disableScalingGroup,
//                        "selectId": "disableScalingGroup"
//                    },
//                    {
//                        "label": i18n.uba_inventory_createScalingConfiguration,
//                        "selectId": "createScalingConfiguration"
//                    },
//                    {
//                        "label": i18n.uba_inventory_deleteScalingConfiguration,
//                        "selectId": "deleteScalingConfiguration"
//                    },
//                    {
//                        "label": i18n.uba_inventory_scaling_configuration_id,
//                        "selectId": "scaling_configuration_id"
//                    },
//                    {
//                        "label": i18n.uba_inventory_createScalingPolicy,
//                        "selectId": "createScalingPolicy"
//                    },
//                    {
//                        "label": i18n.uba_inventory_modifyScalingPolicy,
//                        "selectId": "modifyScalingPolicy"
//                    },
//                    {
//                        "label": i18n.uba_inventory_deleteScalingPolicy,
//                        "selectId": "deleteScalingPolicy"
//                    },
//                    {
//                        "label": i18n.uba_inventory_enableScalingPolicy,
//                        "selectId": "enableScalingPolicy"
//                    },
//                    {
//                        "label": i18n.uba_inventory_disableScalingPolicy,
//                        "selectId": "disableScalingPolicy"
//                    },
//                    {
//                        "label": i18n.uba_inventory_executeScalingPolicy,
//                        "selectId": "executeScalingPolicy"
//                    },
//                    {"label": i18n.uba_inventory_removeInstance, "selectId": "removeInstance"},
//                    {
//                        "label": i18n.uba_inventory_batchRemoveInstances,
//                        "selectId": "batchRemoveInstances"
//                    },
//                    {
//                        "label": i18n.uba_inventory_batchAddInstances,
//                        "selectId": "batchAddInstances"
//                    }
//                ];
//                $scope.keyOperationSelect.defaultSelectId = "empty";
//            }
//        };
//        this.getLoadKeyOperation = function (serviceName, $scope) {
//            if (serviceName === "ecs") {
//                $scope.loadKeyOperationSelect.values = [
//                    {
//                        "selectId": "empty",
//                        "label": i18n.uba_inventory_allKeyOperation
//                    },
//                    {"label": i18n.uba_inventory_createVM, "selectId": "createSingleServer"},
//                    {"label": i18n.uba_inventory_deleteVM, "selectId": "deleteVM"},
//                    {"label": i18n.uba_inventory_startVM, "selectId": "actionStart"},
//                    {"label": i18n.uba_inventory_restartVM, "selectId": "actionReboot"},
//                    {"label": i18n.uba_inventory_stopVM, "selectId": "actionStop"},
//                    {"label": i18n.uba_inventory_addVMNetworkCard, "selectId": "addNic"},
//                    {"label": i18n.uba_inventory_deleteVMNetworkCard, "selectId": "delNic"},
//                    {"label": i18n.uba_inventory_VMMountDisk, "selectId": "attachVolume"},
//                    {"label": i18n.uba_inventory_VMUnloadDisk, "selectId": "detachVolume"}
//                ];
//                $scope.loadKeyOperationSelect.defaultSelectId = "empty";
//            } else if (serviceName === "evs") {
//                $scope.loadKeyOperationSelect.values = [
//                    {
//                        "selectId": "empty",
//                        "label": i18n.uba_inventory_allKeyOperation
//                    },
//                    {"label": i18n.uba_inventory_createVolume, "selectId": "createVolume"},
//                    {"label": i18n.uba_inventory_updateVolume, "selectId": "updateVolume"},
//                    {"label": i18n.uba_inventory_extendVolume, "selectId": "extendVolume"},
//                    {"label": i18n.uba_inventory_deleteVolume, "selectId": "deleteVolume"},
//                    {
//                        "label": i18n.uba_inventory_BulkcreateVolumes,
//                        "selectId": "BulkcreateVolumes"
//                    },
//                    {
//                        "label": i18n.uba_inventory_BulkDeleteVolumes,
//                        "selectId": "BulkDeleteVolumes"
//                    }
//                ];
//                $scope.loadKeyOperationSelect.defaultSelectId = "empty";
//            } else if (serviceName === "vpc") {
//                $scope.loadKeyOperationSelect.values = [
//                    {
//                        "selectId": "empty",
//                        "label": i18n.uba_inventory_allKeyOperation
//                    },
//                    {"label": i18n.uba_inventory_createVpc, "selectId": "createVpc"},
//                    {"label": i18n.uba_inventory_deleteVpc, "selectId": "deleteVpc"},
//                    {"label": i18n.uba_inventory_modifyVpc, "selectId": "modifyVpc"},
//                    {"label": i18n.uba_inventory_createSubnet, "selectId": "createSubnet"},
//                    {"label": i18n.uba_inventory_deleteSubnet, "selectId": "deleteSubnet"},
//                    {"label": i18n.uba_inventory_modifySubnet, "selectId": "modifySubnet"},
//                    {"label": i18n.uba_inventory_createEip, "selectId": "createEip"},
//                    {"label": i18n.uba_inventory_deleteEip, "selectId": "deleteEip"},
//                    {"label": i18n.uba_inventory_bindEip, "selectId": "bindEip"},
//                    {"label": i18n.uba_inventory_unbindEip, "selectId": "unbindEip"}
//                ];
//                $scope.loadKeyOperationSelect.defaultSelectId = "empty";
//            } else if (serviceName === "ims") {
//                $scope.loadKeyOperationSelect.values = [
//                    {
//                        "selectId": "empty",
//                        "label": i18n.uba_inventory_allKeyOperation
//                    },
//                    {"label": i18n.uba_inventory_createImage, "selectId": "createImage"},
//                    {"label": i18n.uba_inventory_updateImage, "selectId": "updateImage"},
//                    {"label": i18n.uba_inventory_deleteImage, "selectId": "deleteImage"},
//                    {"label": i18n.uba_inventory_addMember, "selectId": "addMember"},
//                    {"label": i18n.uba_inventory_updateMember, "selectId": "updateMember"},
//                    {"label": i18n.uba_inventory_deleteMemeber, "selectId": "deleteMemeber"},
//                    {"label": i18n.uba_inventory_exportImage, "selectId": "exportImage"}
//                ];
//                $scope.loadKeyOperationSelect.defaultSelectId = "empty";
//            } else if (serviceName === "as") {
//                $scope.loadKeyOperationSelect.values = [
//                    {
//                        "selectId": "empty",
//                        "label": i18n.uba_inventory_allKeyOperation
//                    },
//                    {
//                        "label": i18n.uba_inventory_createScalingGroup,
//                        "selectId": "createScalingGroup"
//                    },
//                    {
//                        "label": i18n.uba_inventory_modifyScalingGroup,
//                        "selectId": "modifyScalingGroup"
//                    },
//                    {
//                        "label": i18n.uba_inventory_deleteScalingGroup,
//                        "selectId": "deleteScalingGroup"
//                    },
//                    {
//                        "label": i18n.uba_inventory_enableScalingGroup,
//                        "selectId": "enableScalingGroup"
//                    },
//                    {
//                        "label": i18n.uba_inventory_disableScalingGroup,
//                        "selectId": "disableScalingGroup"
//                    },
//                    {
//                        "label": i18n.uba_inventory_createScalingConfiguration,
//                        "selectId": "createScalingConfiguration"
//                    },
//                    {
//                        "label": i18n.uba_inventory_deleteScalingConfiguration,
//                        "selectId": "deleteScalingConfiguration"
//                    },
//                    {
//                        "label": i18n.uba_inventory_scaling_configuration_id,
//                        "selectId": "scaling_configuration_id"
//                    },
//                    {
//                        "label": i18n.uba_inventory_createScalingPolicy,
//                        "selectId": "createScalingPolicy"
//                    },
//                    {
//                        "label": i18n.uba_inventory_modifyScalingPolicy,
//                        "selectId": "modifyScalingPolicy"
//                    },
//                    {
//                        "label": i18n.uba_inventory_deleteScalingPolicy,
//                        "selectId": "deleteScalingPolicy"
//                    },
//                    {
//                        "label": i18n.uba_inventory_enableScalingPolicy,
//                        "selectId": "enableScalingPolicy"
//                    },
//                    {
//                        "label": i18n.uba_inventory_disableScalingPolicy,
//                        "selectId": "disableScalingPolicy"
//                    },
//                    {
//                        "label": i18n.uba_inventory_executeScalingPolicy,
//                        "selectId": "executeScalingPolicy"
//                    },
//                    {"label": i18n.uba_inventory_removeInstance, "selectId": "removeInstance"},
//                    {
//                        "label": i18n.uba_inventory_batchRemoveInstances,
//                        "selectId": "batchRemoveInstances"
//                    },
//                    {
//                        "label": i18n.uba_inventory_batchAddInstances,
//                        "selectId": "batchAddInstances"
//                    }
//                ];
//                $scope.loadKeyOperationSelect.defaultSelectId = "empty";
//            }
//        };
//        this.getSourceName = function (source) {
//            var sourceName;
//            switch (source) {
//                case "ApiCall":
//                    sourceName = i18n.uba_inventory_nbSourceApi;
//                    break;
//                case "ConsoleAction":
//                    sourceName = i18n.uba_inventory_nbSourceConsole;
//                    break;
//                case "SystemAction":
//                    sourceName = i18n.uba_inventory_nbSourceSystem;
//                    break;
//                default:
//                    sourceName = source;
//
//            }
//            return sourceName;
//        };
//        this.getLocaleTime = function (week, hour) {
//            var localeHour;
//            var timeZone;
//            var currentHour;
//            var week;
//            var localeWeek;
//            timeZone = -new Date().getTimezoneOffset() / 60;
//            week = week - 1;
//            if (timeZone < 0) {
//                localeHour = hour - timeZone;
//                currentHour = localeHour < 24 ? localeHour : localeHour - 24;
//                if (currentHour > 12) {
//                    localeWeek = (week - 1) < 0 ? 6 : (week - 1);
//                } else {
//                    localeWeek = week;
//                }
//            } else {
//                localeHour = hour + timeZone;
//                currentHour = localeHour < 24 ? localeHour : localeHour - 24;
//                if (localeHour < 24) {
//                    localeWeek = week;
//                } else {
//                    localeWeek = (week + 1) < 7 ? (week + 1) : 0;
//                }
//            }
//            var dateInfor = {
//                "week": localeWeek, "hour": currentHour
//            };
//            return dateInfor;
//        };
//        this.sortSize = function (size) {
//            return function (a, b) {
//                var value1 = a[size];
//                var value2 = b[size];
//                return value1 - value2;
//            }
//        };
//        this.isContainsTraceName = function (traceName) {
//            var traceNameArray = ["createServer", "reinstallOs", "modifyBandwidth", "createSecurityGroup", "createVpn", "deleteVpn", "modifyVpn", "createPrivateIp", "deletePrivateIp", "modifyDirectConnect"];
//            var flag = traceNameArray.indexOf(traceName);
//            if (flag < 0) {
//                return true;
//            } else {
//                return false;
//            }
//        };
//        this.getResponseTypeName = function (code) {
//            var responseTypeName;
//            switch (code) {
//                case "opsuba_total":
//                    responseTypeName = i18n.uba_inventory_allResponseType;
//                    break;
//                case "opsuba_nb_2xx":
//                    responseTypeName = i18n.uba_inventory_success;
//                    break;
//                case "2":
//                    responseTypeName = i18n.uba_inventory_success;
//                    break;
//                case "opsuba_nb_3xx":
//                    responseTypeName = i18n.uba_inventory_redirection;
//                    break;
//                case "3":
//                    responseTypeName = i18n.uba_inventory_redirection;
//                    break;
//                case "opsuba_nb_4xx":
//                    responseTypeName = i18n.uba_inventory_clientFailed;
//                    break;
//                case "4":
//                    responseTypeName = i18n.uba_inventory_clientFailed;
//                    break;
//                case "opsuba_nb_5xx":
//                    responseTypeName = i18n.uba_inventory_serverFailed;
//                    break;
//                case "5":
//                    responseTypeName = i18n.uba_inventory_serverFailed;
//                    break;
//                case "opsuba_nb_1xx":
//                    responseTypeName = i18n.uba_inventory_other;
//                    break;
//                case "1":
//                    responseTypeName = i18n.uba_inventory_other;
//                    break;
//                default:
//                    responseTypeName = code;
//
//            }
//            return responseTypeName;
//        };
//        this.showTip = function (id, code, text) {
//            var content;
//            var element = $("#" + id);
//            var tipId = id + "_tip";
//            var tip = new tinyWidget.Tip({
//                content: $.encoder.encodeForHTML(code + ":" + text),
//                element: element,
//                position: "top",
//                width: 200,
//                id: tipId
//            });
//        };
//        this.isContainsServiceName = function (serviceName,data) {
//            var dataArray = data;
//            var dataArrayLength =data.length;
//            var number = 0;
//            for (var i = 0; i < dataArrayLength; i++) {
//                var serviceInfor = dataArray[i].selectId;
//                if (serviceInfor.indexOf(serviceName) < 0) {
//                    //不存在
//                    number++;
//                }
//            }
//            return number;
//        };
//        this.downloadMax=100000;
    };
    var module = angular.module('basic.config');
    module.tinyService('timeUtilsServ', service);
});


