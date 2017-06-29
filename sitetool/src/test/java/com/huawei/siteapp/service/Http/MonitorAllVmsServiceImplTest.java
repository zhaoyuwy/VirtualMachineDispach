package com.huawei.siteapp.service.Http;

import com.huawei.siteapp.MappRunApplication;
import com.huawei.siteapp.common.util.SpringUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Created by z00390414 on 2017/6/29.
 *
 * @version 1.0
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = MappRunApplication.class)
public class MonitorAllVmsServiceImplTest {
    @Test
    public void fcGetSitesClustersHostsAllVrmRest() throws Exception {
        MonitorAllVmsServiceImpl monitorAllVmsService = SpringUtil.getBean(MonitorAllVmsServiceImpl.class);
//        monitorAllVmsService.fcGetSitesClustersHostsAllVrmRest();
    }

}