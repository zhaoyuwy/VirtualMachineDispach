package com.huawei.siteapp.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.huawei.siteapp.bean.Result;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.CommonUtils;
import com.huawei.siteapp.common.util.JSONUtils;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.common.util.UctTimeUtil;
import com.huawei.siteapp.model.MonitorCnaInfoModel;
import com.huawei.siteapp.model.MonitorVmInfoModel;
import com.huawei.siteapp.model.PeriodTaskModel;
import com.huawei.siteapp.model.SiteModel;
import com.huawei.siteapp.repository.SiteRepository;
import com.huawei.siteapp.service.ExcelService.HostReportServiceImpl;
import com.huawei.siteapp.service.ExcelService.VmReportServiceImpl;
import com.huawei.siteapp.service.ModelService.Impl.MonitorCnaInfoServiceImpl;
import com.huawei.siteapp.service.ModelService.Impl.MonitorVmInfoServiceImpl;
import com.huawei.siteapp.service.ModelService.Impl.PeriodTaskServiceImpl;
import com.huawei.siteapp.service.Task.AsyncTaskServiceImpl;
import com.huawei.siteapp.service.Task.TaskServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by z00390414 on 2017/6/28.
 *
 * @version 1.0
 */
@RestController
@RequestMapping(value = "task", produces = "application/json")
public class PeriodTaskController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private TaskServiceImpl TASK;

    @Autowired
    private AsyncTaskServiceImpl asyncTaskService;


    @ResponseBody
    @RequestMapping("/vmReport")
    public int vmReport() throws Exception {
        int retCode = RetCode.INIT_ERROR;
        try {
            MonitorVmInfoServiceImpl monitorVmInfoService = SpringUtil.getBean(MonitorVmInfoServiceImpl.class);
            Iterable<MonitorVmInfoModel> vms = monitorVmInfoService.findAll();
            VmReportServiceImpl vmReportService = SpringUtil.getBean(VmReportServiceImpl.class);
            retCode = vmReportService.poiVmTemplate("vms_" + UctTimeUtil.getCurrentDate(), (List<MonitorVmInfoModel>) vms);
        } catch (Exception e) {
            logger.error("Generate vmReport Exception", e);
        }
        return retCode;
    }

    @ResponseBody
    @RequestMapping("/hostReport")
    public int hostReport() throws Exception {
        int retCode = RetCode.INIT_ERROR;
        try {
            MonitorCnaInfoServiceImpl monitorCpuMemService = SpringUtil.getBean(MonitorCnaInfoServiceImpl.class);
            Iterable<MonitorCnaInfoModel> hosts = monitorCpuMemService.findAll();
            HostReportServiceImpl hostReportServiceImpl = SpringUtil.getBean(HostReportServiceImpl.class);
            retCode = hostReportServiceImpl.poiTemplate(CommonUtils.getTestReportName(), (List<MonitorCnaInfoModel>) hosts);
        } catch (Exception e) {
            logger.error("Generate hostReport Exception", e);
        }
        return retCode;
    }


    @RequestMapping(value = "/savePeriodTask", method = RequestMethod.POST)
    @ResponseBody
    public Result postSavePeriodTask(HttpServletRequest request) {

        int retCode = RetCode.INIT_ERROR;
//        String param = "{\"total\":1,\"tasks\":[{\"regions\":[{\"evName\":\"langfang\",\"siteNum\":2,\"sites\":[{\"siteRegionName\":\"langfang\",\"siteRegion\":\"dmz\",\"siteLoginIp\":\"10.44.33.245\",\"taskName\":\"taskByDay\",\"taskType\":0,\"isSendEmail\":false,\"periodTime\":\"0，1，2，3，4，5，31 22_30\"},{\"siteRegionName\":\"langfang\",\"siteRegion\":\"pub\",\"siteLoginIp\":\"10.44.70.245\",\"taskName\":\"taskByWeek\",\"taskType\":1,\"isSendEmail\":true,\"periodTime\":\"0，1， 2，3，4，5，6 22_30\"}]}]}]}";
        String jsonRst = JSONUtils.jsonToServiceContext(request);
        Object object = JSON.parse(jsonRst);
        JSONObject jsonObjectPeriodTask = (JSONObject) ((JSONArray) ((JSONObject) ((List) ((JSONObject) ((JSONArray) ((JSONObject) object).get("tasks")).get(0)).get("regions")).get(0)).get("sites")).get(0);

//        ((JSONArray)((JSONObject)((List)((JSONObject) object).get("tasks")).get(0)).get("regions")).get(0)

        String siteRegionName = jsonObjectPeriodTask.getString("siteRegionName");
        String siteRegion = jsonObjectPeriodTask.getString("siteRegion");
        String siteLoginIp = jsonObjectPeriodTask.getString("siteLoginIp");

        SiteRepository siteRepository = SpringUtil.getBean(SiteRepository.class);
        SiteModel siteModel = siteRepository.findSiteModelBySiteRegionNameAndSiteRegionAndSiteLoginIp(siteRegionName, siteRegion, siteLoginIp);


        PeriodTaskModel periodTaskModel = new PeriodTaskModel();
        periodTaskModel.setSiteRegionName(siteRegionName);
        periodTaskModel.setSiteRegion(siteRegion);
        periodTaskModel.setSiteLoginIp(siteLoginIp);
        periodTaskModel.setTaskName(jsonObjectPeriodTask.getString("taskName"));
        periodTaskModel.setPeriodTime(jsonObjectPeriodTask.getString("periodTime"));
        periodTaskModel.setSendEmail(jsonObjectPeriodTask.getBoolean("isSendEmail"));
        periodTaskModel.setSiteId(siteModel.getSiteId());
        PeriodTaskServiceImpl periodTaskService = SpringUtil.getBean(PeriodTaskServiceImpl.class);
        periodTaskService.save(periodTaskModel);



        retCode = RetCode.OK;
        Result result = new Result();
        result.setData(null);
        result.setMsg("OK");
        result.setStatus(retCode);
        return result;
    }
}
