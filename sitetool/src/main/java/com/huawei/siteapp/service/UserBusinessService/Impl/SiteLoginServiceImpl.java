package com.huawei.siteapp.service.UserBusinessService.Impl;

import com.huawei.siteapp.bean.RegionBean;
import com.huawei.siteapp.bean.TopologyTreeBean;
import com.huawei.siteapp.common.Bean.SiteLoginRestBean;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.CommonUtils;
import com.huawei.siteapp.common.util.PropertiesUtils;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.model.SiteModel;
import com.huawei.siteapp.repository.SiteRepository;
import com.huawei.siteapp.service.Http.HttpRestServiceImpl;
import com.huawei.siteapp.service.Http.SiteLoginHttpRequestServiceImpl;
import com.huawei.siteapp.service.ModelService.Impl.SiteServiceImpl;
import com.huawei.siteapp.service.UserBusinessService.ISiteLoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        } else {
            logger.info("SiteModel already exist:  siteLoginIp = " + siteLoginIp + " ,siteLoginUser = " + siteLoginUser);
        }
        return RetCode.OK;
    }

    @Override
    public int checkAndSaveSiteInfo(SiteModel siteModel) {
        int retCode = RetCode.INIT_ERROR;
        SiteLoginRestBean siteLoginRestBean = setSiteLoginRestBean(siteModel.getSiteRegionName(), siteModel.getSiteLoginIp(), siteModel.getSiteLoginUser(), siteModel.getSiteLoginPwd());
        //        登录获取token
        SiteLoginHttpRequestServiceImpl siteLoginHttpRequest = SpringUtil.getBean(SiteLoginHttpRequestServiceImpl.class);
        retCode = siteLoginHttpRequest.fcLoginRest(siteLoginRestBean);

        HttpRestServiceImpl httpRequest = SpringUtil.getBean(HttpRestServiceImpl.class);
        httpRequest.fcGetSitesRest(siteLoginRestBean);
//
        httpRequest.fcGetSitesClustersRest(siteLoginRestBean);
//
        httpRequest.fcGetSitesClustersHostsRest(siteLoginRestBean);
        return retCode;
    }

    private SiteLoginRestBean setSiteLoginRestBean(String siteRegionName, String siteLoginIp, String siteLoginUser, String siteLoginPwd) {
        SiteLoginRestBean siteLoginRestBean = new SiteLoginRestBean();
        siteLoginRestBean.setSiteRegionName(siteRegionName);
        siteLoginRestBean.setSiteLoginIp(siteLoginIp);
        siteLoginRestBean.setSiteLoginUser(siteLoginUser);
        siteLoginRestBean.setSiteLoginPwd(siteLoginPwd);
        siteLoginRestBean.setRestPort(PropertiesUtils.get("FC_PORT"));
        return siteLoginRestBean;
    }

    private void saveSiteLoginUser(SiteLoginRestBean siteLoginRestBean) {
        HttpRestServiceImpl httpRequest = SpringUtil.getBean(HttpRestServiceImpl.class);
        httpRequest.fcGetSitesRest(siteLoginRestBean);
//
        httpRequest.fcGetSitesClustersRest(siteLoginRestBean);
//
        httpRequest.fcGetSitesClustersHostsRest(siteLoginRestBean);

    }

    public TopologyTreeBean queryAllSiteLoginUsers() {
        SiteServiceImpl siteService = SpringUtil.getBean(SiteServiceImpl.class);
        List<SiteModel> siteModels = (List<SiteModel>) siteService.findAll();
        List<RegionBean> regionBeans = new ArrayList<>();
        TopologyTreeBean topologyTreeBean = new TopologyTreeBean(regionBeans);

        if (CommonUtils.isNull(siteModels) || 0 == siteModels.size()) {
            return null;
        }

        Map<String, List<SiteModel>> stringSiteModelMap = new HashMap<>();
        for (SiteModel siteModelTemp : siteModels) {

            String siteRegionName = siteModelTemp.getSiteRegionName();
            if (!stringSiteModelMap.containsKey(siteRegionName)) {
                stringSiteModelMap.put(siteRegionName, new ArrayList<SiteModel>());
            }
            stringSiteModelMap.get(siteRegionName).add(siteModelTemp);
        }

        topologyTreeBean.setTotal(stringSiteModelMap.size());
        stringSiteModelMap.forEach((s, siteModels1) -> {
            RegionBean regionBean = new RegionBean(s, new ArrayList<>());
            for (SiteModel siteModelTemp : siteModels) {
                if (s.equals(siteModelTemp.getSiteRegionName())) {
                    regionBean.getSiteModels().add(siteModelTemp);
                }
            }
            regionBeans.add(regionBean);
        });
        return topologyTreeBean;
    }
}
