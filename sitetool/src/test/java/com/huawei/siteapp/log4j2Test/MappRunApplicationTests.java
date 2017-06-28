package com.huawei.siteapp.log4j2Test;

import com.huawei.siteapp.MappRunApplication;
import com.huawei.siteapp.common.Bean.RestBean;
import com.huawei.siteapp.common.util.UctTimeUtil;
import com.huawei.siteapp.model.PersonModel;
import com.huawei.siteapp.model.SiteModel;
import com.huawei.siteapp.repository.PersonRepository;
import com.huawei.siteapp.repository.PersonRepository2;
import com.huawei.siteapp.service.ExcelService.HostReportServiceImpl;
import com.huawei.siteapp.service.Http.HttpRestServiceImpl;
import com.huawei.siteapp.service.Http.SiteLoginHttpRequestServiceImpl;
import com.huawei.siteapp.service.HttpRestService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.io.IOException;
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

//    @Autowired
//    private SiteRepository siteRepository;

    @Autowired
    private PersonRepository2 personRepository2;

    @Autowired
    private HttpRestService httpRestService;



    @Autowired
    private HostReportServiceImpl hostReportServiceImpl;
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
        PersonModel person = new PersonModel();
        person.setAddress("xian");
        person.setAge(31);
        person.setName("zhaoxiao");
        person.setId(1930);

        personRepository.save(person);
    }

    @Test
    public void testInsertSite() {
        SiteModel site = new SiteModel();
        site.setSiteStatus("false");
        site.setSiteUrn("url");

//        siteRepository.save(site);
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
        SiteLoginHttpRequestServiceImpl siteLoginHttpRequest = new SiteLoginHttpRequestServiceImpl();

        String user = "kwx319070";
        String pwd = "OpsImage@12345";
//        siteLoginHttpRequest.fcLoginRest(getTestRest(), user, pwd);

        HttpRestServiceImpl httpRequest = new HttpRestServiceImpl();
        httpRequest.fcGetSitesRest(getTestRest());

//        httpRequest.fcGetSitesClustersRest(getTestRest());
    }
    @Test
    public void LangFangFc() throws Exception {
//        登录获取token
        SiteLoginHttpRequestServiceImpl siteLoginHttpRequest = new SiteLoginHttpRequestServiceImpl();

        String user = "admin";
        String pwd = "HWS_lf@pub9001";
//        siteLoginHttpRequest.fcLoginRest(getTestRest(), user, pwd);

        HttpRestServiceImpl httpRequest = new HttpRestServiceImpl();
        httpRequest.fcGetSitesRest(getTestRest());

//        httpRequest.fcGetSitesClustersRest(getTestRest());
    }

    @Test
    public void testCrudRepository(){
        List<SiteModel> sites = new ArrayList<>();
        int index=0;
        for(int i='a';i<='z';i++){
            index++;
            SiteModel site = new SiteModel();
            site.setSiteIp((char)i+""+(char)i+"@sina.com"+ UctTimeUtil.getCurrentDate());
            sites.add(site);
        }
        httpRestService.saveSiteList(sites);
    }
    @Test
    public void testCrudRepositoryInterface(){
        List<SiteModel> sites = new ArrayList<>();
        int index=0;
        for(int i='a';i<='z';i++){
            index++;
            SiteModel site = new SiteModel();
            site.setSiteIp((char)i+""+(char)i+"@sina14.com"+ UctTimeUtil.getCurrentDate());
            sites.add(site);
        }
//        siteRepository.save(sites);
    }
    @Test
    public void testCrudRepositoryClear(){
//        List<SiteModel> sites = new ArrayList<>();
//
//        int index=0;
//        for(int i='a';i<='z';i++){
//            index++;
//            SiteModel site = new SiteModel();
//            site.setSiteIp((char)i+""+(char)i+"@sina.com");
//            sites.add(site);
//        }
        httpRestService.clearSiteList();
    }
    @Test
    public void testReport(){
        try {
            hostReportServiceImpl.hostReportSaveDataToExcel(UctTimeUtil.getCurrentDate("yyyy_MM_dd_HH_MM_SS"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
