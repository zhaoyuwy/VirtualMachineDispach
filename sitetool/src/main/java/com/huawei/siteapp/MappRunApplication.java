package com.huawei.siteapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Created by z00390414 on 2017/6/14.
 *
 * @version 1.0
 */
@SpringBootApplication
@EnableScheduling   //开启定时任务
@EnableAsync        //开启异步任务
public class MappRunApplication {
    public static void main(String[] args) {
        SpringApplication.run(MappRunApplication.class, args);
    }


}
