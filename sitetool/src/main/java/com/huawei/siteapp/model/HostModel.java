package com.huawei.siteapp.model;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by z00390414 on 2017/6/26.
 *
 * @version 1.0
 */
@Entity
@Table(name = "fc_hosts")
public class HostModel implements Serializable {

    @Id
//    @GeneratedValue
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long hostId = -1L;
    private Long clusterId;
    private Long siteId;

    public Long getClusterId() {
        return clusterId;
    }

    public void setClusterId(Long clusterId) {
        this.clusterId = clusterId;
    }

    public Long getSiteId() {
        return siteId;
    }

    public void setSiteId(Long siteId) {
        this.siteId = siteId;
    }

    private String hostIp;
    private String hostUri;
    private String hostUrn;
    private String hostName;
    private String clusterName;
    private String clusterUrn;

    public String getClusterUrn() {
        return clusterUrn;
    }

    public void setClusterUrn(String clusterUrn) {
        this.clusterUrn = clusterUrn;
    }

    private int hostAllocatedSizeMHz;
    private int hostTotalSizeMHz;
    private int hostAllocatedSizeMB;
    private int hostTotalSizeMB;


    private String time;

    public String getHostIp() {
        return hostIp;
    }

    public void setHostIp(String hostIp) {
        this.hostIp = hostIp;
    }

    public String getHostUri() {
        return hostUri;
    }

    public void setHostUri(String hostUri) {
        this.hostUri = hostUri;
    }

    public int getHostAllocatedSizeMHz() {
        return hostAllocatedSizeMHz;
    }

    public void setHostAllocatedSizeMHz(int hostAllocatedSizeMHz) {
        this.hostAllocatedSizeMHz = hostAllocatedSizeMHz;
    }

    public int getHostTotalSizeMHz() {
        return hostTotalSizeMHz;
    }

    public void setHostTotalSizeMHz(int hostTotalSizeMHz) {
        this.hostTotalSizeMHz = hostTotalSizeMHz;
    }

    public int getHostAllocatedSizeMB() {
        return hostAllocatedSizeMB;
    }

    public void setHostAllocatedSizeMB(int hostAllocatedSizeMB) {
        this.hostAllocatedSizeMB = hostAllocatedSizeMB;
    }

    public int getHostTotalSizeMB() {
        return hostTotalSizeMB;
    }

    public void setHostTotalSizeMB(int hostTotalSizeMB) {
        this.hostTotalSizeMB = hostTotalSizeMB;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getHostName() {
        return hostName;
    }

    public void setHostName(String hostName) {
        this.hostName = hostName;
    }

    public String getClusterName() {
        return clusterName;
    }

    public void setClusterName(String clusterName) {
        this.clusterName = clusterName;
    }

    public String getHostUrn() {
        return hostUrn;
    }

    public void setHostUrn(String hostUrn) {
        this.hostUrn = hostUrn;
    }
}
