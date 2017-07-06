package com.huawei.siteapp.service.ExcelService;

import com.huawei.siteapp.MappRunApplication;
import com.huawei.siteapp.common.util.CommonUtils;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.common.util.UctTimeUtil;
import com.huawei.siteapp.model.MonitorCnaInfoModel;
import com.huawei.siteapp.model.User2;
import com.huawei.siteapp.repository.Impl.QuerySites;
import com.huawei.siteapp.repository.Impl.User2Repository;
import com.huawei.siteapp.service.ModelService.Impl.MonitorCnaInfoServiceImpl;
import junit.framework.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

/**
 * Created by z00390414 on 2017/6/29.
 *
 * @version 1.0
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = MappRunApplication.class)
public class HostReportServiceImplTest {
    @Test
    public void hostReportSaveDataToExcel() throws Exception {
    }

    @Test
    public void poiTemplate() throws Exception {
        MonitorCnaInfoServiceImpl monitorCpuMemService = SpringUtil.getBean(MonitorCnaInfoServiceImpl.class);
        HostReportServiceImpl hostReportService = SpringUtil.getBean(HostReportServiceImpl.class);
        Iterable<MonitorCnaInfoModel> hosts = monitorCpuMemService.findAll();
//        hosts.forEach(monitorCpuMemModel -> {
//            System.out.println(monitorCpuMemModel.getMonitorObjectName());
//
//        });
        hostReportService.poiTemplate(CommonUtils.getTestReportName(), (List<MonitorCnaInfoModel>) hosts);
    }

    @Test
    public void testTime() {
        System.out.println(UctTimeUtil.getCurrentDate());
    }

    @Autowired
    private User2Repository user2Repository;

    @Test
    public void test() throws Exception {
// 创建10条记录
//        user2Repository.save(new User2("AAA", 10));
//        user2Repository.save(new User2("BBB", 20));
//        user2Repository.save(new User2("CCC", 30));
//        user2Repository.save(new User2("DDD", 40));
//        user2Repository.save(new User2("EEE", 50));
//        user2Repository.save(new User2("FFF", 60));
//        user2Repository.save(new User2("GGG", 70));
//        user2Repository.save(new User2("HHH", 80));
//        user2Repository.save(new User2("III", 90));
//        user2Repository.save(new User2("JJJ", 100));

        User2 user2 = new User2();
        user2.setName("AAA");
        user2.setAge(10);
        user2Repository.save(user2);

        User2 user3 = new User2();
        user3.setName("BBB");
        user3.setAge(20);
        user2Repository.save(user3);

        User2 user21 = new User2();
        user21.setName("FFF");
        user21.setAge(30);
        user2Repository.save(user21);


// 测试findAll, 查询所有记录
//        Assert.assertEquals(3, user2Repository.findAll().size());
        System.out.println(user2Repository.findAll().size());
// 测试findByName, 查询姓名为FFF的User
        Assert.assertEquals(30, user2Repository.findByName("FFF").getAge().longValue());
// 测试findUser, 查询姓名为FFF的User
        Assert.assertEquals(30, user2Repository.findUser("FFF").getAge().longValue());
// 测试findByNameAndAge, 查询姓名为FFF并且年龄为60的User
//        Assert.assertEquals("FFF", user2Repository.findByNameAndAge("FFF", 60).getName());
// 测试删除姓名为AAA的User
//        user2Repository.delete(user2Repository.findByName("AAA"));
// 测试findAll, 查询所有记录, 验证上面的删除是否成功
//        Assert.assertEquals(9, user2Repository.findAll().size());
        System.out.println("DDDDDDDDDDDDDDD");
    }
    @Test
    public void dele(){
        user2Repository.deleteAll();
    }

    @Autowired
    QuerySites querySites;
    @Test
    public void que(){
//        querySites.findUser("admin");
    }
}