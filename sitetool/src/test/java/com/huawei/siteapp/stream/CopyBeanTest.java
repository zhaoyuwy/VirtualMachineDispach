package com.huawei.siteapp.stream;

import com.huawei.siteapp.model.SiteModel;
import org.apache.commons.beanutils.BeanUtils;
import org.junit.Test;

import java.lang.reflect.InvocationTargetException;

/**
 * Created by z00390414 on 2017/7/13.
 *
 * @version 1.0
 */
public class CopyBeanTest {

    @Test
    public void testCopyBean(){
        SiteModel siteModel1 = new SiteModel();
        siteModel1.setSiteRegionName("1");
        SiteModel siteModel2 = new SiteModel();
        siteModel2.setSiteRegion("2");

//        siteModel2 = (SiteModel) CommonUtils.copyBean(siteModel1,siteModel2);
        try {
//            BeanUtils.copyProperties(siteModel1,siteModel2);
            BeanUtils.copyProperty(siteModel1,"siteRegion",siteModel2);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
        System.out.println("siteModel1  "+siteModel1);
        System.out.println("siteModel2  "+siteModel2);
    }
}
