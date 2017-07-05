package com.huawei.siteapp.service.ExcelService;

import com.huawei.siteapp.MappRunApplication;
import com.huawei.siteapp.common.util.CommonUtils;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.common.util.UctTimeUtil;
import com.huawei.siteapp.model.MonitorCnaInfoModel;
import com.huawei.siteapp.service.ModelService.Impl.MonitorCnaInfoServiceImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

/**
 * Created by z00390414 on 2017/6/29.
 *
 * @version 1.0
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = MappRunApplication.class)
public class HostReportServiceImplTest {
    @Test
    public void hostReportSaveDataToExcel() throws Exception {
    }

    @Test
    public void poiTemplate() throws Exception {
        MonitorCnaInfoServiceImpl monitorCpuMemService = SpringUtil.getBean(MonitorCnaInfoServiceImpl.class);
        HostReportServiceImpl hostReportService = SpringUtil.getBean(HostReportServiceImpl.class);
        Iterable<MonitorCnaInfoModel> hosts = monitorCpuMemService.findAll();
//        hosts.forEach(monitorCpuMemModel -> {
//            System.out.println(monitorCpuMemModel.getMonitorObjectName());
//
//        });
        hostReportService.poiTemplate(CommonUtils.getTestReportName(), (List<MonitorCnaInfoModel>) hosts);
    }

    @Test
    public void testTime() {
        System.out.println(UctTimeUtil.getCurrentDate());
    }
}