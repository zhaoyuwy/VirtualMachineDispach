package com.huawei.siteapp.service.Http;

import com.huawei.siteapp.bean.HostVmReportInfoBean;
import com.huawei.siteapp.common.Bean.SiteLoginRestBean;
import com.huawei.siteapp.common.constats.ParamKey;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.*;
import com.huawei.siteapp.model.HostModel;
import com.huawei.siteapp.model.MonitorCnaInfoModel;
import com.huawei.siteapp.model.SiteModel;
import com.huawei.siteapp.repository.HostRepository;
import com.huawei.siteapp.service.ExcelService.HostReportServiceImpl;
import com.huawei.siteapp.service.ModelService.IMonitorCnaInfoService;
import com.huawei.siteapp.service.ModelService.Impl.HostServiceImpl;
import net.sf.json.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by z00390414 on 2017/6/27.
 *
 * @version 1.0
 */
@Service
public class MonitorCnaServiceImpl {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource(name = "monitorCnaInfoService")
    IMonitorCnaInfoService monitorCpuMemService;

    @Resource
    HttpRestServiceImpl httpRestService;

    public int fcPostSitesClustersHostsCpuMemRest(SiteLoginRestBean restInfo) {
        logger.info("Enter MonitorCnaServiceImpl fcPostSitesClustersHostsCpuMemRest");

        String[] urlParm = new String[]{restInfo.getSiteLoginIp(), restInfo.getRestPort(), restInfo.getRestSiteUri()};
        String url = PropertiesUtils.getUrl("FcPostHostsCpuMem", urlParm);

        HostServiceImpl service = SpringUtil.getBean(HostServiceImpl.class);
        Iterable<HostModel> hosts = service.findAll();

        JSONArray cpuMems = new JSONArray();
        hosts.forEach(host -> {
            String hostUrn = host.getHostUrn();
            cpuMems.add(CommonUtils.getSendCpuMemInfo(hostUrn));
        });

        ServiceContext responseCxt = null;
        try {
            responseCxt = httpRestService.sendPost(url, cpuMems.toString());
        } catch (Exception e) {
            logger.error("Post exception", e);
        }
        String restResponse = (String) responseCxt.get(ParamKey.REST_RESPONSE);
//        String restResponse = "{\"result\":\"0\",\"total\":22,\"items\":[{\"urn\":\"urn:sites:43DA092B:hosts:163\",\"objectName\":\"OM_CNA01\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"15.17\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"18.42\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:11447\",\"objectName\":\"OM_CNA02\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"11.18\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"16.44\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:11486\",\"objectName\":\"OM_CNA03\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"19.39\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"16.65\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:11490\",\"objectName\":\"OM_CNA04\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"0.91\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"12.63\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:330\",\"objectName\":\"OM_CNA05\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"26.09\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"18.58\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:671\",\"objectName\":\"OM_CNA06\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"15.78\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"25.20\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:672\",\"objectName\":\"OM_CNA07\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"36.22\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"27.56\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:673\",\"objectName\":\"OM_CNA08\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"23.68\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"31.83\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:674\",\"objectName\":\"OM_CNA09\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"25.63\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"29.95\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:175\",\"objectName\":\"OM_CNA10\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"26.81\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"15.41\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:675\",\"objectName\":\"OM_CNA11\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"15.10\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"19.39\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:676\",\"objectName\":\"OM_CNA12\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"16.64\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"18.92\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:677\",\"objectName\":\"OM_CNA13\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"13.92\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"17.12\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:678\",\"objectName\":\"OM_CNA14\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"12.86\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"18.05\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:679\",\"objectName\":\"OM_CNA15\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"26.01\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"17.98\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:11735\",\"objectName\":\"OM_CNA16\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"2.55\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"2.04\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:11749\",\"objectName\":\"OM_CNA17\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"1.61\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"3.44\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:19306\",\"objectName\":\"OM_CNA18\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"6.31\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"22.36\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:19330\",\"objectName\":\"OM_CNA19\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"7.16\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"24.94\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:19342\",\"objectName\":\"OM_CNA20\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"6.98\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"12.10\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:19571\",\"objectName\":\"OM_CNA21\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"9.10\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"21.99\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:23977\",\"objectName\":\"OM_CNA22\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"2.01\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"6.40\"}]}]}";


        int total = (Integer) (JSONUtils.jsonToMap(restResponse).get("total"));
        logger.info("total hosts = " + total);
        List<MonitorCnaInfoModel> monitorCpuMems = new ArrayList<>();

        for (Object itemTemp : ((List<Object>) (JSONUtils.jsonToMap(restResponse).get("items")))) {
            MonitorCnaInfoModel monitorCpuMem = new MonitorCnaInfoModel();

            String urn = ((Map<String, String>) itemTemp).get(ParamKey.URN);
            monitorCpuMem.setMonitorObjectUrn(urn);

            String objectName = ((Map<String, String>) itemTemp).get("objectName");

            monitorCpuMem.setMonitorObjectName(objectName);

            for (HostModel host : hosts) {
                if (host.getHostUrn().equals(urn)) {
                    int hostCpuTotal = host.getHostTotalSizeMHz();
                    int hostMemTotal = host.getHostTotalSizeMB();
                    monitorCpuMem.setMonitorTotalCpu(hostCpuTotal);
                    monitorCpuMem.setMonitorTotalMem(hostMemTotal);
                    break;
                }
            }

            Object cpuMemUsage = ((Map<String, String>) itemTemp).get("value");
            String memUsage = null;
            String cpuUsage = null;
            for (Object aCpuMemUsage : (List<Object>) cpuMemUsage) {
                Map<String, String> aCpuMem = (Map<String, String>) aCpuMemUsage;


                if (aCpuMem.containsValue("cpu_usage")) {
                    cpuUsage = aCpuMem.get("metricValue");
                    cpuUsage = CommonUtils.isNull(cpuUsage) ? "0" : cpuUsage;
                    monitorCpuMem.setMonitorCpuUsage(cpuUsage);
                }

                if (aCpuMem.containsValue("mem_usage")) {
                    memUsage = aCpuMem.get("metricValue");
                    memUsage = CommonUtils.isNull(memUsage) ? "0" : memUsage;
                    monitorCpuMem.setMonitorMemUsage(memUsage);
                }
            }

            double usedMem = Double.parseDouble(memUsage) * monitorCpuMem.getMonitorTotalMem();
            double usedCpu = Double.parseDouble(cpuUsage) * monitorCpuMem.getMonitorTotalCpu();

            monitorCpuMem.setMonitorUsedMem((int) usedMem);

            monitorCpuMem.setMonitorUsedCpu((int) usedCpu);

            monitorCpuMem.setTime(UctTimeUtil.getCurrentDate());

            monitorCpuMems.add(monitorCpuMem);
        }
        monitorCpuMemService.save(monitorCpuMems);

        return RetCode.OK;
    }

