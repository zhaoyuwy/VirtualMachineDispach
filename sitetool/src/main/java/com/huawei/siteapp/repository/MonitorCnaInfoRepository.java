package com.huawei.siteapp.repository;

import com.huawei.siteapp.model.MonitorCnaInfoModel;

import java.util.List;

/**
 * Created by z00390414 on 2017/6/27.
 *
 * @version 1.0
 */
//@Service("monitorCnaInfoRepository")
public interface MonitorCnaInfoRepository extends BaseRepository<MonitorCnaInfoModel> {
    List<MonitorCnaInfoModel> findMonitorCnaInfoModelsBySiteId(long siteId);
}
