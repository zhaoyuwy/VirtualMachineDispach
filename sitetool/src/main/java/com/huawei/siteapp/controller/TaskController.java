package com.huawei.siteapp.controller;

import com.huawei.siteapp.cache.CacheCenter;
import com.huawei.siteapp.common.Bean.RestBean;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.common.util.UctTimeUtil;
import com.huawei.siteapp.model.MonitorCnaInfoModel;
import com.huawei.siteapp.model.SiteModel;
import com.huawei.siteapp.service.ExcelService.HostReportServiceImpl;
import com.huawei.siteapp.service.Http.MonitorAllVmsServiceImpl;
import com.huawei.siteapp.service.ModelService.Impl.MonitorCnaInfoServiceImpl;
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
        logger.error("This is a error test! path = "+path);
        return "success";
    }
    @ResponseBody
    @RequestMapping("/task1")
    public String getVms() throws Exception {
        MonitorAllVmsServiceImpl monitorAllVmsService = SpringUtil.getBean(MonitorAllVmsServiceImpl.class);
//        UserController userController = SpringUtil.getBean(UserController.class);
//        userController.testPrint();
        String response =monitorAllVmsService.fcGetSitesClustersHostsAllVrmRest((RestBean) CacheCenter.getInstance().getRestBeanResponse("restBean"));
        return response;
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
            retCode = hostReportService.poiTemplate(UctTimeUtil.getCurrentDate(), (List<MonitorCnaInfoModel>) hosts);
        } catch (Exception e) {
            logger.error("This is report Exception", e);
        }
        return retCode;
    }

    @ResponseBody
    @RequestMapping("/task3")
    public  String testAsyncTask() throws Exception{
        String param = UctTimeUtil.getCurrentDate();
//        asyncTaskService.asyncSaveVmInfoInDB(param);
        CompletableFuture<SiteModel>  completableFuture= asyncTaskService.findUser(param);
//        asyncTaskService.asyncSaveVmInfoInDB(param+"###########");
        return completableFuture.toString();
    }
}
