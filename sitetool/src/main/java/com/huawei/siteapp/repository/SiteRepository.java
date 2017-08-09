package com.huawei.siteapp.repository;

import com.huawei.siteapp.model.SiteModel;

/**
 * Created by z00390414 on 2017/6/16.
 *
 * @version 1.0
 */
//@Service("siteRepository")
public interface SiteRepository extends BaseRepository<SiteModel> {
    SiteModel findSiteModelBySiteLoginIpAndSiteLoginUser(String siteLoginIp,String siteLoginUser);
    SiteModel findSiteModelBySiteRegionNameAndSiteRegionAndSiteLoginIp(String siteRegionName,String siteRegion,String siteLoginIp);
}
