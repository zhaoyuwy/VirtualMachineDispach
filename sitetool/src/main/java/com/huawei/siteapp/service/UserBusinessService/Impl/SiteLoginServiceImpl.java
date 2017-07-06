package com.huawei.siteapp.service.UserBusinessService.Impl;

import com.huawei.siteapp.common.Bean.RestBean;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.model.SiteModel;
import com.huawei.siteapp.service.ModelService.Impl.SiteServiceImpl;
import com.huawei.siteapp.service.UserBusinessService.ISiteLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by z00390414 on 2017/7/6.
 *
 * @version 1.0
 */
@Service
public class SiteLoginServiceImpl implements ISiteLoginService {

    @Autowired
    SiteServiceImpl siteService;

    @Override
    public int checkSiteUserLoginSuccess(RestBean restBean) {
        SiteModel siteModel = new SiteModel();
        String siteLoginUser = restBean.getSiteLoginUser();
        String siteLoginPwd = restBean.getSiteLoginPwd();
        String siteLoginIp = restBean.getSiteLoginIp();
        String siteRegionName = restBean.getSiteRegionName();

        siteModel.setSiteLoginUser(siteLoginUser);
        siteModel.setSiteLoginPwd(siteLoginPwd);
        siteModel.setSiteLoginIp(siteLoginIp);
        siteModel.setSiteRegionName(siteRegionName);

        siteService.save(siteModel);
        return RetCode.OK;
    }
}
