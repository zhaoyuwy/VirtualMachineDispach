package com.huawei.siteapp.repository;

import com.huawei.siteapp.model.MonitorVmInfoModel;
import org.springframework.stereotype.Service;

/**
 * Created by z00390414 on 2017/6/30.
 *
 * @version 1.0
 */
@Service("monitorVmInfoRepository")
public interface MonitorVmInfoRepository  extends BaseRepository<MonitorVmInfoModel> {
}
