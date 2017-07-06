package com.huawei.siteapp.service.Task;

import com.huawei.siteapp.common.Bean.SiteLoginRestBean;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.service.ModelService.Impl.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

/**
 * Created by z00390414 on 2017/6/28.
 *
 * @version 1.0
 */
@Component
public class TaskServiceImpl {

    @Async
    public void doTaskTwo(String param) throws InterruptedException {
        System.out.println("开始执行任务二");
        long start = System.currentTimeMillis();

//        Thread.sleep(random.nextInt(10000));
        System.out.print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$" + param);
        long end = System.currentTimeMillis();
        System.out.println("完成任务二，耗时：" + (end - start) + "毫秒");
    }

    @Async
    public void doTaaskThree() throws InterruptedException {
    }

    private SiteLoginRestBean setRestBeanIp(String ip) {
        SiteLoginRestBean siteLoginRestBean = new SiteLoginRestBean();
        siteLoginRestBean.setVrmIp(ip);
        siteLoginRestBean.setRestPort("7070");
        return siteLoginRestBean;
    }

    public int clearDbAllData() {
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

    public int clearDbMonitorData() {
        MonitorCnaInfoServiceImpl monitorCnaInfoService = SpringUtil.getBean(MonitorCnaInfoServiceImpl.class);
        MonitorVmInfoServiceImpl monitorVmInfoService = SpringUtil.getBean(MonitorVmInfoServiceImpl.class);
        VmServiceImpl vmService = SpringUtil.getBean(VmServiceImpl.class);

        monitorCnaInfoService.deleteAll();
        monitorVmInfoService.deleteAll();
        vmService.deleteAll();
        return RetCode.OK;
    }
}
