package com.huawei.siteapp.service.Task;

import com.huawei.siteapp.cache.CacheCenter;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.model.PeriodTaskModel;
import com.huawei.siteapp.repository.PeriodTaskRepository;
import com.huawei.siteapp.service.ModelService.Impl.PeriodTaskServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    DynamicScheduledTask dynamicScheduledTask;


    //        @Scheduled(cron = "0 0 2 * * ?")//每天凌晨两点执行
    @Scheduled(cron = "0/10 * *  * * ? ")
    //每5秒执行一次
    void doSomethingWith() {
        num++;
        logger.info("Schedule task doSomethingWith begin. times =  " + num);
//        System.out.println("Schedule task doSomethingWith begin. times = " + num);
    }
    @PostConstruct
    public void InitLogin() {
        CacheCenter.getInstance().addUrlResponse("loginSuccess", false);
    }

//    @Scheduled(fixedDelay = 5000)
    void setDynamicScheduledTask(){
        dynamicScheduledTask.setCron("0/10 * * * * ?");
    }

//    @Scheduled(fixedDelay = 50000000)
    void taskStart(){
        PeriodTaskServiceImpl periodTaskService = SpringUtil.getBean(PeriodTaskServiceImpl.class);

        PeriodTaskRepository periodTaskRepository = SpringUtil.getBean(PeriodTaskRepository.class);
        PeriodTaskModel periodTaskModel = periodTaskRepository.findPeriodTaskModelByPeriodTaskId(51);
        periodTaskService.taskHandle(periodTaskModel);

    }



}
