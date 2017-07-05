package com.huawei.siteapp.service.UserBusinessService.Impl;

import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.CommonUtils;
import com.huawei.siteapp.model.UserModel;
import com.huawei.siteapp.service.ModelService.Impl.UserServiceImpl;
import com.huawei.siteapp.service.UserBusinessService.IUserLoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by z00390414 on 2017/7/5.
 *
 * @version 1.0
 */
@Service
public class UserLoginServiceImpl implements IUserLoginService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    UserServiceImpl userService;


    @Override
    public int login(UserModel userModel, HttpServletRequest request) {

        logger.info("enter login service method");

        List<UserModel> userModels = (List<UserModel>) userService.findAll();

        String userName = userModel.getUserName();
        String userPwd = userModel.getUserPwd();
        int userType = userModel.getUserType();

        //检验用户名和密码字符串是否合法
        if (!CommonUtils.isloginCharacterValid(userName)
                || !CommonUtils.isloginCharacterValid(userPwd)) {
            logger.error("username or pwd illegal. username：" + userName + " password: " + userType);
            return RetCode.LOGIN_FAILED;
        }
        logger.info("User login :" + userName);
        return RetCode.OK;
    }
}
