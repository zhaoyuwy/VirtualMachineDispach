package com.huawei.siteapp.controller.SystemController;

import com.huawei.siteapp.bean.Result;
import com.huawei.siteapp.common.util.JSONUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by z00390414 on 2017/8/7.
 *
 * @version 1.0
 */
@RestController
public class SystermConfigController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "/saveMail", method = RequestMethod.POST)
    @ResponseBody
    public Result saveMail(HttpServletRequest request) {
        String jsonRst = JSONUtils.jsonToServiceContext(request);
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@saveMail" + jsonRst);
        logger.info("@@@@@@@@@@@@@@@@@@@@@@@@@saveMail" + jsonRst);
        return mailResult();
    }

    private Result mailResult(){
        Result result = new Result();
        result.setMsg("OK");
        result.setStatus(200);
        result.setData("mail save ok");
        return result;
    }

    @RequestMapping(value = "/testMail", method = RequestMethod.POST)
    @ResponseBody
    public Result testMail(HttpServletRequest request) {
        String jsonRst = JSONUtils.jsonToServiceContext(request);
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@testMail" + jsonRst);
        logger.info("@@@@@@@@@@@@@@@@@@@@@@@@@testMail" + jsonRst);
        return mailTest();
    }

    private Result mailTest(){
        Result result = new Result();
        result.setMsg("OK");
        result.setStatus(200);
        result.setData("mail test ok");
        return result;
    }

    @RequestMapping(value = "/saveThreshold", method = RequestMethod.POST)
    @ResponseBody
    public Result saveThreshold(HttpServletRequest request) {
        String jsonRst = JSONUtils.jsonToServiceContext(request);
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@saveThreshold" + jsonRst);
        logger.info("@@@@@@@@@@@@@@@@@@@@@@@@@saveThreshold" + jsonRst);
        return thresHold();
    }

    private Result thresHold(){
        Result result = new Result();
        result.setMsg("OK");
        result.setStatus(200);
        result.setData("mail thresHold ok");
        return result;
    }


    @RequestMapping(value = "/saveSystemConfig", method = RequestMethod.POST)
    @ResponseBody
    public Result saveSystemConfig(HttpServletRequest request) {
        String jsonRst = JSONUtils.jsonToServiceContext(request);
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@saveSystemConfig" + jsonRst);
        logger.info("@@@@@@@@@@@@@@@@@@@@@@@@@saveSystemConfig" + jsonRst);
        return systemConfig();
    }

    private Result systemConfig(){
        Result result = new Result();
        result.setMsg("OK");
        result.setStatus(200);
        result.setData("mail systemConfig ok");
        return result;
    }
}
