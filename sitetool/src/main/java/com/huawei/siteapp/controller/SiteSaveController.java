package com.huawei.siteapp.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.huawei.siteapp.bean.RegionBean;
import com.huawei.siteapp.bean.Result;
import com.huawei.siteapp.bean.TopologyTreeBean;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.CommonUtils;
import com.huawei.siteapp.common.util.JSONUtils;
import com.huawei.siteapp.model.SiteModel;
import com.huawei.siteapp.service.UserBusinessService.ISiteLoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by z00390414 on 2017/7/7.
 *
 * @version 1.0
 */
@RestController
public class SiteSaveController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    ISiteLoginService siteLoginService;

    @RequestMapping(value = "/saveSite", method = RequestMethod.POST)
    @ResponseBody
    public Result saveSite(HttpServletRequest request) {

        logger.info("Enter saveSite.");
        Result result = new Result();

        int retCode;

        String jsonRst = JSONUtils.jsonToServiceContext(request);
        JSONObject jo = JSONObject.parseObject(jsonRst);
        JSONArray regionsStr = jo.getJSONArray("regions");
//        JSONArray sites = regionsStr.getJSONArray("sites");
        JSONObject site = regionsStr.getJSONObject(0);
        JSONArray sites = site.getJSONArray("sites");
        SiteModel siteModel = JSON.toJavaObject(sites.getJSONObject(0), SiteModel.class);



        if (CommonUtils.isNull(jsonRst)) {
            retCode = RetCode.INNER_ERROR;
            logger.error("parse param error");
        } else {
            retCode =siteLoginService.checkAndSaveSiteInfo(siteModel);
        }
        TopologyTreeBean  topologyTreeBean = siteLoginService.queryAllSiteLoginUsers();
        result.setStatus(retCode);
        result.setMsg("OK");
        result.setData(topologyTreeBean);
        return result;
    }

    public TopologyTreeBean postBody() {
        List<RegionBean> regionBeans = new ArrayList<>();
        TopologyTreeBean topologyTreeBean = new TopologyTreeBean(regionBeans);
        int total = 10;
        topologyTreeBean.setTotal(total);
        for (int i = 0; i < total; i++) {
            List<SiteModel> siteModels = new ArrayList<>();
            int siteNum = 3;
            RegionBean regionBean = new RegionBean("廊坊 " + i, siteModels);
            for (int j = 0; j < siteNum; j++) {
                SiteModel siteModel = new SiteModel();
                siteModel.setSiteRegionName("pub" + j);
                siteModel.setSiteLoginIp("11.22.33.4" + j);
                siteModel.setSiteLoginUser("admin");
                siteModel.setSiteRegion("lf");
                siteModels.add(siteModel);
            }
            regionBeans.add(regionBean);
        }
        return topologyTreeBean;
    }

    @RequestMapping(value = "/deleteSite", method = RequestMethod.POST)
    @ResponseBody
    public Result deleteSite(HttpServletRequest request) {

        logger.info("Enter saveSite.");
        Result result = new Result();

        int retCode;

        String jsonRst = JSONUtils.jsonToServiceContext(request);
        JSONObject jo = JSONObject.parseObject(jsonRst);
        JSONArray regionsStr = jo.getJSONArray("regions");
//        JSONArray sites = regionsStr.getJSONArray("sites");
        JSONObject site = regionsStr.getJSONObject(0);
        JSONArray sites = site.getJSONArray("sites");
        SiteModel siteModel = JSON.toJavaObject(sites.getJSONObject(0), SiteModel.class);



        if (CommonUtils.isNull(jsonRst)) {
            retCode = RetCode.INNER_ERROR;
            logger.error("parse param error");
        } else {
            retCode =siteLoginService.checkAndDeleteSiteInfo(siteModel);
        }
        TopologyTreeBean  topologyTreeBean = siteLoginService.queryAllSiteLoginUsers();
        result.setStatus(retCode);
        result.setMsg("OK");
        result.setData(topologyTreeBean);
        return result;
    }

    @RequestMapping(value = "/modifySite", method = RequestMethod.POST)
    @ResponseBody
    public Result modifySite(HttpServletRequest request) {

        logger.info("Enter saveSite.");
        Result result = new Result();

        int retCode;

        String jsonRst = JSONUtils.jsonToServiceContext(request);
        JSONObject jo = JSONObject.parseObject(jsonRst);
        JSONArray regionsStr = jo.getJSONArray("regions");
//        JSONArray sites = regionsStr.getJSONArray("sites");
        JSONObject site = regionsStr.getJSONObject(0);
        JSONArray sites = site.getJSONArray("sites");
        SiteModel siteModel = JSON.toJavaObject(sites.getJSONObject(0), SiteModel.class);



        if (CommonUtils.isNull(jsonRst)) {
            retCode = RetCode.INNER_ERROR;
            logger.error("parse param error");
        } else {
            retCode =siteLoginService.checkAndDeleteSiteInfo(siteModel);
            retCode =siteLoginService.checkAndSaveSiteInfo(siteModel);
        }
        TopologyTreeBean  topologyTreeBean = siteLoginService.queryAllSiteLoginUsers();
        result.setStatus(retCode);
        result.setMsg("OK");
        result.setData(topologyTreeBean);
        return result;
    }

}
