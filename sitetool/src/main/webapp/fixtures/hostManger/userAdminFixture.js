define(["can/util/fixture/fixture", "tiny-lib/underscore"], function (fixture, _) {
    //var endpoints= {};
    var applyMachineTree = {
        data:[
                {
                    "id": "1",
                    //文件名称
                    "name": "局点信息",
                    "nodeType": "business",
                    "parentId": null,
                    //局点名称
                    "pointLan":"",
                    //所属区域
                    "regionCode":"",
                    //默认展开直接子节点
                    "open": "true"

                },
                {
                    "id": "2",
                    "name": "大连",
                    "nodeType": "City",
                    "parentId": "1",
                    "pointLan":"大连",
                    "regionCode":"pod_xxx_xxx",
                    "open": "true"

                },
                {
                    "id": "3",
                    "name": "廊坊",
                    "nodeType": "City",
                    "parentId": "1",
                    "pointLan":"廊坊",
                    "regionCode":"pBd_xxx_xxx",
                    "open": "true"
                },
                {
                    "id": "4",
                    "name": "广州",
                    "nodeType": "City",
                    "parentId": "1",
                    "pointLan":"广州",
                    "regionCode":"pUd_xxx_xxx",
                    "open": "true"
                },

                {
                    "id": "5",
                    "name": "上海",
                    "nodeType": "City",
                    "parentId": "1",
                    "pointLan":"上海",
                    "regionCode":"pWd_xxx_xxx",
                    "open": "true"
                },

                {
                    "id": "8",
                    "name": "pad_xxxx",
                    "nodeType": "point", //类型是局点
                    "parentId": "2",
                    "pointLan":"大连",
                    "regionCode":"pod_xxx_xxx"
                },
                {
                    "id": "9",
                    "name": "local_10.95.34.54",
                    "nodeType": "point",
                    "parentId": "2",
                    "pointLan":"大连",
                    "regionCode":"pod_xxx_xxx"
                },

                {
                    "id": "10",
                    "name": "Region_10.67.54.32",
                    "nodeType": "point",
                    "parentId": "3",
                    "pointLan":"廊坊",
                    "regionCode":"pBd_xxx_xxx"
                },
                {
                    "id": "10",
                    "name": "OP_10.65.33.23",
                    "nodeType": "point",
                    "parentId": "3",
                    "pointLan":"廊坊",
                    "regionCode":"pBd_xxx_xxx"
                },
                {
                    "id": "12",
                    "name": "Do_15.02015",
                    "nodeType": "point",
                    "parentId": "4",
                    "pointLan":"广州",
                    "regionCode":"pUd_xxx_xxx"

                },
                {
                    "id": "13",
                    "name": "POO_12.04510",
                    "nodeType": "point",
                    "parentId": "4",
                    "pointLan":"广州",
                    "regionCode":"pUd_xxx_xxx"
                }]
    };

    fixture({
        //查询资源池列表
        "GET /hostManger/urlCommon/applyTree": function (original, response) {
            response(200, "success", applyMachineTree, {});
        }
    });

    return fixture;
});