package com.huawei.siteapp.bean;

/**
 * Created by z00390414 on 2017/7/12.
 *
 * @version 1.0
 */
public class HostInfoBean {
    private String monitorObjectName;

    private String monitorObjectUrn;

    private String monitorCpuUsage;

    private String monitorMemUsage;

    private int monitorTotalCpu;
    private int monitorUsedCpu;
    ;
    private int monitorTotalMem;
    private int monitorUsedMem;


    private String hostName;
    private String hostIp;
    private String clusterName;

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

    public String getHostName() {
        return hostName;
    }

    public void setHostName(String hostName) {
        this.hostName = hostName;
    }

    public String getHostIp() {
        return hostIp;
    }

    public void setHostIp(String hostIp) {
        this.hostIp = hostIp;
    }

    public String getClusterName() {
        return clusterName;
    }

    public void setClusterName(String clusterName) {
        this.clusterName = clusterName;
    }
}
