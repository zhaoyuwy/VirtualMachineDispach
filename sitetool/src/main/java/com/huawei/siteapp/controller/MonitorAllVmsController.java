package com.huawei.siteapp.controller;

import com.huawei.siteapp.cache.CacheCenter;
import com.huawei.siteapp.common.Bean.RestBean;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.service.Http.MonitorAllVmsServiceImpl;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by z00390414 on 2017/6/29.
 *
 * @version 1.0
 */
@RestController
public class MonitorAllVmsController {
    @ResponseBody
    @RequestMapping("/vms")
    public int getVms() {
        MonitorAllVmsServiceImpl monitorAllVmsService = SpringUtil.getBean(MonitorAllVmsServiceImpl.class);
//        UserController userController = SpringUtil.getBean(UserController.class);
//        userController.testPrint();
        int retCode = monitorAllVmsService.fcGetSitesClustersHostsAllVrmRest((RestBean) CacheCenter.getInstance().getRestBeanResponse("restBean"));

        return retCode;
    }
}
