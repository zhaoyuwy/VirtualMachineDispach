package com.huawei.siteapp.repository.Impl;

import com.huawei.siteapp.MappRunApplication;
import com.huawei.siteapp.common.Bean.RestBean;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.model.User2;
import com.huawei.siteapp.service.UserBusinessService.ISiteLoginService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Created by z00390414 on 2017/7/6.
 *
 * @version 1.0
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = MappRunApplication.class)
public class UserRepositoryTest {
    @Autowired
    private User2Repository userRepository;
    @Test
    public void test() throws Exception {
// 创建10条记录
//        userRepository.save(new User2("AAA", 10));
//        userRepository.save(new User2("BBB", 20));
//        userRepository.save(new User2("CCC", 30));
//        userRepository.save(new User2("DDD", 40));
//        userRepository.save(new User2("EEE", 50));
//        userRepository.save(new User2("FFF", 60));
//        userRepository.save(new User2("GGG", 70));
//        userRepository.save(new User2("HHH", 80));
//        userRepository.save(new User2("III", 90));
//        userRepository.save(new User2("JJJ", 100));
//// 测试findAll, 查询所有记录
//        Assert.assertEquals(10, userRepository.findAll().size());
//// 测试findByName, 查询姓名为FFF的User
//        Assert.assertEquals(60, userRepository.findByName("FFF").getAge().longValue());
//// 测试findUser, 查询姓名为FFF的User
//        Assert.assertEquals(60, userRepository.findUser("FFF").getAge().longValue());
//// 测试findByNameAndAge, 查询姓名为FFF并且年龄为60的User
//        Assert.assertEquals("FFF", userRepository.findByNameAndAge("FFF", 60).getName());
//// 测试删除姓名为AAA的User
//        userRepository.delete(userRepository.findByName("AAA"));
//// 测试findAll, 查询所有记录, 验证上面的删除是否成功
//        Assert.assertEquals(9, userRepository.findAll().size());
//        User2 user2 = new User2();
//        user2.setName("AAA");
//        user2.setAge(10);
//        userRepository.save(user2);
        User2 user2 = userRepository.findByName("AAA");
        System.out.println("DDDDDDDDDDDDDDD"+user2);
    }

    @Test
    public void saveSiteData() {
        RestBean restBean = new RestBean();
        restBean.setSiteLoginUser("admin");
        restBean.setSiteLoginPwd("ddd");
        restBean.setSiteRegionName("廊坊");
        restBean.setSiteLoginIp("1.1.1.1");
        ISiteLoginService siteLoginService = SpringUtil.getBean(ISiteLoginService.class);
//
        siteLoginService.checkSiteUserLoginSuccess(restBean);
    }
}