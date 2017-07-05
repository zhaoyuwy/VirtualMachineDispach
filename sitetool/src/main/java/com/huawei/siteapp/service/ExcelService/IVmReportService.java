package com.huawei.siteapp.service.ExcelService;

import com.huawei.siteapp.model.MonitorVmInfoModel;

import java.util.List;

/**
 * Created by z00390414 on 2017/6/30.
 *
 * @version 1.0
 */
public interface IVmReportService {
    int poiVmTemplate(String reportName, List<MonitorVmInfoModel> monitorVmInfoModel) throws Exception;
}
