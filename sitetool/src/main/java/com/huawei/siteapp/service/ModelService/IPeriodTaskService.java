package com.huawei.siteapp.service.ModelService;

import com.huawei.siteapp.model.PeriodTaskModel;

/**
 * Created by z00390414 on 2017/7/14.
 *
 * @version 1.0
 */
public interface IPeriodTaskService extends IBaseService<PeriodTaskModel> {
    PeriodTaskModel findPeriodTaskModelByPeriodTaskId(long periodTaskId);

    PeriodTaskModel findPeriodTaskModelBySiteRegionNameAndSiteRegionAndSiteLoginIp(String siteRegionName, String siteRegion, String siteLoginIp);

}
