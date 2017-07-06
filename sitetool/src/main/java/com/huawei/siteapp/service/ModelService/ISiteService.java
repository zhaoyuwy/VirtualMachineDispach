package com.huawei.siteapp.service.ModelService;

import com.huawei.siteapp.model.SiteModel;

/**
 * Created by z00390414 on 2017/6/19.
 *
 * @version 1.0
 */
public interface ISiteService extends IBaseService<SiteModel> {

    //    @Query("select A from fc_sites A where A.site_login_user=\"admin\"" )
//    @Override
//    @Query("select A from fc_sites A where A.site_id=?1" )
//    @Query("SELECT key from NodeKey key where key.isSoftDeleted = false")
//    @Query("from fc_sites c  where c.name=:categoryName")
//    @Modifying
//    SiteModel findById2(@Param("categoryName") String categoryName);

//    @Query("from Auction a join a.category c where c.name=:categoryName")
//    public Iterable<SiteModel> findByCategory(@Param("categoryName") String categoryName);

}
