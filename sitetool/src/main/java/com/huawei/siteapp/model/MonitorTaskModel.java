package com.huawei.siteapp.model;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by z00390414 on 2017/7/5.
 *
 * @version 1.0
 */
@Entity
@Table(name = "fc_monitor_task")
public class MonitorTaskModel implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long taskId = -1L;
    private String taskName;
    private int taskType;
    private int taskPeriodTime;

    private String taskCreateTime;

    private String taskDescription;

    public Long getTaskId() {
        return taskId;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public int getTaskType() {
        return taskType;
    }

    public void setTaskType(int taskType) {
        this.taskType = taskType;
    }

    public int getTaskPeriodTime() {
        return taskPeriodTime;
    }

    public void setTaskPeriodTime(int taskPeriodTime) {
        this.taskPeriodTime = taskPeriodTime;
    }

    public String getTaskCreateTime() {
        return taskCreateTime;
    }

    public void setTaskCreateTime(String taskCreateTime) {
        this.taskCreateTime = taskCreateTime;
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }
}
