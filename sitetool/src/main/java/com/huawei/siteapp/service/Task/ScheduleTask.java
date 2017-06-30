package com.huawei.siteapp.service.Task;

import com.huawei.siteapp.cache.CacheCenter;
import com.huawei.siteapp.common.Bean.RestBean;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.service.Http.HttpRestServiceImpl;
import com.huawei.siteapp.service.Http.SiteLoginHttpRequestServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.text.SimpleDateFormat;

/**
 * Created by z00390414 on 2017/6/15.
 *
 * @author z00390414
 * @version [版本号, 2017/6/15]
 */
@Component
public class ScheduleTask {

    protected final Logger logger = LoggerFactory.getLogger(this.getClass());
    SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
    private static int num = 0;

    //        @Scheduled(cron = "0 0 2 * * ?")//每天凌晨两点执行
    @Scheduled(cron = "0/10 * *  * * ? ")
    //每5秒执行一次
    void doSomethingWith() {
        num++;
        logger.info("Schedule task doSomethingWith begin. times =  " + num);
        System.out.println("Schedule task doSomethingWith begin. times = " + num);
    }

    @Scheduled(cron = "0 0/5 * * * ?")
//    每30分执行一次
    void doScheduleTaskHalfHour() {
        logger.info("Schedule task generate report begin ");
        boolean isLoginSuccess = (Boolean) CacheCenter.getInstance().getRestBeanResponse("loginSuccess");
        if(!isLoginSuccess){
            logger.info("User has not login");
            return;
        }
        logger.info("Schedule task generate report begin after user login success");
        //                登录获取token
        SiteLoginHttpRequestServiceImpl siteLoginHttpRequest = new SiteLoginHttpRequestServiceImpl();
        RestBean restBean = (RestBean) CacheCenter.getInstance().getRestBeanResponse("restBean");
        String username = (String) CacheCenter.getInstance().getRestBeanResponse("username");
        String pwd = (String) CacheCenter.getInstance().getRestBeanResponse("pwd");

        TaskServiceImpl taskService = SpringUtil.getBean(TaskServiceImpl.class);
        taskService.clearDb();

        siteLoginHttpRequest.fcLoginRest(restBean, username, pwd);

        HttpRestServiceImpl httpRestService = SpringUtil.getBean(HttpRestServiceImpl.class);
//        HttpRestServiceImpl httpRequest = new HttpRestServiceImpl();
        httpRestService.fcGetSitesRest(restBean);
//
        httpRestService.fcGetSitesClustersRest(restBean);
//
        httpRestService.fcGetSitesClustersHostsRest(restBean);

        AsyncTaskServiceImpl asyncTaskService = SpringUtil.getBean(AsyncTaskServiceImpl.class);
        asyncTaskService.asyncGenerateHostReport();

        asyncTaskService.asyncGenerateVmReport();
        logger.info("Schedule task generate report end");
    }
    @PostConstruct
    public void InitLogin(){
        CacheCenter.getInstance().addUrlResponse("loginSuccess", false);
    }
}
