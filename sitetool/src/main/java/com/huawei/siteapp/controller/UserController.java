package com.huawei.siteapp.controller;

import com.huawei.siteapp.cache.CacheCenter;
import com.huawei.siteapp.common.Bean.RestBean;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.common.util.UctTimeUtil;
import com.huawei.siteapp.model.MonitorCnaInfoModel;
import com.huawei.siteapp.service.ExcelService.HostReportServiceImpl;
import com.huawei.siteapp.service.Http.HttpRestServiceImpl;
import com.huawei.siteapp.service.Http.MonitorCnaServiceImpl;
import com.huawei.siteapp.service.Http.SiteLoginHttpRequestServiceImpl;
import com.huawei.siteapp.service.ModelService.Impl.MonitorCnaInfoServiceImpl;
import com.huawei.siteapp.service.Task.TaskServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by z00390414 on 2017/6/14.
 *
 * @version 1.0
 * @date 2017/6/14
 */
@RestController
public class UserController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

//    @Autowired
//    MonitorCnaServiceImpl monitorsService;
//    @Autowired
//    private HostReportServiceImpl hostReportServiceImpl;
//    @Autowired
//    private TaskServiceImpl taskService;


    @RequestMapping(value = "/users/{username}", method = RequestMethod.GET)
    public String getUser(@PathVariable String username, @RequestParam String pwd, @RequestParam String ip) {
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

        HttpRestServiceImpl httpRequest = new HttpRestServiceImpl();
        httpRequest.fcGetSitesRest(restBean);
//
        httpRequest.fcGetSitesClustersRest(restBean);
//
        httpRequest.fcGetSitesClustersHostsRest(restBean);

        MonitorCnaServiceImpl monitorsService = SpringUtil.getBean(MonitorCnaServiceImpl.class);
        monitorsService.fcPostSitesClustersHostsCpuMemRest(restBean);
        int retCode = RetCode.INIT_ERROR;
        try {
//            retCode = hostReportServiceImpl.hostReportSaveDataToExcel(username + "_" + ip + "_" + UctTimeUtil.getCurrentDate("yyyy_MM_dd_HH_mm_ss"));
            MonitorCnaInfoServiceImpl monitorCpuMemService = SpringUtil.getBean(MonitorCnaInfoServiceImpl.class);
//            HostReportServiceImpl hostReportService = SpringUtil.getBean(HostReportServiceImpl.class);
            Iterable<MonitorCnaInfoModel> hosts = monitorCpuMemService.findAll();
            HostReportServiceImpl hostReportServiceImpl = SpringUtil.getBean(HostReportServiceImpl.class);
            retCode = hostReportServiceImpl.poiTemplate("host_"+UctTimeUtil.getCurrentDate(), (List<MonitorCnaInfoModel>) hosts);
        } catch (Exception e) {
            logger.error("This is report Exception", e);
        }

        return "Welcome," + username + " retCode = " + retCode + "and time = " + UctTimeUtil.getCurrentDate();
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
