package com.huawei.siteapp.service.Task;

import com.huawei.siteapp.common.Bean.RestBean;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.service.ModelService.Impl.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

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
//    @Autowired
//    MonitorCnaServiceImpl monitorsService;
//    @Autowired
//    private HostReportServiceImpl hostReportServiceImpl;


    @Async
    public void doTaskTwo(String param) throws InterruptedException {
        System.out.println("开始执行任务二");
        long start = System.currentTimeMillis();

//        Thread.sleep(random.nextInt(10000));
        System.out.print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"+param);
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
        MonitorCnaInfoServiceImpl monitorCnaInfoService = SpringUtil.getBean(MonitorCnaInfoServiceImpl.class);
        MonitorVmInfoServiceImpl monitorVmInfoService = SpringUtil.getBean(MonitorVmInfoServiceImpl.class);
        SiteServiceImpl siteService = SpringUtil.getBean(SiteServiceImpl.class);
        VmServiceImpl vmService = SpringUtil.getBean(VmServiceImpl.class);

        clusterService.deleteAll();
        hostService.deleteAll();
        siteService.deleteAll();
        monitorCnaInfoService.deleteAll();
        monitorVmInfoService.deleteAll();
        vmService.deleteAll();
        return RetCode.OK;
    }
}
