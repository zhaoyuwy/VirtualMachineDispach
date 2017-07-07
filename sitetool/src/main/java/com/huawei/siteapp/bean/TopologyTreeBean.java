package com.huawei.siteapp.bean;

import java.util.List;

/**
 * Created by z00390414 on 2017/7/7.
 *
 * @version 1.0
 */
public class TopologyTreeBean {
    private int total;
    private List<RegionBean> regionBeans;

    public TopologyTreeBean(){

    }
    public TopologyTreeBean(List<RegionBean> regionBeans){
        this.regionBeans = regionBeans;
    }
    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public List<RegionBean> getRegionBeans() {
        return regionBeans;
    }

    public void setRegionBeans(List<RegionBean> regionBeans) {
        this.regionBeans = regionBeans;
    }
}
