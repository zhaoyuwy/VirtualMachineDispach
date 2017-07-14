package com.huawei.siteapp.service.ModelService.Impl;

import com.huawei.siteapp.model.PeriodTaskModel;
import com.huawei.siteapp.repository.BaseRepository;
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

}
