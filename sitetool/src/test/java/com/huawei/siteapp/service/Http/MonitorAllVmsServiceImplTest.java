package com.huawei.siteapp.service.Http;

import com.huawei.siteapp.MappRunApplication;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.model.VmModel;
import com.huawei.siteapp.service.ModelService.Impl.VmServiceImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.HashSet;
import java.util.Set;

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
        VmServiceImpl vmService = SpringUtil.getBean(VmServiceImpl.class);
        Iterable<VmModel> vmModels =  vmService.findAll();
        Set<String> numUri = new HashSet<>();

        vmModels.forEach(vmModel -> {
            numUri.add(vmModel.getVmUri());
        });
        System.out.println(numUri.size());
//        monitorAllVmsService.fcGetSitesClustersHostsAllVrmRest();
    }

}