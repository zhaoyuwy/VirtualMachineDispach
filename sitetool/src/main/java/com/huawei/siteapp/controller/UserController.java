package com.huawei.siteapp.controller;

import com.huawei.siteapp.cache.CacheCenter;
import com.huawei.siteapp.common.Bean.SiteLoginRestBean;
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
        taskService.clearDbAllData();
//        int retCode = taskService.doTaskOne(username, pwd, ip);
        SiteLoginRestBean siteLoginRestBean = setSiteLoginRestBean("廊坊",ip,username,pwd);
        logger.info("siteLoginRestBean = " +siteLoginRestBean);
        CacheCenter.getInstance().addUrlResponse("siteLoginRestBean", siteLoginRestBean);
        CacheCenter.getInstance().addUrlResponse("username", username);
        CacheCenter.getInstance().addUrlResponse("pwd", pwd);
        CacheCenter.getInstance().addUrlResponse("ip", ip);

        //        登录获取token
        SiteLoginHttpRequestServiceImpl siteLoginHttpRequest = SpringUtil.getBean(SiteLoginHttpRequestServiceImpl.class);
        siteLoginHttpRequest.fcLoginRest(siteLoginRestBean);

//        ISiteLoginService siteLoginService = SpringUtil.getBean(ISiteLoginService.class);

//        siteLoginService.checkSiteUserLoginSuccess(siteLoginRestBean);
        saveSiteLoginUser(siteLoginRestBean);


//        CacheCenter.getInstance().addUrlResponse("loginSuccess", true);
        return "Welcome," + username + " retCode = " + RetCode.OK + "  and time = " + UctTimeUtil.getCurrentDate();
    }

    private void saveSiteLoginUser(SiteLoginRestBean siteLoginRestBean) {
        HttpRestServiceImpl httpRequest = SpringUtil.getBean(HttpRestServiceImpl.class);
        httpRequest.fcGetSitesRest(siteLoginRestBean);
//
        httpRequest.fcGetSitesClustersRest(siteLoginRestBean);
//
        httpRequest.fcGetSitesClustersHostsRest(siteLoginRestBean);

    }

    public SiteLoginRestBean setSiteLoginRestBean(String siteRegionName,String siteLoginIp, String siteLoginUser, String siteLoginPwd) {
        SiteLoginRestBean siteLoginRestBean = new SiteLoginRestBean();
        siteLoginRestBean.setSiteRegionName(siteRegionName);
        siteLoginRestBean.setSiteLoginIp(siteLoginIp);
        siteLoginRestBean.setSiteLoginUser(siteLoginUser);
        siteLoginRestBean.setSiteLoginPwd(siteLoginPwd);
        siteLoginRestBean.setRestPort("7070");
        return siteLoginRestBean;
    }

    @RequestMapping(value = "/userLogin/{username}", method = RequestMethod.GET)
    public String userLogin(@PathVariable String username, @RequestParam String pwd, @RequestParam String ip) {
        TaskServiceImpl taskService = SpringUtil.getBean(TaskServiceImpl.class);
        taskService.clearDbAllData();
//        int retCode = taskService.doTaskOne(username, pwd, ip);
        SiteLoginRestBean siteLoginRestBean = setSiteLoginRestBean("廊坊",ip,username,pwd);

        //        登录获取token
        SiteLoginHttpRequestServiceImpl siteLoginHttpRequest = new SiteLoginHttpRequestServiceImpl();

        siteLoginHttpRequest.fcLoginRest(siteLoginRestBean);
//        CacheCenter.getInstance().addUrlResponse("loginSuccess", true);
        return "Login success";
    }

}
