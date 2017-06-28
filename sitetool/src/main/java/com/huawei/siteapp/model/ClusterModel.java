package com.huawei.siteapp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * Created by z00390414 on 2017/6/23.
 *
 * @version 1.0
 */
@Entity
@Table(name = "fc_cluster")
public class ClusterModel implements Serializable {
    private String clusterUri;
    private String clusterUrn;
    private String clusterName;
    private String time;
    //    class ClusterCpuResource{
    private int clusterAllocatedSizeMHz;
    private int clusterCpuTotalSizeMHz;
    //    }
//    class ClusterMemResource{
    private int clusterAllocatedSizeMB;
    private int clusterTotalSizeMB;
    private Long siteId;

    public Long getSiteId() {
        return siteId;
    }

    public void setSiteId(Long siteId) {
        this.siteId = siteId;
    }

    @Id
    @GeneratedValue
    private Long clusterId = -1L;

    public String getClusterUri() {
        return clusterUri;
    }

    public void setClusterUri(String clusterUri) {
        this.clusterUri = clusterUri;
    }

    public String getClusterName() {
        return clusterName;
    }

    public void setClusterName(String clusterName) {
        this.clusterName = clusterName;
    }

    public int getClusterAllocatedSizeMHz() {
        return clusterAllocatedSizeMHz;
    }

    public void setClusterAllocatedSizeMHz(int clusterAllocatedSizeMHz) {
        this.clusterAllocatedSizeMHz = clusterAllocatedSizeMHz;
    }

    public int getClusterCpuTotalSizeMHz() {
        return clusterCpuTotalSizeMHz;
    }

    public void setClusterCpuTotalSizeMHz(int clusterCpuTotalSizeMHz) {
        this.clusterCpuTotalSizeMHz = clusterCpuTotalSizeMHz;
    }

    public int getClusterAllocatedSizeMB() {
        return clusterAllocatedSizeMB;
    }

    public void setClusterAllocatedSizeMB(int clusterAllocatedSizeMB) {
        this.clusterAllocatedSizeMB = clusterAllocatedSizeMB;
    }

    public int getClusterTotalSizeMB() {
        return clusterTotalSizeMB;
    }

    public void setClusterTotalSizeMB(int clusterTotalSizeMB) {
        this.clusterTotalSizeMB = clusterTotalSizeMB;
    }
//    }


    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getClusterUrn() {
        return clusterUrn;
    }

    public void setClusterUrn(String clusterUrn) {
        this.clusterUrn = clusterUrn;
    }
}

