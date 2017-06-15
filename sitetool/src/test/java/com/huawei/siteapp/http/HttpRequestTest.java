package com.huawei.siteapp.http;

import org.junit.Test;

/**
 * Created by z00390414 on 2017/6/15.
 *
 * @author z00390414
 * @version [版本号, 2017/6/15]
 */
public class HttpRequestTest {
    @Test
    public void propertiesRest() throws Exception {
//        登录获取token
        SiteLoginHttpRequest siteLoginHttpRequest = new SiteLoginHttpRequest();
        
        String user ="kwx319070";
        String pwd ="OpsImage@12345";
        siteLoginHttpRequest.fcLoginRest(user,pwd);
        
        HttpGetRequest httpRequest = new HttpGetRequest();
        httpRequest.fcGetSitesRest();
        
        httpRequest.fcGetSitesClustersRest();
    }
}