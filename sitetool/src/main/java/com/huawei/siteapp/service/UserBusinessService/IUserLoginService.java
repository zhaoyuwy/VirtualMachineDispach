package com.huawei.siteapp.service.UserBusinessService;

import com.huawei.siteapp.model.UserModel;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by z00390414 on 2017/7/5.
 *
 * @version 1.0
 */
public interface IUserLoginService {
    int login(UserModel userModel, HttpServletRequest request);
}
