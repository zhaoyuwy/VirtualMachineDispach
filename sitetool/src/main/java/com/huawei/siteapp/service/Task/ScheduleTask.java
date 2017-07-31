package com.huawei.siteapp.service.Task;

import com.huawei.siteapp.cache.CacheCenter;
import com.huawei.siteapp.common.util.CommonUtils;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.model.MonitorCnaInfoModel;
import com.huawei.siteapp.model.PeriodTaskModel;
import com.huawei.siteapp.model.SiteModel;
import com.huawei.siteapp.repository.PeriodTaskRepository;
import com.huawei.siteapp.repository.SiteRepository;
import com.huawei.siteapp.service.ExcelService.HostReportServiceImpl;
import com.huawei.siteapp.service.Http.MonitorAllVmsServiceImpl;
import com.huawei.siteapp.service.Http.MonitorCnaServiceImpl;
import com.huawei.siteapp.service.ModelService.Impl.MonitorCnaInfoServiceImpl;
import com.huawei.siteapp.service.ModelService.Impl.PeriodTaskServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;

/**
 * Created by z00390414 on 2017/6/15.
 *
 * @author z00390414
 * @version [版本号, 2017/6/15]
 */
@Component
public class ScheduleTask {

    protected final Logger logger = LoggerFactory.getLogger(this.getClass());
    private static int num = 0;
//    private static

    @Autowired
    DynamicScheduledTask dynamicScheduledTask;


    //        @Scheduled(cron = "0 0 2 * * ?")//每天凌晨两点执行
//    @Scheduled(cron = "0/10 * *  * * ? ")
    //每5秒执行一次
    void doSomethingWith() {
//        num++;
//        logger.info("Schedule task doSomethingWith begin. times =  " + num);
//        System.out.println("Schedule task doSomethingWith begin. times = " + num);
    }

    @PostConstruct
    public void InitLogin() {
        CacheCenter.getInstance().addUrlResponse("loginSuccess", false);
    }

    //    @Scheduled(fixedDelay = 5000)
    void setDynamicScheduledTask() {
        dynamicScheduledTask.setCron("0/10 * * * * ?");
    }

    //    @Scheduled(fixedDelay = 50000000)
//    @Scheduled(cron = "0 0/7 * * * ?")
    void taskStart() {
        logger.info("task period fifteen min begin times = " + num);
        num++;
        PeriodTaskServiceImpl periodTaskService = SpringUtil.getBean(PeriodTaskServiceImpl.class);

        PeriodTaskRepository periodTaskRepository = SpringUtil.getBean(PeriodTaskRepository.class);
//        PeriodTaskModel periodTaskModel = periodTaskRepository.findPeriodTaskModelByPeriodTaskId(51);
        List<PeriodTaskModel> periodTaskModels = (List<PeriodTaskModel>) periodTaskRepository.findAll();
        PeriodTaskModel periodTaskModel = periodTaskModels.get(0);
        periodTaskService.taskHandle(periodTaskModel);

    }

    @Scheduled(cron = "0 0/7 * * * ?")
    void taskTest() {
        logger.info("#######################################################################");
        TaskServiceImpl taskService = SpringUtil.getBean(TaskServiceImpl.class);
        taskService.clearDbMonitorData();
        SiteRepository siteRepository = SpringUtil.getBean(SiteRepository.class);
        SiteModel siteModel = siteRepository.findOne((long) 2);


        MonitorAllVmsServiceImpl monitorAllVmsService = SpringUtil.getBean(MonitorAllVmsServiceImpl.class);
        int retCode = monitorAllVmsService.fcGetSitesClustersHostsAllVrmRest(siteModel);

        MonitorCnaServiceImpl monitorsService = SpringUtil.getBean(MonitorCnaServiceImpl.class);
        int retCode2 = monitorsService.fcPostSitesClustersHostsCpuMemRest(siteModel);


        MonitorCnaInfoServiceImpl monitorCpuMemService = SpringUtil.getBean(MonitorCnaInfoServiceImpl.class);
        Iterable<MonitorCnaInfoModel> hosts = monitorCpuMemService.findAll();
        HostReportServiceImpl hostReportServiceImpl = SpringUtil.getBean(HostReportServiceImpl.class);
        try {
            retCode = hostReportServiceImpl.poiTemplate(CommonUtils.getTestReportName(), (List<MonitorCnaInfoModel>) hosts);
        } catch (Exception e) {
            logger.error("", e);
        }

        logger.info("PeriodTaskServiceImpl taskHandle " + retCode);
    }

}
