package com.huawei.siteapp.service.ModelService.Impl;

import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.CommonUtils;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.model.MonitorCnaInfoModel;
import com.huawei.siteapp.model.PeriodTaskModel;
import com.huawei.siteapp.model.SiteModel;
import com.huawei.siteapp.repository.BaseRepository;
import com.huawei.siteapp.repository.PeriodTaskRepository;
import com.huawei.siteapp.repository.SiteRepository;
import com.huawei.siteapp.service.ExcelService.HostReportServiceImpl;
import com.huawei.siteapp.service.Http.MonitorAllVmsServiceImpl;
import com.huawei.siteapp.service.Http.MonitorCnaServiceImpl;
import com.huawei.siteapp.service.ModelService.IPeriodTaskService;
import com.huawei.siteapp.service.Task.TaskServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * Created by z00390414 on 2017/7/14.
 *
 * @version 1.0
 */
@Repository("periodTaskService")
public class PeriodTaskServiceImpl extends BaseServiceImpl<PeriodTaskModel> implements IPeriodTaskService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource(name = "periodTaskRepository")
    public void setRepository(BaseRepository<PeriodTaskModel> dao) {
        super.setRepository(dao);
    }

    public PeriodTaskModel findPeriodTaskModelByPeriodTaskId(long periodTaskId) {
        PeriodTaskRepository periodTaskRepository = SpringUtil.getBean(PeriodTaskRepository.class);
        return periodTaskRepository.findPeriodTaskModelByPeriodTaskId(periodTaskId);
    }

    @Override
    public PeriodTaskModel findPeriodTaskModelBySiteRegionNameAndSiteRegionAndSiteLoginIp(String siteRegionName, String siteRegion, String siteLoginIp) {
        PeriodTaskRepository periodTaskRepository = SpringUtil.getBean(PeriodTaskRepository.class);
        return periodTaskRepository.findPeriodTaskModelBySiteRegionNameAndSiteRegionAndSiteLoginIp(siteRegionName, siteRegion, siteLoginIp);
    }

    public void taskHandle(PeriodTaskModel periodTaskModel) {
        String periodTime = periodTaskModel.getPeriodTime();
        int taskType = periodTaskModel.getTaskType();
        int retCode = RetCode.OK;
        if (0 == taskType) {
            String[] splitTime = periodTime.split(" ");
            String[] byDay = (splitTime[0]).split(",");
            String[] hourMin = (splitTime[1]).split("_");
            Date dateNow = new Date();

//            Date setDate = new Date(dateNow.getYear(), dateNow.getMonth(), Integer.parseInt(byDay[5]), Integer.parseInt(hourMin[0]), Integer.parseInt(hourMin[1]));

//            if (dateNow.after(setDate)) {
                logger.info("task begin");

                TaskServiceImpl taskService = SpringUtil.getBean(TaskServiceImpl.class);
                taskService.clearDbMonitorData();
                SiteRepository siteRepository = SpringUtil.getBean(SiteRepository.class);
                SiteModel siteModel = siteRepository.findOne(periodTaskModel.getSiteId());


                MonitorAllVmsServiceImpl monitorAllVmsService = SpringUtil.getBean(MonitorAllVmsServiceImpl.class);
                retCode = monitorAllVmsService.fcGetSitesClustersHostsAllVrmRest(siteModel);

                MonitorCnaServiceImpl monitorsService = SpringUtil.getBean(MonitorCnaServiceImpl.class);
                int retCode2 = monitorsService.fcPostSitesClustersHostsCpuMemRest(siteModel);


                MonitorCnaInfoServiceImpl monitorCpuMemService = SpringUtil.getBean(MonitorCnaInfoServiceImpl.class);
                Iterable<MonitorCnaInfoModel> hosts = monitorCpuMemService.findAll();
                HostReportServiceImpl hostReportServiceImpl = SpringUtil.getBean(HostReportServiceImpl.class);
                try {
                    retCode = hostReportServiceImpl.poiTemplate(CommonUtils.getTestReportName(), (List<MonitorCnaInfoModel>) hosts);
                } catch (Exception e) {
                    logger.error("",e);
                }

                logger.info("PeriodTaskServiceImpl taskHandle "+retCode);
            }

//        } else {
//
//        }

    }
}
