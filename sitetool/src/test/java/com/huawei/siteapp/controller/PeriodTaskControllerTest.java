package com.huawei.siteapp.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.huawei.siteapp.model.PeriodTaskModel;
import org.junit.Test;

import java.util.Date;
import java.util.List;

/**
 * Created by z00390414 on 2017/7/14.
 *
 * @version 1.0
 */
public class PeriodTaskControllerTest {
    @Test
    public void postSavePeriodTask() throws Exception {
//        String param = "{\"total\":1,\"tasks\":[{\"regions\":[{\"evName\":\"langfang\",\"siteNum\":2,\"sites\":[{\"siteRegionName\":\"langfang\",\"siteRegion\":\"dmz\",\"siteLoginIp\":\"10.44.33.245\",\"taskName\":\"taskByDay\",\"taskType\":0,\"isSendEmail\":false,\"time\":\"0，1，2，3，4，5，31 22_30\"},{\"siteRegionName\":\"langfang\",\"siteRegion\":\"pub\",\"siteLoginIp\":\"10.44.70.245\",\"taskName\":\"taskByWeek\",\"taskType\":1,\"isSendEmail\":true,\"time\":\"0，1， 2，3，4，5，6 22_30\"}]}]}]}";
String param = "{\"total\":1,\"tasks\":[{\"regions\":[{\"evName\":\"langfang\",\"siteNum\":2,\"sites\":[{\"siteRegionName\":\"langfang\",\"siteRegion\":\"dmz\",\"siteLoginIp\":\"10.44.33.245\",\"taskName\":\"taskByDay\",\"taskType\":0,\"isSendEmail\":false,\"periodTime\":\"0，1，2，3，4，5，31 22_30\"},{\"siteRegionName\":\"langfang\",\"siteRegion\":\"pub\",\"siteLoginIp\":\"10.44.70.245\",\"taskName\":\"taskByWeek\",\"taskType\":1,\"isSendEmail\":true,\"periodTime\":\"0，1， 2，3，4，5，6 22_30\"}]}]}]}";
        Object object = JSON.parse(param);
//        JSONObject jsonObjectPeriodTask  = (JSONObject) ((List)((JSONObject)((List)((JSONObject)((List)((JSONObject) object).get("tasks")).get(0)).get("regions")).get(0)).get("sites")).get(0);
        JSONObject jsonObjectPeriodTask  = (JSONObject) ((JSONArray)((JSONObject)((List)((JSONObject)((JSONArray)((JSONObject) object).get("tasks")).get(0)).get("regions")).get(0)).get("sites")).get(0);
        PeriodTaskModel periodTaskModel = new PeriodTaskModel();
        periodTaskModel.setSiteRegionName(jsonObjectPeriodTask.getString("siteRegionName"));
        periodTaskModel.setSiteRegion(jsonObjectPeriodTask.getString("siteRegion"));
        periodTaskModel.setSiteLoginIp(jsonObjectPeriodTask.getString("siteLoginIp"));
        periodTaskModel.setTaskName(jsonObjectPeriodTask.getString("taskName"));
        periodTaskModel.setPeriodTime(jsonObjectPeriodTask.getString("periodTime"));
        periodTaskModel.setSendEmail(jsonObjectPeriodTask.getBoolean("isSendEmail"));

        System.out.println((periodTaskModel));
        System.out.println(jsonObjectPeriodTask);

    }
    @Test
    public void testDate(){
        Date dateNow = new Date();
        System.out.println(dateNow);
    }

}