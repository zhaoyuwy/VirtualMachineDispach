package com.huawei.siteapp.controller;

import com.alibaba.fastjson.JSON;
import com.huawei.siteapp.bean.Result;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.CommonUtils;
import com.huawei.siteapp.common.util.JSONUtils;
import com.huawei.siteapp.model.UserModel;
import com.huawei.siteapp.service.UserBusinessService.IUserLoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by z00390414 on 2017/6/14.
 *
 * @version 1.0
 * @date 2017/6/14
 */
@RestController
public class UserLoginController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());


    @Autowired
    IUserLoginService userLoginService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public Result postLogin(HttpServletRequest request) {

        logger.info("Enter login.");
        Result result = new Result();

        int retCode;

        String jsonRst = JSONUtils.jsonToServiceContext(request);
        UserModel userModel =JSON.parseObject(jsonRst,UserModel.class);
        if (CommonUtils.isNull(jsonRst)) {
            retCode = RetCode.INNER_ERROR;
            logger.error("parse param error");
        } else {
            logger.info(JSON.toJSONString(userModel),true);
            retCode = userLoginService.login(userModel, request);
        }
        result.setStatus(retCode);
        result.setMsg("OK");
        result.setData(userModel);
        return result ;
    }
}
