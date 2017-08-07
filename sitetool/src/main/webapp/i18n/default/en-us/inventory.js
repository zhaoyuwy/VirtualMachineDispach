define([], function () {
    "use strict";
    var inventory = {
            "hostManger_summary":"host Management",

            /*主机管理系统 登录页面start*/
            "hecmanger_loginLabel":"FC host MS",
            "hecmanger_projiect":"FC host",
            "hecmanger_sys":"management system",


            'userName':"userName:",
            "password":"Password:",
            "Average_user":"Average", //普通用户
            "Managing_users":"Managing", //管理用户
            "Sign_in":"Sign in",
            "input_userName":"Please input user name",//请输入用户名
            "input_userPassword":"Please input user password",
            "input_error":"input Username or password error!",//输入的用户名或密码有误


            /*主机管理系统  登录页面end*/


            /*主机管理系统 顶部导航start*/
            "virtualMachine_apply":"virtualMachine_apply",
            "hostResource_check":"resource_check",
            "info_collection":"info_collection",
            "system_manger":"system_manger",

            /*主机管理系统 顶部导航end*/


           /*系统管理页面 start*/
            "project_version":"version:v1.0.0",
            "environmentConfig":"environmentConfig",
            "emailConfig":"emailConfig",
            "thresholdConfig":"thresholdConfig",
            "systemConfig":"systemConfig",

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