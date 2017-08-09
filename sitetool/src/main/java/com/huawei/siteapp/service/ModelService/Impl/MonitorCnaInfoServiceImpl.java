package com.huawei.siteapp.service.ModelService.Impl;

import com.huawei.siteapp.model.MonitorCnaInfoModel;
import com.huawei.siteapp.repository.BaseRepository;
import com.huawei.siteapp.service.ModelService.IMonitorCnaInfoService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by z00390414 on 2017/6/27.
 *
 * @version 1.0
 */
@Service("monitorCnaInfoService")
public class MonitorCnaInfoServiceImpl extends BaseServiceImpl<MonitorCnaInfoModel> implements IMonitorCnaInfoService {

    @Resource(name = "monitorCnaInfoRepository")
    public void setRepository(BaseRepository<MonitorCnaInfoModel> dao) {
        super.setRepository(dao);
    }

}
