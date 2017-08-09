package com.huawei.siteapp.model;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by z00390414 on 2017/6/27.
 *
 * @version 1.0
 */
@Entity
@Table(name = "fc_monitor_cna_info")
public class MonitorCnaInfoModel implements Serializable {
    @Id
//    @GeneratedValue
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long monitorCnaId = -1L;

    private Long hostId;
    private Long clusterId;
    private Long siteId;

    public Long getHostId() {
        return hostId;
    }

    public void setHostId(Long hostId) {
        this.hostId = hostId;
    }

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

    private String monitorObjectName;

    private String monitorObjectUrn;

    private String monitorCpuUsage;

    private String monitorMemUsage;

    private int monitorTotalCpu;
    private int monitorUsedCpu;

    private int monitorTotalMem;
    private int monitorUsedMem;





    private String time;

    public String getMonitorObjectName() {
        return monitorObjectName;
    }

    public void setMonitorObjectName(String monitorObjectName) {
        this.monitorObjectName = monitorObjectName;
    }

    public String getMonitorObjectUrn() {
        return monitorObjectUrn;
    }

    public void setMonitorObjectUrn(String monitorObjectUrn) {
        this.monitorObjectUrn = monitorObjectUrn;
    }

    public String getMonitorCpuUsage() {
        return monitorCpuUsage;
    }

    public void setMonitorCpuUsage(String monitorCpuUsage) {
        this.monitorCpuUsage = monitorCpuUsage;
    }

    public String getMonitorMemUsage() {
        return monitorMemUsage;
    }

    public void setMonitorMemUsage(String monitorMemUsage) {
        this.monitorMemUsage = monitorMemUsage;
    }

    public int getMonitorTotalCpu() {
        return monitorTotalCpu;
    }

    public void setMonitorTotalCpu(int monitorTotalCpu) {
        this.monitorTotalCpu = monitorTotalCpu;
    }

    public int getMonitorUsedCpu() {
        return monitorUsedCpu;
    }

    public void setMonitorUsedCpu(int monitorUsedCpu) {
        this.monitorUsedCpu = monitorUsedCpu;
    }

    public int getMonitorTotalMem() {
        return monitorTotalMem;
    }

    public void setMonitorTotalMem(int monitorTotalMem) {
        this.monitorTotalMem = monitorTotalMem;
    }

    public int getMonitorUsedMem() {
        return monitorUsedMem;
    }

    public void setMonitorUsedMem(int monitorUsedMem) {
        this.monitorUsedMem = monitorUsedMem;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
