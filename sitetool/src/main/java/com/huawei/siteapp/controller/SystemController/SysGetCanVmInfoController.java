package com.huawei.siteapp.controller.SystemController;

import com.huawei.siteapp.bean.HostInfoBean;
import com.huawei.siteapp.bean.HostVmReportInfoBean;
import com.huawei.siteapp.bean.Result;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.model.SiteModel;
import com.huawei.siteapp.repository.SiteRepository;
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
        logger.info("@@@@@@@    SysGetCanVmInfoController getCanVmInfo");
        SiteRepository siteRepository = SpringUtil.getBean(SiteRepository.class);

        List<SiteModel> siteModels = (List<SiteModel>) siteRepository.findAll();
        SiteModel siteModel = siteRepository.findSiteModelBySiteRegionNameAndSiteRegionAndSiteLoginIp(siteRegionName, siteRegion, siteLoginIp);



        Result result = new Result();

        int retCode = 200;
        result.setStatus(retCode);
        result.setMsg("OK");
        result.setData(body());
        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/getVmInfo/{siteRegionName}", method = RequestMethod.GET)
    public Result getVmInfo(@PathVariable String siteRegionName, @RequestParam String siteRegion, @RequestParam String siteLoginIp) {
        logger.info("@@@@@@@@@@  SysGetCanVmInfoController getCanVmInfo");
        SiteRepository siteRepository = SpringUtil.getBean(SiteRepository.class);

        SiteModel siteModel = siteRepository.findSiteModelBySiteRegionNameAndSiteRegionAndSiteLoginIp(siteRegionName, siteRegion, siteLoginIp);


        return null;
    }

    //    接口测试
    private HostVmReportInfoBean body() {
        List<HostInfoBean> hostInfoBeans = new ArrayList<>();
        HostVmReportInfoBean hostVmReportInfoBean = new HostVmReportInfoBean(hostInfoBeans);
        hostVmReportInfoBean.setHostOrVm(0);
        hostVmReportInfoBean.setMonitorUsedCpu(23);
        hostVmReportInfoBean.setMonitorUsedMem(54);
        hostVmReportInfoBean.setTime("2017-07-11 171326_2017-07-11 171526");

        int total = 10;
        hostVmReportInfoBean.setTotal(total);

        for (int i = 0; i < total; i++) {
            HostInfoBean hostInfoBean = new HostInfoBean();
            hostInfoBean.setHostName("host_CNA" + i);
            hostInfoBean.setMonitorUsedCpu(80 + i);
            hostInfoBean.setMonitorTotalCpu(100 + i);
            hostInfoBean.setMonitorCpuUsage("2" + i);

            hostInfoBean.setMonitorUsedMem(700 + i);
            hostInfoBean.setMonitorTotalMem(1000 + i);
            hostInfoBean.setMonitorMemUsage("7" + i);

            hostInfoBean.setClusterName("Cluster_Manger" + i);
            hostInfoBean.setHostIp("10.22.33.4" + i);

            hostInfoBeans.add(hostInfoBean);
        }

        return hostVmReportInfoBean;
    }

}
