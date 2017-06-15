package com.huawei.siteapp.log4j2Test;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.huawei.siteapp.MappRunApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
//import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Created by z00390414 on 2017/6/15.
 *
 * @version 1.0
 * @date 2017/6/15
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = MappRunApplication.class)
public class MappRunApplicationTests {

    protected final Logger logger = LoggerFactory.getLogger(this.getClass());
    protected final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    public void contextLoads() {
        logger.trace("I am trace log.");
        logger.debug("I am debug log.");
        logger.warn("I am warn log.");
        logger.error("I am error log.");
    }
}
