package com.huawei.siteapp.log4j2Test;

import com.huawei.siteapp.MappRunApplication;
import com.huawei.siteapp.common.Bean.SiteLoginRestBean;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.common.util.UctTimeUtil;
import com.huawei.siteapp.model.HostModel;
import com.huawei.siteapp.model.PersonModel;
import com.huawei.siteapp.model.SiteModel;
import com.huawei.siteapp.model.UserModel;
import com.huawei.siteapp.repository.HostRepository;
import com.huawei.siteapp.repository.Impl.RepositoryTemplate;
import com.huawei.siteapp.repository.PersonRepository;
import com.huawei.siteapp.service.ExcelService.HostReportServiceImpl;
import com.huawei.siteapp.service.Http.HttpRestServiceImpl;
import com.huawei.siteapp.service.Http.SiteLoginHttpRequestServiceImpl;
import com.huawei.siteapp.service.ModelService.Impl.UserServiceImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

//import com.huawei.siteapp.service.HttpRestService;

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
    private RepositoryTemplate personRepository2;

//    @Autowired
//    private HttpRestService httpRestService;


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
//        personRepository2.addPersonsBySQL("INSERT INTO person(name, age, address) VALUES ('ch', 16, 'cc')");
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
    public SiteLoginRestBean getTestRest() {
        SiteLoginRestBean siteLoginRestBean = new SiteLoginRestBean();
        siteLoginRestBean.setVrmIp("192.145.17.200");
        siteLoginRestBean.setRestPort("7070");
        return siteLoginRestBean;
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
    public void testCrudRepository() {
        List<SiteModel> sites = new ArrayList<>();
        int index = 0;
        for (int i = 'a'; i <= 'z'; i++) {
            index++;
            SiteModel site = new SiteModel();
            site.setSiteIp((char) i + "" + (char) i + "@sina.com" + UctTimeUtil.getCurrentDate());
            sites.add(site);
        }
//        httpRestService.saveSiteList(sites);
    }

    @Test
    public void testCrudRepositoryInterface() {
        List<SiteModel> sites = new ArrayList<>();
        int index = 0;
        for (int i = 'a'; i <= 'z'; i++) {
            index++;
            SiteModel site = new SiteModel();
            site.setSiteIp((char) i + "" + (char) i + "@sina14.com" + UctTimeUtil.getCurrentDate());
            sites.add(site);
        }
//        siteRepository.save(sites);
    }

    @Test
    public void testCrudRepositoryClear() {
//        List<SiteModel> sites = new ArrayList<>();
//
//        int index=0;
//        for(int i='a';i<='z';i++){
//            index++;
//            SiteModel site = new SiteModel();
//            site.setSiteIp((char)i+""+(char)i+"@sina.com");
//            sites.add(site);
//        }
//        httpRestService.clearSiteList();
    }

    @Test
    @Transactional
    public void testReport() {
//        try {
//            hostReportServiceImpl.hostReportSaveDataToExcel(UctTimeUtil.getCurrentDate("yyyy_MM_dd_HH_MM_SS"));
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        MyThread myThread = SpringUtil.getBean("myThread", MyThread.class);
//        System.out.println(myThread);
//        User2Repository userRepository = SpringUtil.getBean(User2Repository.class);
//        userRepository.deleteAll();

        List<UserModel> userModels = new ArrayList<>();
//        PersonRepository personRepository = SpringUtil.getBean(PersonRepository.class);
        for (int i = 0; i < 10; i++) {
            UserModel personModel = new UserModel();
            personModel.setUserName("address " + i);
            userModels.add(personModel);
//            personRepository.save(userModels);
        }
        UserServiceImpl userService = SpringUtil.getBean(UserServiceImpl.class);
        userService.save(userModels);
        try {
            Thread.sleep(2000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    @Test
    public  void testFind(){
        HostRepository hostRepository = SpringUtil.getBean(HostRepository.class);
List<HostModel> hostModels = (List<HostModel>) hostRepository.findAll();
        List<HostModel> hosts = hostRepository.findHostModelsBySiteId(-1);
        System.out.println(hosts);
    }


}
