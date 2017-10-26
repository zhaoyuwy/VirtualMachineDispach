package com.huawei.siteapp.service.ModelService.Impl;

import com.huawei.siteapp.model.HostModel;
import com.huawei.siteapp.repository.BaseRepository;
import com.huawei.siteapp.service.ModelService.IHostService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by z00390414 on 2017/6/26.
 *
 * @version 1.0
 */
@Service
public class HostServiceImpl extends BaseServiceImpl<HostModel> implements IHostService {
    @Override
    @Resource(name = "hostRepository")
    public void setRepository(BaseRepository<HostModel> dao) {
        super.setRepository(dao);
    }
}
