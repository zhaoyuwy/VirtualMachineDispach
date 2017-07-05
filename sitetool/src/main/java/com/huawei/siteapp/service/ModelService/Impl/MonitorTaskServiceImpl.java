package com.huawei.siteapp.service.ModelService.Impl;

import com.huawei.siteapp.model.MonitorTaskModel;
import com.huawei.siteapp.repository.BaseRepository;
import com.huawei.siteapp.service.ModelService.IMonitorTaskService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by z00390414 on 2017/7/5.
 *
 * @version 1.0
 */
@Service("monitorTaskService")
public class MonitorTaskServiceImpl extends BaseServiceImpl<MonitorTaskModel> implements IMonitorTaskService {
    @Resource(name = "monitorTaskRepository")
    public void setRepository(BaseRepository<MonitorTaskModel> dao) {
        super.setRepository(dao);
    }
}
