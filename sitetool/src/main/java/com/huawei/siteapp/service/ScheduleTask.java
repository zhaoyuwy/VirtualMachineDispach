package com.huawei.siteapp.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * Created by z00390414 on 2017/6/15.
 *
 * @author z00390414
 * @version [版本号, 2017/6/15]
 */
@Component
public class ScheduleTask {

    protected final Logger logger = LoggerFactory.getLogger(this.getClass());

    //    @Scheduled(cron = "0 0 2 * * ?")//每天凌晨两点执行
    @Scheduled(cron = "0/5 * *  * * ? ")    //每5秒执行一次
    void doSomethingWith() {
//        logger.info("定时任务开始......");
        long begin = System.currentTimeMillis();
        System.out.println("进入测试");
        //执行数据库操作了哦...

        long end = System.currentTimeMillis();
//        logger.info("定时任务结束，共耗时：[" + (end-begin) / 1000 + "]秒");
    }
}
