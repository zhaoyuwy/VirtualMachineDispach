package com.huawei.siteapp.bean;

import java.util.List;

/**
 * Created by z00390414 on 2017/7/12.
 *
 * @version 1.0
 */
public class HostVmReportInfoBean<T> {
    private int total;
    private int hostOrVm;

    private String time;

    private int monitorUsedCpu;
    ;
    private int monitorUsedMem;


    private List<T> hostOrVmModels;

    HostVmReportInfoBean() {

    }

    public HostVmReportInfoBean(List<T> hostOrVmModels) {
        this.hostOrVmModels = hostOrVmModels;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getHostOrVm() {
        return hostOrVm;
    }

    public void setHostOrVm(int hostOrVm) {
        this.hostOrVm = hostOrVm;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getMonitorUsedCpu() {
        return monitorUsedCpu;
    }

    public void setMonitorUsedCpu(int monitorUsedCpu) {
        this.monitorUsedCpu = monitorUsedCpu;
    }

    public int getMonitorUsedMem() {
        return monitorUsedMem;
    }

    public void setMonitorUsedMem(int monitorUsedMem) {
        this.monitorUsedMem = monitorUsedMem;
    }

    public List<T> getHostOrVmModels() {
        return hostOrVmModels;
    }

    public void setHostOrVmModels(List<T> hostOrVmModels) {
        this.hostOrVmModels = hostOrVmModels;
    }

}
