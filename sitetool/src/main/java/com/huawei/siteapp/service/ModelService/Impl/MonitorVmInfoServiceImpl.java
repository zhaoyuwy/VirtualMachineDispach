package com.huawei.siteapp.service.ModelService.Impl;

import com.huawei.siteapp.model.MonitorVmInfoModel;
import com.huawei.siteapp.repository.BaseRepository;
import com.huawei.siteapp.service.ModelService.IMonitorVmInfoService;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;

/**
 * Created by z00390414 on 2017/6/27.
 *
 * @version 1.0
 */
@Repository("monitorVmInfoService")
public class MonitorVmInfoServiceImpl extends BaseServiceImpl<MonitorVmInfoModel> implements IMonitorVmInfoService {

    @Override
    @Resource(name = "monitorVmInfoRepository")
    public void setRepository(BaseRepository<MonitorVmInfoModel> dao) {
        super.setRepository(dao);
    }

}
