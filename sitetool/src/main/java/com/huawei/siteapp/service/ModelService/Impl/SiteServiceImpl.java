package com.huawei.siteapp.service.ModelService.Impl;

import com.huawei.siteapp.model.SiteModel;
import com.huawei.siteapp.repository.BaseRepository;
import com.huawei.siteapp.service.ModelService.ISiteService;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;

/**
 * Created by z00390414 on 2017/6/18.
 *
 * @version 1.0
 */
@Repository("siteService")
public class SiteServiceImpl extends BaseServiceImpl<SiteModel> implements ISiteService {

    @Override
    @Resource(name = "siteRepository")
    public void setRepository(BaseRepository<SiteModel> dao) {
        super.setRepository(dao);
    }


    public void saveSiteLoginInfo(){

    }


//    @Override
    public SiteModel findById2(String categoryName) {
        return null;
    }
}
