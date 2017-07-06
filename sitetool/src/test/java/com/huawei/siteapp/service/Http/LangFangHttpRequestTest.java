package com.huawei.siteapp.service.Http;

import com.huawei.siteapp.common.Bean.RestBean;
import com.huawei.siteapp.common.util.UctTimeUtil;
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
        SiteLoginHttpRequestServiceImpl siteLoginHttpRequest = new SiteLoginHttpRequestServiceImpl();

        String user = "admin";
        String pwd = "HWS_lf@pub9001";
        siteLoginHttpRequest.fcLoginRest(getTestRest(), user, pwd);

//        HttpRestServiceImpl httpRequest = new HttpRestServiceImpl();
//        httpRequest.fcGetSitesRest(getTestRest());

//        httpRequest.fcGetSitesClustersRest(getTestRest());
    }

    @Test
    public void testUctTIme() {
        String time = UctTimeUtil.getCurrentDate("yyyy_MM_dd_HH_mm_ss");
        System.out.println("time = "+time);
    }
}