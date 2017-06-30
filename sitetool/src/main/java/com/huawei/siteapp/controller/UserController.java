package com.huawei.siteapp.controller;

import com.huawei.siteapp.cache.CacheCenter;
import com.huawei.siteapp.common.Bean.RestBean;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.common.util.UctTimeUtil;
import com.huawei.siteapp.service.Http.HttpRestServiceImpl;
import com.huawei.siteapp.service.Http.SiteLoginHttpRequestServiceImpl;
import com.huawei.siteapp.service.Task.TaskServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

/**
 * Created by z00390414 on 2017/6/14.
 *
 * @version 1.0
 * @date 2017/6/14
 */
@RestController
public class UserController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());


    @RequestMapping(value = "/users/{username}", method = RequestMethod.GET)
    public String getUser(@PathVariable String username, @RequestParam String pwd, @RequestParam String ip) {

        TaskServiceImpl taskService = SpringUtil.getBean(TaskServiceImpl.class);
        taskService.clearDb();
//        int retCode = taskService.doTaskOne(username, pwd, ip);
        RestBean restBean = setRestBeanIp(ip);
        System.out.println("restBean = " + setRestBeanIp(ip) + " username = " + username + " pwd = " + pwd);
        CacheCenter.getInstance().addUrlResponse("restBean", restBean);
        CacheCenter.getInstance().addUrlResponse("username", username);
        CacheCenter.getInstance().addUrlResponse("pwd", pwd);
        CacheCenter.getInstance().addUrlResponse("ip", ip);

        //        登录获取token
        SiteLoginHttpRequestServiceImpl siteLoginHttpRequest = new SiteLoginHttpRequestServiceImpl();

        siteLoginHttpRequest.fcLoginRest(restBean, username, pwd);

        HttpRestServiceImpl httpRequest = new HttpRestServiceImpl();
        httpRequest.fcGetSitesRest(restBean);
//
        httpRequest.fcGetSitesClustersRest(restBean);
//
        httpRequest.fcGetSitesClustersHostsRest(restBean);


        return "Welcome," + username + " retCode = " + RetCode.OK + "  and time = " + UctTimeUtil.getCurrentDate();
    }

    public RestBean setRestBeanIp(String ip) {
        RestBean restBean = new RestBean();
        restBean.setVrmIp(ip);
        restBean.setRestPort("7070");
        return restBean;
    }

    @RequestMapping(value = "/userLogin/{username}", method = RequestMethod.GET)
    public String userLogin(@PathVariable String username, @RequestParam String pwd, @RequestParam String ip) {
        TaskServiceImpl taskService = SpringUtil.getBean(TaskServiceImpl.class);
        taskService.clearDb();
//        int retCode = taskService.doTaskOne(username, pwd, ip);
        RestBean restBean = setRestBeanIp(ip);
        System.out.println("restBean = " + setRestBeanIp(ip) + " username = " + username + " pwd = " + pwd);
        CacheCenter.getInstance().addUrlResponse("restBean", setRestBeanIp(ip));
        CacheCenter.getInstance().addUrlResponse("username", username);
        CacheCenter.getInstance().addUrlResponse("pwd", pwd);
        CacheCenter.getInstance().addUrlResponse("ip", ip);

        //        登录获取token
        SiteLoginHttpRequestServiceImpl siteLoginHttpRequest = new SiteLoginHttpRequestServiceImpl();

        siteLoginHttpRequest.fcLoginRest(restBean, username, pwd);
        CacheCenter.getInstance().addUrlResponse("loginSuccess", true);
        return "Login success";
    }

}
