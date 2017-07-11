/**
 * Created on 13-12-18.
 */
define(["can/util/fixture/fixture", "tiny-lib/underscore"], function (fixture, _) {
    //var endpoints= {};
    var endpoints= {
        "endpoints": [
            {
                "seq_id": 51,
                "id": "LLD-admin",
                "name": "LLD-admin管理工具",
                "shortName": "LLD-admin",
                "created": "2017-02-27 16:16:57",
                "lastModified": "2017-02-27 16:16:57",
                "version": "v1.0",
                "description": "LLD-admin console",
                "endpoint": "/LLD-admin/LLD-admin/index.html#/LLD-adminTotal/LLD-admin",
                "active": true,
                "defaultOpen": true,
                "serviceOrder": 3,
                "catalog": "任务中心",
                "catalogOrder": 0,
                "catalogCss": "Computing",
                "links": [],
                "nonSupportRegions":['cn-xian-1']
            },


            {
                "seq_id": 31,
                "id": "OpsDataCompass",
                "name": "数据罗盘",
                "shortName": "数据罗盘",
                "created": "2017-03-09 19:14:05",
                "lastModified": "2017-03-09 19:14:05",
                "version": "v1.0",
                "description": "OpsDataCompass console",
                "endpoint": "https://console.ops.com/odc",
                "active": true,
                "defaultOpen": true,
                "serviceOrder": 2,
                "catalog": "百宝箱",
                "catalogOrder": 21,
                "catalogCss": "Computing",
                "links": []
            },
            {
                "seq_id": 25,
                "id": "HelpCenter",
                "name": "帮助中心",
                "shortName": "帮助中心",
                "created": "2017-03-09 18:58:50",
                "lastModified": "2017-03-09 18:58:50",
                "version": "v1.0",
                "description": "HelpCenter console",
                "endpoint": "https://docs.siay-om.com",
                "active": true,
                "defaultOpen": true,
                "serviceOrder": 1,
                "catalog": "帮助中心",
                "catalogOrder": 22,
                "catalogCss": "Computing",
                "links": []
            },
            {
                "seq_id": 27,
                "id": "UserCenter",
                "name": "用户中心",
                "shortName": "用户中心",
                "created": "2017-03-09 19:07:34",
                "lastModified": "2017-03-09 19:07:34",
                "version": "v1.0",
                "description": "UserCenter console",
                "endpoint": "https://console.ops.com/Settings/#/UserCenter",
                "active": true,
                "defaultOpen": true,
                "serviceOrder": 1,
                "catalog": "系统配置",
                "catalogOrder": 23,
                "catalogCss": "Computing",
                "links": []
            },
            {
                "seq_id": 26,
                "id": "TreasureChest",
                "name": "百宝箱",
                "shortName": "百宝箱",
                "created": "2017-03-09 19:07:03",
                "lastModified": "2017-03-09 19:07:03",
                "version": "v1.0",
                "description": "UserCenter console",
                "endpoint": "https://console.ops.com/Settings/#/TreasureChest",
                "active": true,
                "defaultOpen": true,
                "serviceOrder": 1,
                "catalog": "SystemConfig",
                "catalogOrder": 23,
                "catalogCss": "Computing",
                "links": []
            },
            {
                "seq_id": 28,
                "id": "AppMgmt",
                "name": "应用管理",
                "shortName": "应用管理",
                "created": "2017-03-09 19:08:13",
                "lastModified": "2017-03-09 19:08:13",
                "version": "v1.0",
                "description": "AppMgmt console",
                "endpoint": "https://console.ops.com/Settings/#/AppMgmt",
                "active": true,
                "defaultOpen": true,
                "serviceOrder": 2,
                "catalog": "系统配置",
                "catalogOrder": 23,
                "catalogCss": "Computing",
                "links": []
            }
        ],
        "total": 10
    };

    var endpointsEn = {
        "endpoints": [
            {
                "seq_id": 1,
                "id": "home",
                "name": "Console Home",
                "shortName": "home",
                "created": "2017-02-27 16:15:53",
                "lastModified": "2017-02-27 16:15:53",
                "version": "v1.0",
                "description": "Ops Console Home",
                "endpoint": "https://console.ops.com/console",
                "active": true,
                "defaultOpen": true,
                "serviceOrder": 1,
                "catalog": "MonitorCenter",
                "catalogOrder": 1,
                "catalogCss": "Computing",
                "links": []
            },
            {
                "seq_id": 6,
                "id": "opsuba",
                "name": "OpsUBA",
                "shortName": "opsuba",
                "created": "2017-02-27 16:26:05",
                "lastModified": "2017-02-27 16:26:05",
                "version": "v1.0",
                "description": "opsuba console",
                "endpoint": "https://console.ops.com/opsuba",
                "active": true,
                "defaultOpen": true,
                "serviceOrder": 2,
                "catalog": "MonitorCenter",
                "catalogOrder": 1,
                "catalogCss": "Computing",
                "links": []
            },
            {
                "seq_id": 18,
                "id": "MonitorCenter-SHM",
                "name": "Service health monitoring",
                "shortName": "Service health monitoring",
                "created": "2017-03-08 16:37:02",
                "lastModified": "2017-03-08 16:37:02",
                "version": "v1.0",
                "description": "Service health monitoring console",
                "endpoint": "https://console.ops.com/MonitorCenter/#/mc",
                "active": true,
                "defaultOpen": true,
                "serviceOrder": 4,
                "catalog": "MonitorCenter",
                "catalogOrder": 1,
                "catalogCss": "Computing",
                "links": []
            },
            {
                "seq_id": 21,
                "id": "MonitorCenter-Diagnose",
                "name": "Tenant Resource Query",
                "shortName": "Tenant Resource Query",
                "created": "2017-03-08 16:40:08",
                "lastModified": "2017-03-08 16:40:08",
                "version": "v1.0",
                "description": "Tenant Resource Query console",
                "endpoint": "https://console.ops.com/MonitorCenter/#/diagnose",
                "active": true,
                "defaultOpen": true,
                "serviceOrder": 5,
                "catalog": "MonitorCenter",
                "catalogOrder": 1,
                "catalogCss": "Computing",
                "links": []
            },
            {
                "seq_id": 22,
                "id": "MonitorCenter-MCM",
                "name": "Monitor Configuration Management",
                "shortName": "Monitor Configuration Management",
                "created": "2017-03-08 16:41:10",
                "lastModified": "2017-03-08 16:41:10",
                "version": "v1.0",
                "description": "Monitor Configuration Management console",
                "endpoint": "https://console.ops.com/MonitorCenter/#/configLeft/systemIntergrating",
                "active": true,
                "defaultOpen": true,
                "serviceOrder": 6,
                "catalog": "MonitorCenter",
                "catalogOrder": 1,
                "catalogCss": "Computing",
                "links": []
            },
            {
                "seq_id": 4,
                "id": "opsLog",
                "name": "Ops Log Mgmt",
                "shortName": "opsLog",
                "created": "2017-02-27 16:20:58",
                "lastModified": "2017-02-27 16:20:58",
                "version": "v1.0",
                "description": "Ops log console",
                "endpoint": "https://console.ops.com/opsLog",
                "active": true,
                "defaultOpen": true,
                "serviceOrder": 1,
                "catalog": "SecurityMgmt",
                "catalogOrder": 2,
                "catalogCss": "Computing",
                "links": []
            },
            {
                "seq_id": 30,
                "id": "OpsDataCompass",
                "name": "OpsDataCompass",
                "shortName": "OpsDataCompass",
                "created": "2017-03-09 19:09:37",
                "lastModified": "2017-03-09 19:09:37",
                "version": "v1.0",
                "description": "OpsDataCompass console",
                "endpoint": "https://console.ops.com/odc",
                "active": true,
                "defaultOpen": true,
                "serviceOrder": 2,
                "catalog": "TreasureChest",
                "catalogOrder": 21,
                "catalogCss": "Computing",
                "links": []
            },
            {
                "seq_id": 24,
                "id": "HelpCenter",
                "name": "HelpCenterr",
                "shortName": "HelpCenter",
                "created": "2017-03-09 18:58:17",
                "lastModified": "2017-03-09 18:58:17",
                "version": "v1.0",
                "description": "HelpCenter console",
                "endpoint": "https://docs.siay-om.com",
                "active": true,
                "defaultOpen": true,
                "serviceOrder": 1,
                "catalog": "HelpCenter",
                "catalogOrder": 22,
                "catalogCss": "Computing",
                "links": []
            },
            {
                "seq_id": 26,
                "id": "UserCenter",
                "name": "UserCenter",
                "shortName": "UserCenter",
                "created": "2017-03-09 19:07:03",
                "lastModified": "2017-03-09 19:07:03",
                "version": "v1.0",
                "description": "UserCenter console",
                "endpoint": "https://console.ops.com/Settings/#/UserCenter",
                "active": true,
                "defaultOpen": true,
                "serviceOrder": 1,
                "catalog": "SystemConfig",
                "catalogOrder": 23,
                "catalogCss": "Computing",
                "links": []
            },
            {
                "seq_id": 26,
                "id": "TreasureChest",
                "name": "TreasureChest",
                "shortName": "UserCenter",
                "created": "2017-03-09 19:07:03",
                "lastModified": "2017-03-09 19:07:03",
                "version": "v1.0",
                "description": "UserCenter console",
                "endpoint": "https://console.ops.com/Settings/#/TreasureChest",
                "active": true,
                "defaultOpen": true,
                "serviceOrder": 1,
                "catalog": "SystemConfig",
                "catalogOrder": 23,
                "catalogCss": "Computing",
                "links": []
            },
            {
                "seq_id": 29,
                "id": "AppMgmt",
                "name": "AppMgmt",
                "shortName": "AppMgmt",
                "created": "2017-03-09 19:08:28",
                "lastModified": "2017-03-09 19:08:28",
                "version": "v1.0",
                "description": "AppMgmt console",
                "endpoint": "https://console.ops.com/Settings/#/AppMgmt",
                "active": true,
                "defaultOpen": true,
                "serviceOrder": 2,
                "catalog": "SystemConfig",
                "catalogOrder": 23,
                "catalogCss": "Computing",
                "links": []
            }
        ],
        "total": 10
    };
    var regions = {"total":0};
    var regions = {
        "regions": [
            {
                "seqId": 2,
                "id": "cn-xian-1",
                "name": "cn-xian-1",
                "created": "2016-12-30 10:52:03",
                "lastModified": "2016-12-30 10:52:03",
                "locale": "zh-cn",
                "active": true,
                "type": "public"
            },
            {
                "seqId": 3,
                "id": "cn-xian-2",
                "name": "cn-xian-2",
                "created": "2016-12-30 14:03:48",
                "lastModified": "2016-12-30 14:03:48",
                "locale": "zh-cn",
                "active": true,
                "type": "public"
            },
            {
                "seqId": 11,
                "id": "cn-xian-3",
                "name": "cn-xian-3",
                "created": "2017-01-05 10:46:09",
                "lastModified": "2017-01-05 10:46:09",
                "locale": "zh-cn",
                "active": true,
                "type": "public"
            }
        ],
        "total": 3
    }
    var user = {
        "id": "266",
        "name": "ops_user_fixture",
        "roleIds": [
            "27",
            "28",
            "29",
            "30"
        ],
        "roleNames": [
            "ops_role_uba",
            "ops_role_oim",
            "ops_role_admin",
            "ops_role_opsuba"
        ],
         "region":""
    };

    fixture({
       //查询资源池列表
       "GET /rest/silvan/rest/v1.0/endpoints": function (original, response) {
           if(window.urlParams['lang'] === 'en-us') {
               response(200, "success", endpointsEn, {});
           } else {
               response(200, "success", endpoints, {});
           }

       },
       "GET /rest/silvan/rest/v1.0/users/{user_id}/endpoints": function (original, response) {
           if(window.urlParams['lang'] === 'en-us') {
               response(200, "success", favoriteEndpointsEn, {});
           } else {
               response(200, "success", favoriteEndpoints, {});
           }
       },
       "GET /rest/silvan/rest/v1.0/regions": function (original, response) {
           response(200, "success", regions, {});
       },
       "GET /me": function (original, response) {
           response(200, "success", user, {});
       },
       "GET /rest/silvan/rest/v1.0/test/endpoints": function (original, response) {
               response(200, "success", endpoints, {});
       }
    });

    return fixture;
});