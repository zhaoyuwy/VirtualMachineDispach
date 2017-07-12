package com.huawei.siteapp.controller.SystemController;

import com.huawei.siteapp.bean.Result;
import com.huawei.siteapp.bean.TopologyTreeBean;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.service.UserBusinessService.ISiteLoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by z00390414 on 2017/7/11.
 *
 * @version 1.0
 */
@RestController
public class SysGetTopologyTreeInfoController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    ISiteLoginService siteLoginService;

    @ResponseBody
    @RequestMapping("/getTopologyTreeInfo")
    public Result getTopologyTreeInfo() throws Exception {
        logger.info("@@@@@@@    Enter SysGetTopologyTreeInfoController getTopologyTreeInfo()");
        int retCode = RetCode.INIT_ERROR;
        Result result = new Result();
        TopologyTreeBean topologyTreeBean = siteLoginService.queryAllSiteLoginUsers();
        retCode =RetCode.OK;
        result.setStatus(retCode);
        result.setMsg("OK");
        result.setData(topologyTreeBean);
        return result;
    }
}
