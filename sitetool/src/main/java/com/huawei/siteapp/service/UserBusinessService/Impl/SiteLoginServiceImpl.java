package com.huawei.siteapp.service.UserBusinessService.Impl;

import com.huawei.siteapp.common.Bean.SiteLoginRestBean;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.model.SiteModel;
import com.huawei.siteapp.repository.SiteRepository;
import com.huawei.siteapp.service.ModelService.Impl.SiteServiceImpl;
import com.huawei.siteapp.service.UserBusinessService.ISiteLoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * Created by z00390414 on 2017/7/6.
 *
 * @version 1.0
 */
@Service
public class SiteLoginServiceImpl implements ISiteLoginService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public int checkSiteUserLoginSuccess(SiteLoginRestBean siteLoginRestBean) {
        SiteServiceImpl siteService = SpringUtil.getBean(SiteServiceImpl.class);
        SiteRepository siteRepository = SpringUtil.getBean(SiteRepository.class);
        SiteModel siteModel = new SiteModel();
        String siteLoginUser = siteLoginRestBean.getSiteLoginUser();
        String siteLoginPwd = siteLoginRestBean.getSiteLoginPwd();
        String siteLoginIp = siteLoginRestBean.getSiteLoginIp();
        String siteRegionName = siteLoginRestBean.getSiteRegionName();


        SiteModel siteModelLogin = siteRepository.findSiteModelBySiteLoginIpAndSiteLoginUser(siteLoginIp, siteLoginUser);
        if (null == siteModelLogin) {
            logger.info("Save siteModel : siteLoginIp = " + siteLoginIp + " ,siteLoginUser = " + siteLoginUser);
            siteModel.setSiteLoginUser(siteLoginUser);
            siteModel.setSiteLoginPwd(siteLoginPwd);
            siteModel.setSiteLoginIp(siteLoginIp);
            siteModel.setSiteRegionName(siteRegionName);
            siteRepository.save(siteModel);
        }else {
            logger.info("SiteModel already exist:  siteLoginIp = " + siteLoginIp + " ,siteLoginUser = " + siteLoginUser );
        }
        return RetCode.OK;
    }
}
