define([], function () {
    "use strict";
    var inventory = {
            "hostManger_summary":"主机管理系统平台",

            /*主机管理系统 登录页面start*/
            "hecmanger_loginLabel":"FC主机 管理系统",
            "hecmanger_projiect":"FC主机",
            "hecmanger_sys":"管理系统",


            'userName':"用户名:",
            "password":"密码:",
            "Average_user":"普通用户", //普通用户
            "Managing_users":"管理用户", //管理用户
            "Sign_in":"登录",
            "input_userName":"请输入用户名",//请输入用户名
            "input_userPassword":"请输入用户密码",
            "input_error":"输入的用户名或者密码有误！",//输入的用户名或密码有误


            /*主机管理系统  登录页面end*/


            /*主机管理系统 顶部导航start*/
            "virtualMachine_apply":"虚拟机申请",
            "hostResource_check":"资源查看",
            "info_collection":"信息收集",
            "system_manger":"系统管理",

            /*主机管理系统 顶部导航end*/


           /*系统管理页面 start*/
            "project_version":"版本号:v1.0.0",
            "environmentConfig":"环境配置",
            "emailConfig":"邮件配置",
            "thresholdConfig":"阈值配置",
            "systemConfig":"系统配置",

            "evSiteTotalHead":"环境节点总共",
            "evSiteTotalAfter":"条",
            /*系统管理页面 end*/



       /*环境配置页面 start*/
            "environmentConfigPage":"环境配置页面",
            "addEnvironment":"添加环境",
            "addSite":"添加节点",
            "editSite":"编辑节点",
            "deleteSite":"删除节点",


            "evName":"环境名称",
            "siteRegionName":"局点名称",
            "siteRegion":"所属区域",
            "siteLoginUser":"操作用户",
            "siteLoginPwd":"用户密码",
            "siteLoginIp":"ip地址",
            "operation":"操作",
            "noDadaInfo":"暂无表格数据，请添加环境节点……",
            "evAlertInfo":"请输入添加环境字段的信息",
            "siteAlertInfo":"请输入添加环境字段的信息",
            "confirmDeleteSite":"确定删除该节点信息?",
            "confirmDeleteEv":"确定删除该环境?",
        /*环境配置页面 end*/


        /*邮件配置页面 start */

        emailCongfigpage:"邮件配置页面",
        /*邮件配置页面 end */

        /*阈值配置页面 start */
        thresholdConfigpage:"阈值配置页面",
        /*阈值配置页面 end */

        systemConfigpage:'系统配置页面'
};
    return inventory
});