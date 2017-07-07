package com.huawei.siteapp.service.UserBusinessService.Impl;

import com.huawei.siteapp.common.constats.ExceptionEnum;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.BusinessException;
import com.huawei.siteapp.common.util.CommonUtils;
import com.huawei.siteapp.model.UserModel;
import com.huawei.siteapp.service.ModelService.Impl.UserServiceImpl;
import com.huawei.siteapp.service.UserBusinessService.IUserLoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * Created by z00390414 on 2017/7/5.
 *
 * @version 1.0
 */
@Service
public class UserLoginServiceImpl implements IUserLoginService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    UserServiceImpl userService;


    @Override
    public int login(UserModel userModel, HttpServletRequest request) {

        logger.info("enter login service method");
        int retCode = RetCode.INIT_ERROR;
        String userName = userModel.getUserName();
        String userPwd = userModel.getUserPwd();
        int userType = userModel.getUserType();
        UserModel userModelInDb = userService.findUserModelByUserNameAndUserType(userName, userType);

        if(null == userModelInDb){
            logger.error("userName = "+userName+"not exit.");
            throw new BusinessException(ExceptionEnum.USER_NOT_FIND);
        }
        //检验用户名和密码字符串是否合法
        if (!CommonUtils.isloginCharacterValid(userName)
                || !CommonUtils.isloginCharacterValid(userPwd)) {
            logger.error("username or pwd illegal. username：" + userName + " password: " + userType);
            return RetCode.LOGIN_FAILED;
        }

        if (userName.equals(userModelInDb.getUserName()) && userPwd.equals(userModelInDb.getUserPwd())) {
            retCode = RetCode.OK;
        }
        logger.info("User2 login :" + userName);
        return retCode;
    }
}
