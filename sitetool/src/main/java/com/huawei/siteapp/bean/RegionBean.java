package com.huawei.siteapp.bean;

import com.huawei.siteapp.model.SiteModel;

import java.util.List;

/**
 * Created by z00390414 on 2017/7/7.
 *
 * @version 1.0
 */
public class RegionBean {
    String evName;
    List<SiteModel> siteModels;

    /**
     * 默认的构造方法必须不能省，不然不能解析
     */
    public RegionBean() {

    }

    public RegionBean(String evName, List<SiteModel> siteModels) {
        this.evName = evName;
        this.siteModels = siteModels;
    }

    public String getEvName() {
        return evName;
    }

    public void setEvName(String evName) {
        this.evName = evName;
    }

    public List<SiteModel> getSiteModels() {
        return siteModels;
    }

    public void setSiteModels(List<SiteModel> siteModels) {
        this.siteModels = siteModels;
    }


}
