package com.huawei.siteapp.model;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by z00390414 on 2017/7/14.
 *
 * @version 1.0
 */
@Entity
@Table(name = "fc_period_task")
public class PeriodTaskModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long periodTaskId = -1L;

    private String taskName;
    private String siteRegionName;
    private String siteRegion;
    private String siteLoginIp;
    private int taskType;
    private String periodTime;
    private boolean isSendEmail;


    private String taskCompleteInfo;
    private int taskStatus;
    private String taskStartTime;
    private String taskEndTime;
    private long siteId;

    public long getSiteId() {
        return siteId;
    }

    public void setSiteId(long siteId) {
        this.siteId = siteId;
    }

    public Long getPeriodTaskId() {
        return periodTaskId;
    }

    public void setPeriodTaskId(Long periodTaskId) {
        this.periodTaskId = periodTaskId;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getSiteRegionName() {
        return siteRegionName;
    }

    public void setSiteRegionName(String siteRegionName) {
        this.siteRegionName = siteRegionName;
    }

    public String getSiteRegion() {
        return siteRegion;
    }

    public void setSiteRegion(String siteRegion) {
        this.siteRegion = siteRegion;
    }

    public String getSiteLoginIp() {
        return siteLoginIp;
    }

    public void setSiteLoginIp(String siteLoginIp) {
        this.siteLoginIp = siteLoginIp;
    }

    public int getTaskType() {
        return taskType;
    }

    public void setTaskType(int taskType) {
        this.taskType = taskType;
    }

    public String getPeriodTime() {
        return periodTime;
    }

    public void setPeriodTime(String periodTime) {
        this.periodTime = periodTime;
    }

    public int getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(int taskStatus) {
        this.taskStatus = taskStatus;
    }

    public String getTaskCompleteInfo() {
        return taskCompleteInfo;
    }

    public void setTaskCompleteInfo(String taskCompleteInfo) {
        this.taskCompleteInfo = taskCompleteInfo;
    }

    public boolean isSendEmail() {
        return isSendEmail;
    }

    public void setSendEmail(boolean sendEmail) {
        isSendEmail = sendEmail;
    }

    public String getTaskStartTime() {
        return taskStartTime;
    }

    public void setTaskStartTime(String taskStartTime) {
        this.taskStartTime = taskStartTime;
    }

    public String getTaskEndTime() {
        return taskEndTime;
    }

    public void setTaskEndTime(String taskEndTime) {
        this.taskEndTime = taskEndTime;
    }

    @Override
    public String toString() {
//        return "Student [id=" + id + ", name=" + name + ", age=" + age + "]";
        return
                "periodTask [taskName = " + taskName + ", siteRegionName = " + siteRegionName + ", siteRegion = " + siteRegion
                        + ", siteLoginIp = " + siteLoginIp + ", isSendEmail = " + isSendEmail+"]";
    }


}
