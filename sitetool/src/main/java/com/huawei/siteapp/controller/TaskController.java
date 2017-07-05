package com.huawei.siteapp.controller;

import com.huawei.siteapp.cache.CacheCenter;
import com.huawei.siteapp.common.Bean.RestBean;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.CommonUtils;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.common.util.UctTimeUtil;
import com.huawei.siteapp.model.MonitorCnaInfoModel;
import com.huawei.siteapp.model.MonitorVmInfoModel;
import com.huawei.siteapp.model.SiteModel;
import com.huawei.siteapp.service.ExcelService.HostReportServiceImpl;
import com.huawei.siteapp.service.ExcelService.VmReportServiceImpl;
import com.huawei.siteapp.service.Http.MonitorAllVmsServiceImpl;
import com.huawei.siteapp.service.Http.MonitorCnaServiceImpl;
import com.huawei.siteapp.service.Http.SiteLoginHttpRequestServiceImpl;
import com.huawei.siteapp.service.ModelService.Impl.MonitorCnaInfoServiceImpl;
import com.huawei.siteapp.service.ModelService.Impl.MonitorVmInfoServiceImpl;
import com.huawei.siteapp.service.ModelService.Impl.SiteServiceImpl;
import com.huawei.siteapp.service.Task.AsyncTaskServiceImpl;
import com.huawei.siteapp.service.Task.TaskServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.concurrent.CompletableFuture;

/**
 * Created by z00390414 on 2017/6/28.
 *
 * @version 1.0
 */
@Controller
public class TaskController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private TaskServiceImpl TASK;

    @Autowired
    private AsyncTaskServiceImpl asyncTaskService;

    @ResponseBody
    @RequestMapping("/task")
    public String task() throws Exception {
        System.out.println("开始执行Controller任务");
        long start = System.currentTimeMillis();
//        TASK.doTaskOne();
        String param = "this is a task two";
        TASK.doTaskTwo(param);
        TASK.doTaaskThree();
        long end = System.currentTimeMillis();
        System.out.println("完成Controller任务，耗时：" + (end - start) + "毫秒");
        String path = getClass().getClassLoader().getResource("").getPath();
        logger.error("This is a error test! path = " + path);
        return "success";
    }

    @ResponseBody
    @RequestMapping("/task1")
    public int getVms() throws Exception {
        MonitorAllVmsServiceImpl monitorAllVmsService = SpringUtil.getBean(MonitorAllVmsServiceImpl.class);
//        UserController userController = SpringUtil.getBean(UserController.class);
//        userController.testPrint();
        int retCode = monitorAllVmsService.fcGetSitesClustersHostsAllVrmRest((RestBean) CacheCenter.getInstance().getRestBeanResponse("restBean"));
        return retCode;
    }

    @ResponseBody
    @RequestMapping("/task2")
    public int testResource() throws Exception {
        int retCode = RetCode.INIT_ERROR;
        try {
//            retCode = hostReportServiceImpl.hostReportSaveDataToExcel(username + "_" + ip + "_" + UctTimeUtil.getCurrentDate("yyyy_MM_dd_HH_mm_ss"));
            MonitorCnaInfoServiceImpl monitorCpuMemService = SpringUtil.getBean(MonitorCnaInfoServiceImpl.class);
            HostReportServiceImpl hostReportService = SpringUtil.getBean(HostReportServiceImpl.class);
//            HostReportServiceImpl hostReportService = SpringUtil.getBean(HostReportServiceImpl.class);
            Iterable<MonitorCnaInfoModel> hosts = monitorCpuMemService.findAll();
            retCode = hostReportService.poiTemplate(CommonUtils.getTestReportName(), (List<MonitorCnaInfoModel>) hosts);
            retCode = hostReportService.poiTemplate(CommonUtils.getTestReportName(), (List<MonitorCnaInfoModel>) hosts);
        } catch (Exception e) {
            logger.error("This is report Exception", e);
        }
        return retCode;
    }

    @ResponseBody
    @RequestMapping("/task3")
    public String testAsyncTask() throws Exception {
        String param = UctTimeUtil.getCurrentDate();
//        asyncTaskService.asyncSaveVmInfoInDB(param);
        CompletableFuture<SiteModel> completableFuture = asyncTaskService.findUser(param);
//        asyncTaskService.asyncSaveVmInfoInDB(param+"###########");
        return completableFuture.toString();
    }

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

    @ResponseBody
    @RequestMapping("/monitorCnaVm")
    public String monitorCnaVm() throws Exception {
        logger.info("Enter monitorCnaVm");
        TaskServiceImpl taskService = SpringUtil.getBean(TaskServiceImpl.class);
        taskService.clearDbMonitorData();

//        RestBean restBean = (RestBean) CacheCenter.getInstance().getRestBeanResponse("restBean");

        SiteServiceImpl siteService = SpringUtil.getBean(SiteServiceImpl.class);
        Iterable<SiteModel> siteModels = siteService.findAll();

        logger.info("Sites number = " + ((List) siteModels).size());
        for (SiteModel siteModelTemp : siteModels) {
            RestBean restBean = new RestBean();
            String siteIp = siteModelTemp.getSiteLoginIp();
            String siteLoginUser = siteModelTemp.getSiteLoginUser();
            String siteLoginPwd = siteModelTemp.getSiteLoginPwd();
            String siteUri = siteModelTemp.getSiteUri();

            restBean.setVrmIp(siteIp);
            restBean.setRestPort("7070");
            restBean.setRestUserName(siteLoginUser);
            restBean.setRestPwd(siteLoginPwd);
            restBean.setRestSiteUri(siteUri);
            //        登录获取token
            SiteLoginHttpRequestServiceImpl siteLoginHttpRequestService = SpringUtil.getBean(SiteLoginHttpRequestServiceImpl.class);
            siteLoginHttpRequestService.fcLoginRest(restBean, siteLoginUser, siteLoginPwd);
//            HttpRestServiceImpl httpRestService = SpringUtil.getBean(HttpRestServiceImpl.class);
//
//            httpRestService.fcGetSitesRest(restBean);

//            logger.info("token is " + (String) CacheCenter.getInstance().getRestBeanResponse("FcLogin"));
            MonitorAllVmsServiceImpl monitorAllVmsService = SpringUtil.getBean(MonitorAllVmsServiceImpl.class);
            int retCode = monitorAllVmsService.fcGetSitesClustersHostsAllVrmRest(restBean);

            MonitorCnaServiceImpl monitorsService = SpringUtil.getBean(MonitorCnaServiceImpl.class);
            int retCode2 = monitorsService.fcPostSitesClustersHostsCpuMemRest(restBean);

            if (200 != retCode || 200 != retCode2) {
                return "monitorCnaVm error";
            }
        }
        return "200";
    }
}
