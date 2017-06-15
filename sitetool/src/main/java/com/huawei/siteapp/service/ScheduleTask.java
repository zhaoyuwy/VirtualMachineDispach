package com.huawei.siteapp.service;

import org.springframework.scheduling.annotation.Scheduled;

/**
 * Created by z00390414 on 2017/6/15.
 *
 * @author z00390414
 * @version [版本号, 2017/6/15]
 */
public class ScheduleTask {
    @Scheduled(cron = "0 0 2 * * ?")//每天凌晨两点执行
    void doSomethingWith(){
//        logger.info("定时任务开始......");
        long begin = System.currentTimeMillis();

        //执行数据库操作了哦...

        long end = System.currentTimeMillis();
//        logger.info("定时任务结束，共耗时：[" + (end-begin) / 1000 + "]秒");
    }
}
