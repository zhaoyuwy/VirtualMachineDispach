package com.huawei.siteapp.service.UserBusinessService.Impl;

import com.huawei.siteapp.common.Bean.SiteLoginRestBean;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.model.SiteModel;
import com.huawei.siteapp.repository.SiteRepository;
import com.huawei.siteapp.service.ModelService.Impl.SiteServiceImpl;
import com.huawei.siteapp.service.UserBusinessService.ISiteLoginService;
import org.springframework.stereotype.Service;

/**
 * Created by z00390414 on 2017/7/6.
 *
 * @version 1.0
 */
@Service
public class SiteLoginServiceImpl implements ISiteLoginService {



    @Override
    public int checkSiteUserLoginSuccess(SiteLoginRestBean siteLoginRestBean) {
        SiteServiceImpl siteService = SpringUtil.getBean(SiteServiceImpl.class);
        SiteRepository siteRepository = SpringUtil.getBean(SiteRepository.class);
        SiteModel siteModel = new SiteModel();
        String siteLoginUser = siteLoginRestBean.getSiteLoginUser();
        String siteLoginPwd = siteLoginRestBean.getSiteLoginPwd();
        String siteLoginIp = siteLoginRestBean.getSiteLoginIp();
        String siteRegionName = siteLoginRestBean.getSiteRegionName();

        siteModel.setSiteLoginUser(siteLoginUser);
        siteModel.setSiteLoginPwd(siteLoginPwd);
        siteModel.setSiteLoginIp(siteLoginIp);
        siteModel.setSiteRegionName(siteRegionName);

//        siteService.save(siteModel);
        siteRepository.save(siteModel);
        return RetCode.OK;
    }
}
