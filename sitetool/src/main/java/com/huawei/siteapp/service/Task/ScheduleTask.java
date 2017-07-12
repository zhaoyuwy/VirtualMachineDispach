package com.huawei.siteapp.service.Task;

import com.huawei.siteapp.cache.CacheCenter;
import com.huawei.siteapp.common.Bean.SiteLoginRestBean;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.controller.TaskController;
import com.huawei.siteapp.service.Http.SiteLoginHttpRequestServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

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

    //        @Scheduled(cron = "0 0 2 * * ?")//每天凌晨两点执行
    @Scheduled(cron = "0/10 * *  * * ? ")
    //每5秒执行一次
    void doSomethingWith() {
        num++;
        logger.info("Schedule task doSomethingWith begin. times =  " + num);
//        System.out.println("Schedule task doSomethingWith begin. times = " + num);
    }

    //    @Scheduled(cron = "0 0/5 * * * ?")
//    @Scheduled(fixedDelay = 5000)
//    每30分执行一次
    void doScheduleTaskHalfHour() {
        logger.info("Schedule task generate report begin ");
        boolean isLoginSuccess = (Boolean) CacheCenter.getInstance().getRestBeanResponse("loginSuccess");
        if (!isLoginSuccess) {
//            logger.info("User2 has not login");
            return;
        }
        logger.info("Schedule task generate report begin after user login success");
        //                登录获取token
        SiteLoginHttpRequestServiceImpl siteLoginHttpRequest = new SiteLoginHttpRequestServiceImpl();
        SiteLoginRestBean siteLoginRestBean = (SiteLoginRestBean) CacheCenter.getInstance().getRestBeanResponse("siteLoginRestBean");
        String username = (String) CacheCenter.getInstance().getRestBeanResponse("username");
        String pwd = (String) CacheCenter.getInstance().getRestBeanResponse("pwd");

        TaskServiceImpl taskService = SpringUtil.getBean(TaskServiceImpl.class);
//        清除monitor数据
        taskService.clearDbMonitorData();
//        登录token
        siteLoginHttpRequest.fcLoginRest(siteLoginRestBean);

        AsyncTaskServiceImpl asyncTaskService = SpringUtil.getBean(AsyncTaskServiceImpl.class);
        asyncTaskService.asyncGenerateHostReport();

        asyncTaskService.asyncGenerateVmReport();
        logger.info("Schedule task generate report end");
    }

    @PostConstruct
    public void InitLogin() {
        CacheCenter.getInstance().addUrlResponse("loginSuccess", false);
    }

    @Scheduled(fixedDelay = 5000)
    void doScheduleGenerateReport() {

        boolean isLoginSuccess = (Boolean) CacheCenter.getInstance().getRestBeanResponse("loginSuccess");
        if (!isLoginSuccess) {
            logger.info("User2 has not login");
            return;
        }
        TaskController taskController = SpringUtil.getBean(TaskController.class);
        try {
            taskController.monitorCnaVm();
            taskController.hostReport();
            taskController.vmReport();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
