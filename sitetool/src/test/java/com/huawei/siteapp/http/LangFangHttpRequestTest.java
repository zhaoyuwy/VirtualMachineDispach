package com.huawei.siteapp.http;

import com.huawei.siteapp.common.Bean.RestBean;
import org.junit.Test;

/**
 * Created by z00390414 on 2017/6/15.
 *
 * @author z00390414
 * @version [版本号, 2017/6/15]
 */
public class LangFangHttpRequestTest {
    //测试rest 借口端口号
    public RestBean getTestRest() {
        RestBean restBean = new RestBean();
        restBean.setVrmIp("10.44.70.245");
        restBean.setRestPort("7070");
        return restBean;
    }

    @Test
    public void propertiesRest() throws Exception {
//        登录获取token
        SiteLoginHttpRequest siteLoginHttpRequest = new SiteLoginHttpRequest();

        String user = "admin";
        String pwd = "HWS_lf@pub9001";
//        siteLoginHttpRequest.fcLoginRest(getTestRest(), user, pwd);

        HttpGetRequest httpRequest = new HttpGetRequest();
        httpRequest.fcGetSitesRest(getTestRest());

//        httpRequest.fcGetSitesClustersRest(getTestRest());
    }
}