package com.huawei.siteapp.service.Http;

import com.huawei.siteapp.MappRunApplication;
import com.huawei.siteapp.common.Bean.RestBean;
import org.junit.Test;
import org.junit.runner.RunWith;
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
public class HttpRequestTest {
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
        siteLoginHttpRequest.fcLoginRest(getTestRest(), user, pwd);

//        HttpRestServiceImpl httpRequest = new HttpRestServiceImpl();
//        httpRequest.fcGetSitesRest(getTestRest());
//
//        httpRequest.fcGetSitesClustersRest(getTestRest());
//
//        httpRequest.fcGetSitesClustersHostsRest(getTestRest());
    }
}