    public int fcPostSitesClustersHostsCpuMemRest(SiteModel siteModel) {
        logger.info("Enter MonitorCnaServiceImpl fcPostSitesClustersHostsCpuMemRest");

        SiteLoginHttpRequestServiceImpl siteLoginHttpRequest = SpringUtil.getBean(SiteLoginHttpRequestServiceImpl.class);
        int retCode = siteLoginHttpRequest.fcLoginRest(siteModel);

        if (RetCode.OK!=retCode){
            logger.error("SiteModel siteUser login fail"+siteModel);
            return retCode;
        }

        String[] urlParm = new String[]{siteModel.getSiteLoginIp(), PropertiesUtils.get("FC_PORT"), siteModel.getSiteUri()};
        String url = PropertiesUtils.getUrl("FcPostHostsCpuMem", urlParm);

//        Iterable<HostModel> hosts = service.findAll();
        HostRepository hostRepository = SpringUtil.getBean(HostRepository.class);
        List<HostModel> hosts = hostRepository.findHostModelsBySiteId(siteModel.getSiteId());

        JSONArray cpuMems = new JSONArray();
        hosts.forEach(host -> {
            String hostUrn = host.getHostUrn();
            cpuMems.add(CommonUtils.getSendCpuMemInfo(hostUrn));
        });

        ServiceContext responseCxt = null;
        try {
            responseCxt = httpRestService.sendPost(url, cpuMems.toString());
        } catch (Exception e) {
            logger.error("Post exception", e);
        }
        String restResponse = (String) responseCxt.get(ParamKey.REST_RESPONSE);
//        String restResponse = "{\"result\":\"0\",\"total\":22,\"items\":[{\"urn\":\"urn:sites:43DA092B:hosts:163\",\"objectName\":\"OM_CNA01\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"15.17\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"18.42\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:11447\",\"objectName\":\"OM_CNA02\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"11.18\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"16.44\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:11486\",\"objectName\":\"OM_CNA03\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"19.39\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"16.65\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:11490\",\"objectName\":\"OM_CNA04\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"0.91\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"12.63\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:330\",\"objectName\":\"OM_CNA05\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"26.09\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"18.58\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:671\",\"objectName\":\"OM_CNA06\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"15.78\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"25.20\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:672\",\"objectName\":\"OM_CNA07\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"36.22\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"27.56\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:673\",\"objectName\":\"OM_CNA08\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"23.68\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"31.83\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:674\",\"objectName\":\"OM_CNA09\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"25.63\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"29.95\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:175\",\"objectName\":\"OM_CNA10\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"26.81\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"15.41\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:675\",\"objectName\":\"OM_CNA11\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"15.10\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"19.39\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:676\",\"objectName\":\"OM_CNA12\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"16.64\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"18.92\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:677\",\"objectName\":\"OM_CNA13\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"13.92\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"17.12\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:678\",\"objectName\":\"OM_CNA14\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"12.86\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"18.05\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:679\",\"objectName\":\"OM_CNA15\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"26.01\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"17.98\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:11735\",\"objectName\":\"OM_CNA16\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"2.55\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"2.04\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:11749\",\"objectName\":\"OM_CNA17\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"1.61\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"3.44\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:19306\",\"objectName\":\"OM_CNA18\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"6.31\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"22.36\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:19330\",\"objectName\":\"OM_CNA19\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"7.16\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"24.94\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:19342\",\"objectName\":\"OM_CNA20\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"6.98\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"12.10\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:19571\",\"objectName\":\"OM_CNA21\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"9.10\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"21.99\"}]},{\"urn\":\"urn:sites:43DA092B:hosts:23977\",\"objectName\":\"OM_CNA22\",\"value\":[{\"unit\":\"%\",\"metricId\":\"cpu_usage\",\"metricValue\":\"2.01\"},{\"unit\":\"%\",\"metricId\":\"mem_usage\",\"metricValue\":\"6.40\"}]}]}";


        int total = (Integer) (JSONUtils.jsonToMap(restResponse).get("total"));
        logger.info("total hosts = " + total);
        List<MonitorCnaInfoModel> monitorCpuMems = new ArrayList<>();

        for (Object itemTemp : ((List<Object>) (JSONUtils.jsonToMap(restResponse).get("items")))) {
            MonitorCnaInfoModel monitorCpuMem = new MonitorCnaInfoModel();

            monitorCpuMem.setSiteId(siteModel.getSiteId());
            String urn = ((Map<String, String>) itemTemp).get(ParamKey.URN);
            monitorCpuMem.setMonitorObjectUrn(urn);

            String objectName = ((Map<String, String>) itemTemp).get("objectName");

            monitorCpuMem.setMonitorObjectName(objectName);

            for (HostModel host : hosts) {
                if (host.getHostUrn().equals(urn)) {
                    int hostCpuTotal = host.getHostTotalSizeMHz();
                    int hostMemTotal = host.getHostTotalSizeMB();
                    monitorCpuMem.setMonitorTotalCpu(hostCpuTotal);
                    monitorCpuMem.setMonitorTotalMem(hostMemTotal);
                    break;
                }
            }

            Object cpuMemUsage = ((Map<String, String>) itemTemp).get("value");
            String memUsage = null;
            String cpuUsage = null;
            for (Object aCpuMemUsage : (List<Object>) cpuMemUsage) {
                Map<String, String> aCpuMem = (Map<String, String>) aCpuMemUsage;


                if (aCpuMem.containsValue("cpu_usage")) {
                    cpuUsage = aCpuMem.get("metricValue");
                    cpuUsage = CommonUtils.isNull(cpuUsage) ? "0" : cpuUsage;
                    monitorCpuMem.setMonitorCpuUsage(cpuUsage);
                }

                if (aCpuMem.containsValue("mem_usage")) {
                    memUsage = aCpuMem.get("metricValue");
                    memUsage = CommonUtils.isNull(memUsage) ? "0" : memUsage;
                    monitorCpuMem.setMonitorMemUsage(memUsage);
                }
            }

            double usedMem = Double.parseDouble(memUsage) * monitorCpuMem.getMonitorTotalMem();
            double usedCpu = Double.parseDouble(cpuUsage) * monitorCpuMem.getMonitorTotalCpu();

            monitorCpuMem.setMonitorUsedMem((int) usedMem);

            monitorCpuMem.setMonitorUsedCpu((int) usedCpu);

            monitorCpuMem.setTime(UctTimeUtil.getCurrentDate());
            monitorCpuMem.setSiteId(siteModel.getSiteId());
            monitorCpuMems.add(monitorCpuMem);
        }
        monitorCpuMemService.save(monitorCpuMems);

        return RetCode.OK;
    }

    public HostVmReportInfoBean getResponseBody(SiteModel siteModel) {
        int retCode = RetCode.INIT_ERROR;
        HostReportServiceImpl hostReportServiceImpl = SpringUtil.getBean(HostReportServiceImpl.class);

        return hostReportServiceImpl.getResponseBody(siteModel);

    }


}
