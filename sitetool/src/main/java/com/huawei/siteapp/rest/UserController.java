package com.huawei.siteapp.rest;

import com.huawei.siteapp.cache.CacheCenter;
import com.huawei.siteapp.common.Bean.RestBean;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.UctTimeUtil;
import com.huawei.siteapp.http.HttpGetRequest;
import com.huawei.siteapp.http.MonitorsServiceImpl;
import com.huawei.siteapp.http.SiteLoginHttpRequest;
import com.huawei.siteapp.service.ExcelService.HostReportServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

/**
 * Created by z00390414 on 2017/6/14.
 *
 * @version 1.0
 * @date 2017/6/14
 */
@RestController
public class UserController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    MonitorsServiceImpl monitorsService;
    @Autowired
    private HostReportServiceImpl hostReportServiceImpl;

    @RequestMapping(value = "/users/{username}", method = RequestMethod.GET)
    public String getUser(@PathVariable String username, @RequestParam String pwd, @RequestParam String ip) {

        RestBean restBean = setRestBeanIp(ip);
        System.out.println("restBean = " + setRestBeanIp(ip) + " username = " + username + " pwd = " + pwd);
        CacheCenter.getInstance().addUrlResponse("restBean", setRestBeanIp(ip));
        CacheCenter.getInstance().addUrlResponse("username", username);
        CacheCenter.getInstance().addUrlResponse("pwd", pwd);
        CacheCenter.getInstance().addUrlResponse("ip", ip);

        //        登录获取token
        SiteLoginHttpRequest siteLoginHttpRequest = new SiteLoginHttpRequest();

        siteLoginHttpRequest.fcLoginRest(restBean, username, pwd);

        HttpGetRequest httpRequest = new HttpGetRequest();
        httpRequest.fcGetSitesRest(restBean);
//
        httpRequest.fcGetSitesClustersRest(restBean);
//
        httpRequest.fcGetSitesClustersHostsRest(restBean);

//        MonitorsServiceImpl = SpringUtil.getBean(MonitorsServiceImpl.class);
        monitorsService.fcPostSitesClustersHostsCpuMemRest(restBean);
        int retCode = RetCode.INIT_ERROR;
        try {
            retCode = hostReportServiceImpl.hostReportSaveDataToExcel(username + "_"+ip + "_"+UctTimeUtil.getCurrentDate("yyyy_MM_dd_HH_MM_SS"));
        } catch (IOException e) {
            e.printStackTrace();
        }


        return "Welcome," + username +  " retCode = "+retCode;
    }

    private RestBean setRestBeanIp(String ip) {
        RestBean restBean = new RestBean();
        restBean.setVrmIp(ip);
        restBean.setRestPort("7070");
        return restBean;
    }
}
