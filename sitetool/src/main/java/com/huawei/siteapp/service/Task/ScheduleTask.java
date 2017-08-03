package com.huawei.siteapp.service.Task;

import com.huawei.siteapp.cache.CacheCenter;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.CommonUtils;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.model.MonitorCnaInfoModel;
import com.huawei.siteapp.model.PeriodTaskModel;
import com.huawei.siteapp.model.SiteModel;
import com.huawei.siteapp.repository.MonitorCnaInfoRepository;
import com.huawei.siteapp.repository.PeriodTaskRepository;
import com.huawei.siteapp.repository.SiteRepository;
import com.huawei.siteapp.service.ExcelService.HostReportServiceImpl;
import com.huawei.siteapp.service.Http.MonitorAllVmsServiceImpl;
import com.huawei.siteapp.service.Http.MonitorCnaServiceImpl;
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

    @Scheduled(cron = "0 0 2 * * ?")
    void taskTest() {
        logger.info("#######################################################################");
        TaskServiceImpl taskService = SpringUtil.getBean(TaskServiceImpl.class);
        taskService.clearDbMonitorData();
        SiteRepository siteRepository = SpringUtil.getBean(SiteRepository.class);
        List<SiteModel> siteModels = (List<SiteModel>) siteRepository.findAll();
        int retCode = RetCode.INIT_ERROR;
        for (SiteModel siteModeTemp : siteModels) {
            logger.info(siteModeTemp.toString());
            MonitorAllVmsServiceImpl monitorAllVmsService = SpringUtil.getBean(MonitorAllVmsServiceImpl.class);
            retCode = monitorAllVmsService.fcGetSitesClustersHostsAllVrmRest(siteModeTemp);
            if (200 !=retCode){
                return ;
            }
            MonitorCnaServiceImpl monitorsService = SpringUtil.getBean(MonitorCnaServiceImpl.class);
            retCode = monitorsService.fcPostSitesClustersHostsCpuMemRest(siteModeTemp);

            if (200 !=retCode){
                return ;
            }
            MonitorCnaInfoRepository monitorCpuMemService = SpringUtil.getBean(MonitorCnaInfoRepository.class);
            Iterable<MonitorCnaInfoModel> hosts = monitorCpuMemService.findMonitorCnaInfoModelsBySiteId(siteModeTemp.getSiteId());
            HostReportServiceImpl hostReportServiceImpl = SpringUtil.getBean(HostReportServiceImpl.class);
            try {
                retCode = hostReportServiceImpl.poiTemplate(CommonUtils.getReportName(siteModeTemp), (List<MonitorCnaInfoModel>) hosts);
            } catch (Exception e) {
                logger.error("", e);
            }
        }
//        SiteModel siteModel = siteRepository.findOne((long) 2);




        logger.info("PeriodTaskServiceImpl taskHandle " + retCode);
    }

}
