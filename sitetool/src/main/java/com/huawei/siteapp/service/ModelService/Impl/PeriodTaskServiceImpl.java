package com.huawei.siteapp.service.ModelService.Impl;

import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.model.PeriodTaskModel;
import com.huawei.siteapp.repository.BaseRepository;
import com.huawei.siteapp.repository.PeriodTaskRepository;
import com.huawei.siteapp.service.ModelService.IPeriodTaskService;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;

/**
 * Created by z00390414 on 2017/7/14.
 *
 * @version 1.0
 */
@Repository("periodTaskService")
public class PeriodTaskServiceImpl extends BaseServiceImpl<PeriodTaskModel> implements IPeriodTaskService {
    @Resource(name = "periodTaskRepository")
    public void setRepository(BaseRepository<PeriodTaskModel> dao) {
        super.setRepository(dao);
    }

    public PeriodTaskModel findPeriodTaskModelByPeriodTaskId(long periodTaskId) {
        PeriodTaskRepository periodTaskRepository = SpringUtil.getBean(PeriodTaskRepository.class);
        return periodTaskRepository.findPeriodTaskModelByPeriodTaskId(periodTaskId);
    }

    @Override
    public PeriodTaskModel findPeriodTaskModelBySiteRegionNameAndSiteRegionAndSiteLoginIp(String siteRegionName, String siteRegion, String siteLoginIp) {
        PeriodTaskRepository periodTaskRepository = SpringUtil.getBean(PeriodTaskRepository.class);
        return periodTaskRepository.findPeriodTaskModelBySiteRegionNameAndSiteRegionAndSiteLoginIp(siteRegionName, siteRegion, siteLoginIp);
    }

}
