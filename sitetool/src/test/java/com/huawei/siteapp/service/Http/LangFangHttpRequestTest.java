package com.huawei.siteapp.service.Http;

import com.huawei.siteapp.common.Bean.SiteLoginRestBean;
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
    public SiteLoginRestBean getTestRest() {
        SiteLoginRestBean siteLoginRestBean = new SiteLoginRestBean();
        siteLoginRestBean.setVrmIp("10.44.70.245");
        siteLoginRestBean.setRestPort("7070");
        return siteLoginRestBean;
    }

    @Test
    public void propertiesRest() throws Exception {
//        登录获取token
        SiteLoginHttpRequestServiceImpl siteLoginHttpRequest = new SiteLoginHttpRequestServiceImpl();

    }

    @Test
    public void testUctTIme() {
        String time = UctTimeUtil.getCurrentDate("yyyy_MM_dd_HH_mm_ss");
        System.out.println("time = " + time);
    }


}