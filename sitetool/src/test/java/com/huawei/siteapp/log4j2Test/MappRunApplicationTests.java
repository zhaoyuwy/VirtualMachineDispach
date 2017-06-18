package com.huawei.siteapp.log4j2Test;

import com.huawei.siteapp.MappRunApplication;
import com.huawei.siteapp.common.Bean.RestBean;
import com.huawei.siteapp.common.util.UctTimeUtil;
import com.huawei.siteapp.http.HttpGetRequest;
import com.huawei.siteapp.http.SiteLoginHttpRequest;
import com.huawei.siteapp.model.Person;
import com.huawei.siteapp.model.Site;
import com.huawei.siteapp.repository.PersonRepository;
import com.huawei.siteapp.repository.PersonRepository2;
import com.huawei.siteapp.repository.SitesRepository;
import com.huawei.siteapp.service.HttpRestService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by z00390414 on 2017/6/15.
 *
 * @version 1.0
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = MappRunApplication.class)
public class MappRunApplicationTests {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private SitesRepository sitesRepository;

    @Autowired
    private PersonRepository2 personRepository2;

    @Autowired
    private HttpRestService httpRestService;

    @Test
    public void contextLoads() {
        logger.trace("I am trace log.");
        logger.debug("I am debug log.");
        logger.warn("I am warn log.");
        logger.info("I am info log.");
        logger.error("I am error log.");
    }

    @Test
    public void testInsert() {
        personRepository2.addPersonsBySQL("INSERT INTO person(name, age, address) VALUES ('ch', 16, 'cc')");
    }

    @Test
    public void testInsert2() {
        Person person = new Person();
        person.setAddress("xian");
        person.setAge(31);
        person.setName("zhaoxiao");
        person.setId(1930);

        personRepository.save(person);
    }

    @Test
    public void testInsertSite() {
        Site site = new Site();
        site.setSiteStatus("false");
        site.setSiteUrn("url");

        sitesRepository.save(site);
    }

    @Test
    public void testSysout() {
        System.out.println("this is a test");
    }



    //测试rest 借口端口号
    public RestBean getTestRest() {
        RestBean restBean = new RestBean();
        restBean.setVrmIp("192.145.17.200");
        restBean.setRestPort("7070");
        return restBean;
    }

    @Test
    public void propertiesRest() throws Exception {
//        登录获取token
        SiteLoginHttpRequest siteLoginHttpRequest = new SiteLoginHttpRequest();

        String user = "kwx319070";
        String pwd = "OpsImage@12345";
//        siteLoginHttpRequest.fcLoginRest(getTestRest(), user, pwd);

        HttpGetRequest httpRequest = new HttpGetRequest();
        httpRequest.fcGetSitesRest(getTestRest());

//        httpRequest.fcGetSitesClustersRest(getTestRest());
    }


    @Test
    public void testCrudRepository(){
        List<Site> sites = new ArrayList<>();
        int index=0;
        for(int i='a';i<='z';i++){
            index++;
            Site site = new Site();
            site.setSiteIp((char)i+""+(char)i+"@sina.com"+ UctTimeUtil.getCurrentDate());
            sites.add(site);
        }
        httpRestService.saveSiteList(sites);
    }

    @Test
    public void testCrudRepositoryClear(){
        List<Site> sites = new ArrayList<>();

        int index=0;
        for(int i='a';i<='z';i++){
            index++;
            Site site = new Site();
            site.setSiteIp((char)i+""+(char)i+"@sina.com");
            sites.add(site);
        }
        httpRestService.saveSiteList(sites);
    }
}
