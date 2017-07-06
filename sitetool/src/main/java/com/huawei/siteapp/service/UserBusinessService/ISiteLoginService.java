package com.huawei.siteapp.service.UserBusinessService;

import com.huawei.siteapp.common.Bean.SiteLoginRestBean;

/**
 * Created by z00390414 on 2017/7/6.
 *
 * @version 1.0
 */
public interface ISiteLoginService {
    int checkSiteUserLoginSuccess(SiteLoginRestBean siteLoginRestBean);
}
