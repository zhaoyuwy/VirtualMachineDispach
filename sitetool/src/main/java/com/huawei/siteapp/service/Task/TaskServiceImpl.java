package com.huawei.siteapp.service.Task;

import com.huawei.siteapp.cache.CacheCenter;
import com.huawei.siteapp.common.Bean.RestBean;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.common.util.UctTimeUtil;
import com.huawei.siteapp.service.ExcelService.HostReportServiceImpl;
import com.huawei.siteapp.service.Http.HttpRestServiceImpl;
import com.huawei.siteapp.service.Http.MonitorsServiceImpl;
import com.huawei.siteapp.service.Http.SiteLoginHttpRequestServiceImpl;
import com.huawei.siteapp.service.ModelService.Impl.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Random;

/**
 * Created by z00390414 on 2017/6/28.
 *
 * @version 1.0
 */
@Component
public class TaskServiceImpl {
    //定义一个随机对象.
    public static Random random = new Random();
    @Autowired
    MonitorsServiceImpl monitorsService;
    @Autowired
    private HostReportServiceImpl hostReportServiceImpl;

    @Async  //加入"异步调用"注解
    public int doTaskOne(String username, String pwd, String ip) {
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

//        MonitorsServiceImpl = SpringUtil.getBean(MonitorsServiceImpl.class);
        monitorsService.fcPostSitesClustersHostsCpuMemRest(restBean);
        int retCode = RetCode.INIT_ERROR;
        try {
            retCode = hostReportServiceImpl.hostReportSaveDataToExcel(username + "_" + ip + "_" + UctTimeUtil.getCurrentDate("yyyy_MM_dd_HH_mm_ss"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return retCode;
    }

    @Async
    public void doTaskTwo() throws InterruptedException {
        System.out.println("开始执行任务二");
        long start = System.currentTimeMillis();
        Thread.sleep(random.nextInt(10000));
        long end = System.currentTimeMillis();
        System.out.println("完成任务二，耗时：" + (end - start) + "毫秒");
    }

    @Async
    public void doTaaskThree() throws InterruptedException {
        System.out.println("开始执行任务三");
        long start = System.currentTimeMillis();
        Thread.sleep(random.nextInt(10000));
        long end = System.currentTimeMillis();
        System.out.println("完成任务三，耗时：" + (end - start) + "毫秒");
    }

    private RestBean setRestBeanIp(String ip) {
        RestBean restBean = new RestBean();
        restBean.setVrmIp(ip);
        restBean.setRestPort("7070");
        return restBean;
    }

    public int clearDb() {
        ClusterServiceImpl clusterService = SpringUtil.getBean(ClusterServiceImpl.class);
        HostServiceImpl hostService = SpringUtil.getBean(HostServiceImpl.class);
        SiteServiceImpl siteService = SpringUtil.getBean(SiteServiceImpl.class);
        MonitorCpuMemServiceImpl monitorCpuMemService = SpringUtil.getBean(MonitorCpuMemServiceImpl.class);
        VmServiceImpl vmService = SpringUtil.getBean(VmServiceImpl.class);
        clusterService.deleteAll();
        hostService.deleteAll();
        siteService.deleteAll();
        monitorCpuMemService.deleteAll();
        vmService.deleteAll();
        return RetCode.OK;
    }
}
