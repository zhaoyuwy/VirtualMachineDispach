package com.huawei.siteapp.service.ModelService.Impl;

import com.huawei.siteapp.model.SiteModel;
import com.huawei.siteapp.repository.BaseRepository;
import com.huawei.siteapp.service.ModelService.ISiteService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by z00390414 on 2017/6/18.
 *
 * @version 1.0
 */
@Service("siteService")
public class SiteServiceImpl extends BaseServiceImpl<SiteModel> implements ISiteService {

    @Resource(name = "siteRepository")
    public void setRepository(BaseRepository<SiteModel> dao) {
        super.setRepository(dao);
    }
}
