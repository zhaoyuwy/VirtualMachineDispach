package com.huawei.siteapp.service.ExcelService;

import com.huawei.siteapp.model.MonitorCnaInfoModel;

import java.util.List;

/**
 * Created by z00390414 on 2017/6/26.
 *
 * @version 1.0
 */
public interface IHostReportService {
    int poiTemplate(String reportName, List<MonitorCnaInfoModel> monitorCpuMemModels) throws Exception;
}
