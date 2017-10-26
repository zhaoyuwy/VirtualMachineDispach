package com.huawei.siteapp.service.ModelService.Impl;

import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.model.UserModel;
import com.huawei.siteapp.repository.BaseRepository;
import com.huawei.siteapp.repository.UserRepository;
import com.huawei.siteapp.service.ModelService.IUserService;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;

/**
 * Created by z00390414 on 2017/7/3.
 *
 * @version 1.0
 */
@Repository("userService")
public class UserServiceImpl extends BaseServiceImpl<UserModel> implements IUserService {
    @Override
    @Resource(name = "userRepository")
    public void setRepository(BaseRepository<UserModel> dao) {
        super.setRepository(dao);
    }

    @Override
    public UserModel findUserModelByUserNameAndUserType(String userName, int userType) {
        UserRepository userRepository = SpringUtil.getBean(UserRepository.class);
        return userRepository.findUserModelByUserNameAndUserType(userName,userType);
    }
}
