package com.huawei.siteapp.service.ModelService.Impl;

import com.huawei.siteapp.model.UserModel;
import com.huawei.siteapp.repository.BaseRepository;
import com.huawei.siteapp.service.ModelService.IUserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by z00390414 on 2017/7/3.
 *
 * @version 1.0
 */
@Service("userService")
public class UserServiceImpl extends BaseServiceImpl<UserModel> implements IUserService {
    @Resource(name = "userRepository")
    public void setRepository(BaseRepository<UserModel> dao) {
        super.setRepository(dao);
    }
}
