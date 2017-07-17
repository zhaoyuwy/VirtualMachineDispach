package com.huawei.siteapp;

import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.support.config.FastJsonConfig;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.List;

/**
 * Created by z00390414 on 2017/6/14.
 *
 * @version 1.0
 */
@SpringBootApplication
@EnableScheduling   //开启定时任务
@EnableAsync        //开启异步任务
@ServletComponentScan
//public class MappRunApplication extends WebMvcConfigurerAdapter implements SchedulingConfigurer {
public class MappRunApplication extends WebMvcConfigurerAdapter {
    //public class MappRunApplication  {
    public static void main(String[] args) {
        SpringApplication.run(MappRunApplication.class, args);
    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
// TODO Auto-generated method stub
        super.configureMessageConverters(converters);
        FastJsonHttpMessageConverter fastConverter = new FastJsonHttpMessageConverter();

        FastJsonConfig fastJsonConfig = new FastJsonConfig();
        fastJsonConfig.setSerializerFeatures(
                SerializerFeature.PrettyFormat
        );
        fastConverter.setFastJsonConfig(fastJsonConfig);

        converters.add(fastConverter);
    }


//    @Bean
//    public MyBean myBean() {
//        return new MyBean();
//    }
//
//    @Bean(destroyMethod = "shutdown")
//    public Executor taskExecutor() {
//        return Executors.newScheduledThreadPool(100);
//    }
//
//    @Override
//    public void configureTasks(ScheduledTaskRegistrar scheduledTaskRegistrar) {
//        scheduledTaskRegistrar.setScheduler(taskExecutor());
//        scheduledTaskRegistrar.addTriggerTask(
//                new Runnable() {
//                    @Override public void run() {
//                        myBean().getSchedule();
//                    }
//                },
//                new Trigger() {
//                    @Override public Date nextExecutionTime(TriggerContext triggerContext) {
//                        Calendar nextExecutionTime =  new GregorianCalendar();
//                        Date lastActualExecutionTime = triggerContext.lastActualExecutionTime();
//                        nextExecutionTime.setTime(lastActualExecutionTime != null ? lastActualExecutionTime : new Date());
//                        nextExecutionTime.add(Calendar.MILLISECOND, env.getProperty("myRate", Integer.class)); //you can get the value from wherever you want
//                        return nextExecutionTime.getTime();
//                    }
//                }
//        );
//    }
}
