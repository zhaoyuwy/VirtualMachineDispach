package com.huawei.siteapp.repository;

import com.huawei.siteapp.model.HostModel;

import java.util.List;

/**
 * Created by z00390414 on 2017/6/26.
 *
 * @version 1.0
 */
//@Service("hostRepository")
public interface HostRepository extends BaseRepository<HostModel> {
    List<HostModel> findHostModelsBySiteId(long siteId);
}
