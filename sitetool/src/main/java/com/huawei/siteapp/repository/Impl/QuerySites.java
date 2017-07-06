package com.huawei.siteapp.repository.Impl;

import com.huawei.siteapp.model.SiteModel;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by z00390414 on 2017/7/6.
 *
 * @version 1.0
 */
public interface QuerySites extends JpaRepository<SiteModel, Long> {
    //    @Query("select u from fc_sites u where u.site_login_user = :site_login_user")
//    SiteModel findByEmailAddress(@Param("site_login_user")String site_login_user);
//    @Query("select site_id from fc_sites u where u.site_login_user=:site_login_user")
//    SiteModel findUser(@Param("site_login_user") String site_login_user);

    SiteModel findSiteModelBySiteLoginUser(String siteLoginUser);
}
