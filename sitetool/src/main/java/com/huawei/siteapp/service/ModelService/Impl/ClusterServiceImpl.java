package com.huawei.siteapp.service.ModelService.Impl;

import com.huawei.siteapp.model.ClusterModel;
import com.huawei.siteapp.repository.BaseRepository;
import com.huawei.siteapp.service.ModelService.IClusterService;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;

/**
 * Created by z00390414 on 2017/6/26.
 *
 * @version 1.0
 */
@Repository
public class ClusterServiceImpl extends BaseServiceImpl<ClusterModel> implements IClusterService {
    @Resource(name = "clusterRepository")
    public void setRepository(BaseRepository<ClusterModel> dao) {
        super.setRepository(dao);
    }
}
