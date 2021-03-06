package com.huawei.siteapp.service.ModelService.Impl;

import com.huawei.siteapp.model.VmModel;
import com.huawei.siteapp.repository.BaseRepository;
import com.huawei.siteapp.service.ModelService.IVmService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by z00390414 on 2017/6/29.
 *
 * @version 1.0
 */
@Service("vmService")
public class VmServiceImpl extends BaseServiceImpl<VmModel> implements IVmService {
    @Resource(name = "vmRepository")
    public void setRepository(BaseRepository<VmModel> dao) {
        super.setRepository(dao);
    }
}
