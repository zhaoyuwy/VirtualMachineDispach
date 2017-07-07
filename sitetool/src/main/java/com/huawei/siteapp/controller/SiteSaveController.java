package com.huawei.siteapp.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.huawei.siteapp.bean.RegionBean;
import com.huawei.siteapp.bean.Result;
import com.huawei.siteapp.bean.TopologyTreeBean;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.CommonUtils;
import com.huawei.siteapp.common.util.JSONUtils;
import com.huawei.siteapp.common.util.ServiceContext;
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

        ServiceContext serviceContext = new ServiceContext();

        int retCode = RetCode.INIT_ERROR;

        String jsonRst = JSONUtils.jsonToServiceContext(request);
//        String jsonRst = "{\"total\":1,\"regions\":[{\"evName\":\"廊坊\",\"sites\":[{\"siteRegion\":\"lf\",\"siteRegionName \":\"pub\",\"siteLoginUser\":\"admin\",\"siteLoginPwd\":\"HWS_lf@pub9001\",\"siteLoginIp\":\"10.44.70.245\"}]}]}";
//        System.out.println("#################" + jsonRst);
        TopologyTreeBean topologyTreeBean = JSON.parseObject(jsonRst, TopologyTreeBean.class);

        TopologyTreeBean topologyTreeBean2= JSONObject.parseObject(jsonRst ,  TopologyTreeBean.class);
//        JSON json = (JSON) JSON.toJSON(jsonRst);

//        JSONObject ja= JSONArray.fromObject(jsonRst);

//        for(int i=0;i<ja.size();i++){
//            JSONObject jo= ja.getJSONObject(i); //转换成JSONObject对象
            JSONObject jo = JSONObject.parseObject(jsonRst);
            System.out.println(jo.get("regions"));

//            TopologyTreeBean p=(TopologyTreeBean)JSONObject.toJavaObject(jo,TopologyTreeBean.class);    //转换成JavaBean
//            TopologyTreeBean p2=(TopologyTreeBean)JSONObject.parse(jsonRst);    //转换成JavaBean
//            System.out.println(p.getRegionBeans());

//        }
//        TopologyTreeBean topologyTreeBean3 = JSON.toJavaObject(json, TopologyTreeBean.class);
        //        String topoStr = JSON.toJSONString(topologyTreeBean);
//        String topoStr = "{\"total\":1,\"regions\":[{\"evName\":\"廊坊\",\"sites\":[{\"siteRegion\":\"lf\",\"siteRegionName \":\"pub\",\"siteLoginUser\":\"admin\",\"siteLoginPwd\":\"HWS_lf@pub9001\",\"siteLoginIp\":\"10.44.70.245\"}]}]}";
//        System.out.println("@@@@@@@@@@@@@@@@@@@"+topoStr);
//        System.out.println("@@@@@@@@@@@@@@@@@@@333"+topologyTreeBean2);
        if (CommonUtils.isNull(jsonRst)) {
            retCode = RetCode.INNER_ERROR;
            logger.error("parse param error");
        } else {
            topologyTreeBean.getRegionBeans();
            logger.info(JSON.toJSONString(topologyTreeBean), true);
            retCode = RetCode.OK;
//            retCode = siteLoginService.checkSiteUserLoginSuccess(userModel, request);
        }
        String data = "";
        result.setStatus(retCode);
        result.setMsg("OK");
        result.setData(postBody());
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
                siteModel.setSiteRegionName("pub"+j);
                siteModel.setSiteLoginIp("11.22.33.4" + j);
                siteModel.setSiteLoginUser("admin");
                siteModel.setSiteRegion("lf");
                siteModels.add(siteModel);
            }
            regionBeans.add(regionBean);
        }
        return topologyTreeBean;
    }
}
