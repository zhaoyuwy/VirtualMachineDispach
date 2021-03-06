package com.huawei.siteapp.service;

import com.huawei.siteapp.common.Bean.RestBean;
import com.huawei.siteapp.service.Http.HttpRestServiceImpl;
import com.huawei.siteapp.service.Http.SiteLoginHttpRequestServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by z00390414 on 2017/6/16.
 *
 * @version 1.0
 */
@Component
public class MyTimer {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");

//    @Scheduled(fixedRate = 15000)
    public void timerRate() {
        String tm = sdf.format(new Date());
        try {
//            mainRest();
        } catch (Exception e) {
            logger.error("mainRest Exception ",e);
        }
        System.out.println(tm);
        logger.error("###每3秒执行一次 " + tm);;
    }


    public RestBean getTestRest() {
        RestBean restBean = new RestBean();
        restBean.setVrmIp("192.145.17.200");
//        restBean.setVrmIp("10.44.70.245");
        restBean.setRestPort("7070");
        return restBean;
    }

    public void mainRest() throws Exception {
//        登录获取token
        SiteLoginHttpRequestServiceImpl siteLoginHttpRequest = new SiteLoginHttpRequestServiceImpl();

        String user = "kwx319070";
        String pwd = "OpsImage@12345";
        siteLoginHttpRequest.fcLoginRest(getTestRest(), user, pwd);

        HttpRestServiceImpl httpRequest = new HttpRestServiceImpl();
        httpRequest.fcGetSitesRest(getTestRest());

        httpRequest.fcGetSitesClustersRest(getTestRest());
    }
}