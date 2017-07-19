package com.huawei.siteapp.controller.SystemController;

import com.huawei.siteapp.bean.HostVmReportInfoBean;
import com.huawei.siteapp.bean.Result;
import com.huawei.siteapp.bean.VmInfoBean;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.model.SiteModel;
import com.huawei.siteapp.repository.SiteRepository;
import com.huawei.siteapp.service.Http.MonitorAllVmsServiceImpl;
import com.huawei.siteapp.service.Http.MonitorCnaServiceImpl;
import com.huawei.siteapp.service.Task.TaskServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by z00390414 on 2017/7/12.
 *
 * @version 1.0
 */
@RestController
public class SysGetCanVmInfoController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @ResponseBody
    @RequestMapping(value = "/getCanInfo/{siteRegionName}", method = RequestMethod.GET)
    public Result getCanInfo(@PathVariable String siteRegionName, @RequestParam String siteRegion, @RequestParam String siteLoginIp) {
        logger.info("@@@@@@@    SysGetCanVmInfoController getCanInfo");
        Result result = new Result();
        int retCode = RetCode.OK;
        SiteRepository siteRepository = SpringUtil.getBean(SiteRepository.class);
        SiteModel siteModel = siteRepository.findSiteModelBySiteRegionNameAndSiteRegionAndSiteLoginIp(siteRegionName, siteRegion, siteLoginIp);


        if (null == siteModel) {
            logger.error("SiteRegionName siteRegion siteLoginIp not find in sites");
            result.setStatus(400);
            result.setMsg("SiteRegionName siteRegion siteLoginIp not find in sites");
            return result;
        }
        TaskServiceImpl taskService = SpringUtil.getBean(TaskServiceImpl.class);
        taskService.clearDbMonitorData();

        MonitorAllVmsServiceImpl monitorAllVmsService = SpringUtil.getBean(MonitorAllVmsServiceImpl.class);
        retCode = monitorAllVmsService.fcGetSitesClustersHostsAllVrmRest(siteModel);

        MonitorCnaServiceImpl monitorsService = SpringUtil.getBean(MonitorCnaServiceImpl.class);
        int retCode2 = monitorsService.fcPostSitesClustersHostsCpuMemRest(siteModel);

        HostVmReportInfoBean hostVmReportInfoBean = monitorsService.getResponseBody(siteModel);


        if (200 != retCode || 200 != retCode2) {
            retCode = 400;
        }

        result.setStatus(retCode);
        result.setMsg("OK");
        result.setData(hostVmReportInfoBean);
        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/getVmInfo/{siteRegionName}", method = RequestMethod.GET)
    public Result getVmInfo(@PathVariable String siteRegionName, @RequestParam String siteRegion, @RequestParam String siteLoginIp) {
        logger.info("@@@@@@@@@@  SysGetCanVmInfoController getCanVmInfo");
        SiteRepository siteRepository = SpringUtil.getBean(SiteRepository.class);
        int retCode = RetCode.OK;
        Result result = new Result();
//        SiteModel siteModel = siteRepository.findSiteModelBySiteRegionNameAndSiteRegionAndSiteLoginIp(siteRegionName, siteRegion, siteLoginIp);
//
//        MonitorAllVmsServiceImpl monitorAllVmsService = SpringUtil.getBean(MonitorAllVmsServiceImpl.class);
//        retCode = monitorAllVmsService.fcGetSitesClustersHostsAllVrmRest(siteModel);

        result.setStatus(retCode);
        result.setMsg("OK");
        result.setData(body());
        return result;
    }

    //    接口测试
    private HostVmReportInfoBean body() {
        List<VmInfoBean> hostInfoBeans = new ArrayList<>();
        HostVmReportInfoBean hostVmReportInfoBean = new HostVmReportInfoBean(hostInfoBeans);
        hostVmReportInfoBean.setHostOrVm(0);
//        hostVmReportInfoBean.setMonitorCpuUsage(23);
//        hostVmReportInfoBean.setMonitorMemUsage(54);
        hostVmReportInfoBean.setTime("2017-07-11 171326_2017-07-11 171526");

        int total = 5;
        hostVmReportInfoBean.setTotal(total);

        for (int i = 0; i < total; i++) {
            VmInfoBean vmInfoBean = new VmInfoBean();
            vmInfoBean.setHostName("host_CNA" + i);
            vmInfoBean.setMonitorUsedCpu(80 + i);
            vmInfoBean.setMonitorTotalCpu(100 + i);
            vmInfoBean.setMonitorCpuUsage("2" + i);

            vmInfoBean.setMonitorUsedMem(700 + i);
            vmInfoBean.setMonitorTotalMem(1000 + i);
            vmInfoBean.setMonitorMemUsage("7" + i);

            vmInfoBean.setClusterName("Cluster_Manger" + i);
            vmInfoBean.setVmName("vmName"+i);
            vmInfoBean.setVmUrn("urn is "+i);
            vmInfoBean.setVmCreateTime("create time is "+i);
            vmInfoBean.setTemplate(false);

            hostInfoBeans.add(vmInfoBean);
        }

        return hostVmReportInfoBean;
    }
}
