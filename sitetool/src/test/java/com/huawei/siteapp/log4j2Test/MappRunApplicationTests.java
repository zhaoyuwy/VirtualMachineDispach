package com.huawei.siteapp.log4j2Test;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.huawei.siteapp.MappRunApplication;
import com.huawei.siteapp.model.Person;
import com.huawei.siteapp.repository.PersonRepository;
import com.huawei.siteapp.repository.PersonRepository2;
import org.junit.Test;
import org.junit.runner.RunWith;
//import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    protected final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private PersonRepository2 personRepository2;
    @Test
    public void contextLoads() {
        logger.trace("I am trace log.");
        logger.debug("I am debug log.");
        logger.warn("I am warn log.");
        logger.info("I am info log.");
        logger.error("I am error log.");
    }

    @Test
    public void testInsert(){
        personRepository2.addPersonsBySQL("INSERT INTO person(name, age, address) VALUES ('ch', 16, 'cc')");
    }

    @Test
    public void testInsert2(){
//        personRepository2.addPersonsBySQL("INSERT INTO person(name, age, address) VALUES ('ch', 16, 'cc')");
        Person person = new Person();
        person.setAddress("xian");
        person.setAge(31);
        person.setName("zhaoxiao");
        person.setId(1910);

        personRepository.save(person);
    }
    @Test
    public void testSysout(){
        System.out.println("this is a test");
    }
}
