package com.huawei.siteapp.controller;

import com.huawei.siteapp.cache.CacheCenter;
import com.huawei.siteapp.common.Bean.RestBean;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.service.Http.MonitorAllVmsServiceImpl;
import com.huawei.siteapp.service.Task.TaskServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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

    @ResponseBody
    @RequestMapping("/task")
    public String task() throws Exception {
        System.out.println("开始执行Controller任务");
        long start = System.currentTimeMillis();
//        TASK.doTaskOne();
        TASK.doTaskTwo();
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
}
