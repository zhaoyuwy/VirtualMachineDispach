package com.huawei.siteapp.service.Http;

import com.huawei.siteapp.MappRunApplication;
import com.huawei.siteapp.common.Bean.SiteLoginRestBean;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Created by z00390414 on 2017/6/15.
 *
 * @author z00390414
 * @version [版本号, 2017/6/15]
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = MappRunApplication.class)
public class HttpRequestTest2 {


    @Autowired
    MonitorCnaServiceImpl monitorsService;
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

//        HttpGetRequest httpRequest = new HttpGetRequest();
//        httpRequest.fcGetSitesRest(getTestRest());
//
//        httpRequest.fcGetSitesClustersRest(getTestRest());
//
//        httpRequest.fcGetSitesClustersHostsRest(getTestRest());

//        MonitorsServiceImpl = SpringUtil.getBean(MonitorsServiceImpl.class);
        monitorsService.fcPostSitesClustersHostsCpuMemRest(getTestRest());
    }
    @Test
    public void TestReposeRest() throws Exception {
//        登录获取token
        monitorsService.fcPostSitesClustersHostsCpuMemRest(getTestRest());
    }

}