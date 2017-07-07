package com.huawei.siteapp.service.ModelService;

import com.huawei.siteapp.model.UserModel;

/**
 * Created by z00390414 on 2017/7/3.
 *
 * @version 1.0
 */
public interface IUserService extends IBaseService<UserModel> {
    UserModel findUserModelByUserNameAndUserType(String userName,int userType);
}
