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

    private double monitorCpuUsage;
    ;

    public double getMonitorCpuUsage() {
        return monitorCpuUsage;
    }

    public void setMonitorCpuUsage(double monitorCpuUsage) {
        this.monitorCpuUsage = monitorCpuUsage;
    }

    public double getMonitorMemUsage() {
        return monitorMemUsage;
    }

    public void setMonitorMemUsage(double monitorMemUsage) {
        this.monitorMemUsage = monitorMemUsage;
    }

    private double monitorMemUsage;

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

    public List<T> getHostOrVmModels() {
        return hostOrVmModels;
    }

    public void setHostOrVmModels(List<T> hostOrVmModels) {
        this.hostOrVmModels = hostOrVmModels;
    }

}
