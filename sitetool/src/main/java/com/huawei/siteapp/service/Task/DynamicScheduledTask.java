package com.huawei.siteapp.service.Task;

import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.model.UserModel;
import com.huawei.siteapp.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by z00390414 on 2017/7/14.
 *
 * @version 1.0
 */
@Lazy(false)
@Component
@EnableScheduling
public class DynamicScheduledTask implements SchedulingConfigurer {
    private static final Logger logger = LoggerFactory.getLogger(DynamicScheduledTask.class);

//    private static String cron;

    public void setCron(String cron) {
        this.cron = cron;
    }
//    public DynamicScheduledTask() {
//        cron = "0/5 * * * * ?";
//
//        // 开启新线程模拟外部更改了任务执行周期
//        new Thread(new Runnable() {
//            @Override
//            public void run() {
//                try {
//                    Thread.sleep(15 * 1000);
//                } catch (InterruptedException e) {
//                    e.printStackTrace();
//                }
//
//                cron = "0/10 * * * * ?";
//                System.err.println("cron change to: " + cron);
//            }
//        }).start();
//    }

    //    @Override
//    public void configureTasks(ScheduledTaskRegistrar taskRegistrar) {
//        taskRegistrar.addTriggerTask(new Runnable() {
//            @Override
//            public void run() {
//                // 任务逻辑
//                logger.debug("dynamicCronTask is running...");
//            }
//        }, new Trigger() {
//            @Override
//            public Date nextExecutionTime(TriggerContext triggerContext) {
//                // 任务触发，可修改任务的执行周期
//                CronTrigger trigger = new CronTrigger(cron);
//                Date nextExec = trigger.nextExecutionTime(triggerContext);
//                return nextExec;
//            }
//        });
//    }
    private static String DEFAULT_CRON = "0/5 * * * * ?";
    private static String cron = "0/5 * * * * ?";
    private static String lastCron = "0/5 * * * * ?";
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    @Override
    public void configureTasks(ScheduledTaskRegistrar taskRegistrar) {
        taskRegistrar.addTriggerTask(() -> {
            UserRepository userRepository = SpringUtil.getBean(UserRepository.class);
            if (!cron.equals(lastCron)) {
                System.out.println("save user");
                UserModel user = new UserModel();
                user.setUserName("1");
//                userRepository.save(user);
                lastCron = cron;
            }
            // 定时任务的业务逻辑
            System.out.println("动态修改定时任务cron参数，当前时间：" + dateFormat.format(new Date()));
        }, triggerContext -> {
            // 定时任务触发，可修改定时任务的执行周期
            CronTrigger trigger = new CronTrigger(cron);
            Date nextExecDate = trigger.nextExecutionTime(triggerContext);
            return nextExecDate;
        });
    }
}