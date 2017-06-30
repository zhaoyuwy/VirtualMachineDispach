package com.huawei.siteapp.service.Task;

import com.huawei.siteapp.cache.CacheCenter;
import com.huawei.siteapp.common.Bean.RestBean;
import com.huawei.siteapp.common.constats.ParamKey;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.*;
import com.huawei.siteapp.model.MonitorCnaInfoModel;
import com.huawei.siteapp.model.MonitorVmInfoModel;
import com.huawei.siteapp.model.SiteModel;
import com.huawei.siteapp.service.ExcelService.HostReportServiceImpl;
import com.huawei.siteapp.service.Http.HttpRestServiceImpl;
import com.huawei.siteapp.service.Http.MonitorAllVmsServiceImpl;
import com.huawei.siteapp.service.Http.MonitorCnaServiceImpl;
import com.huawei.siteapp.service.ModelService.Impl.MonitorCnaInfoServiceImpl;
import com.huawei.siteapp.service.ModelService.Impl.MonitorVmInfoServiceImpl;
import com.huawei.siteapp.service.ModelService.Impl.SiteServiceImpl;
import net.sf.json.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

/**
 * Created by z00390414 on 2017/6/30.
 *
 * @version 1.0
 */
@Component
public class AsyncTaskServiceImpl {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
//    private static int testInt = 0;

    //    @Async  //加入"异步调用"注解
    public void asyncSaveVmInfoInDB(RestBean restInfo, String response) {
////        testInt++;
//
//        int a =0;
//        a++;
//        System.out.println("testInt = "+0);
//        System.out.println("a = "+a +" response = "+response);
//        return RetCode.OK;
        JSONArray vmInfos = new JSONArray();
        for (Object vmTemp : ((List<Object>) (JSONUtils.jsonToMap(response).get("vms")))) {
            String urn = ((Map<String, String>) vmTemp).get(ParamKey.URN);
            vmInfos.add(CommonUtils.getSendCpuMemInfo(urn));
        }
        String[] urlParm = new String[]{restInfo.getVrmIp(), restInfo.getRestPort(), (String) CacheCenter.getInstance().getRestBeanResponse(ParamKey.SITE_ID)};
        String url = PropertiesUtils.getUrl("FcPostHostsCpuMem", urlParm);
        HttpRestServiceImpl httpRestService = SpringUtil.getBean(HttpRestServiceImpl.class);
        ServiceContext responseCxt = null;
        try {
            responseCxt = httpRestService.sendPost(url, vmInfos.toString());
        } catch (Exception e) {
            logger.error("Post Exception",e);
        }
        String restResponse = (String) responseCxt.get(ParamKey.REST_RESPONSE);

        List<MonitorVmInfoModel> monitorVmInfoModels = new ArrayList<>();

        for (Object itemTemp : ((List<Object>) (JSONUtils.jsonToMap(restResponse).get("items")))) {
            MonitorVmInfoModel monitorCnaInfoModel = new MonitorVmInfoModel();

            String urn = ((Map<String, String>) itemTemp).get(ParamKey.URN);
            monitorCnaInfoModel.setMonitorObjectUrn(urn);

            String objectName = ((Map<String, String>) itemTemp).get("objectName");
            monitorCnaInfoModel.setMonitorObjectName(objectName);

//            hosts.forEach(host -> {
//                if(host.getHostUrn().equals(urn)) {
//                    int hostCpuTotal = host.getHostTotalSizeMHz();
//                    int hostMemTotal = host.getHostTotalSizeMB();
//                    monitorCpuMem.setMonitorTotalCpu(hostCpuTotal);
//                    monitorCpuMem.setMonitorTotalMem(hostMemTotal);
//                    return;
//                }
//            });

            Object cpuMemUsage = ((Map<String, String>) itemTemp).get("value");
            String memUsage = null;
            String cpuUsage = null;
            for (Object aCpuMemUsage : (List<Object>) cpuMemUsage) {
                Map<String, String> aCpuMem = (Map<String, String>) aCpuMemUsage;


                if (aCpuMem.containsValue("cpu_usage")) {
                    cpuUsage = aCpuMem.get("metricValue");
                    cpuUsage = CommonUtils.isNull(cpuUsage) ? "0" : cpuUsage;
                    monitorCnaInfoModel.setMonitorCpuUsage(cpuUsage);
                }

                if (aCpuMem.containsValue("mem_usage")) {
                    memUsage = aCpuMem.get("metricValue");
                    memUsage = CommonUtils.isNull(memUsage) ? "0" : memUsage;
                    monitorCnaInfoModel.setMonitorMemUsage(memUsage);
                }
            }

            double usedMem = Double.parseDouble(memUsage) * monitorCnaInfoModel.getMonitorTotalMem();
            double usedCpu = Double.parseDouble(cpuUsage) * monitorCnaInfoModel.getMonitorTotalCpu();

            monitorCnaInfoModel.setMonitorUsedMem((int) usedMem);

            monitorCnaInfoModel.setMonitorUsedCpu((int) usedCpu);

            monitorCnaInfoModel.setTime(UctTimeUtil.getCurrentDate());

            monitorVmInfoModels.add(monitorCnaInfoModel);
        }
        MonitorVmInfoServiceImpl monitorVmInfoService = SpringUtil.getBean(MonitorVmInfoServiceImpl.class);
        monitorVmInfoService.save(monitorVmInfoModels);
    }

    @Async
    public CompletableFuture<SiteModel> findUser(String user) throws InterruptedException {
//        logger.info("Looking up " + user);
//        String url = String.format("https://api.github.com/users/%s", user);
        SiteServiceImpl siteService = SpringUtil.getBean(SiteServiceImpl.class);
        SiteModel results = siteService.findOne((long) 1);
        // Artificial delay of 1s for demonstration purposes
        Thread.sleep(1000L);
        return CompletableFuture.completedFuture(results);
    }


    public void asyncGenerateHostReport() {
        MonitorCnaServiceImpl monitorsService = SpringUtil.getBean(MonitorCnaServiceImpl.class);
        RestBean restBean = (RestBean) CacheCenter.getInstance().getRestBeanResponse("restBean");
        monitorsService.fcPostSitesClustersHostsCpuMemRest(restBean);
        int retCode = RetCode.INIT_ERROR;
        try {
//            retCode = hostReportServiceImpl.hostReportSaveDataToExcel(username + "_" + ip + "_" + UctTimeUtil.getCurrentDate("yyyy_MM_dd_HH_mm_ss"));
            MonitorCnaInfoServiceImpl monitorCpuMemService = SpringUtil.getBean(MonitorCnaInfoServiceImpl.class);
//            HostReportServiceImpl hostReportService = SpringUtil.getBean(HostReportServiceImpl.class);
            Iterable<MonitorCnaInfoModel> hosts = monitorCpuMemService.findAll();
            HostReportServiceImpl hostReportServiceImpl = SpringUtil.getBean(HostReportServiceImpl.class);
            retCode = hostReportServiceImpl.poiTemplate(UctTimeUtil.getCurrentDate(), (List<MonitorCnaInfoModel>) hosts);
        } catch (Exception e) {
            logger.error("This is report Exception", e);
        }
    }

    public void asyncGenerateVmReport(){
        MonitorAllVmsServiceImpl monitorAllVmsService = SpringUtil.getBean(MonitorAllVmsServiceImpl.class);
        int retCode = monitorAllVmsService.fcGetSitesClustersHostsAllVrmRest((RestBean) CacheCenter.getInstance().getRestBeanResponse("restBean"));

    }
}
