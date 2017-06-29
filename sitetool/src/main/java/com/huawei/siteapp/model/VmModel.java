package com.huawei.siteapp.model;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by z00390414 on 2017/6/29.
 *
 * @version 1.0
 */
@Entity
@Table(name = "fc_vms")
public class VmModel implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long vmId = -1L;

    private String vmName;
    private String clusterUrn;
    private String clusterName;

    private String vmLocation;
    private String vmStatus;
    private String vmCreateTime;

    private String vmUuid;
    private String hostName;
    private String vmUri;

    private String vmUrn;
    private boolean isTemplate;
    private String vmDescription;

    public Long getVmId() {
        return vmId;
    }

    public String getClusterName() {
        return clusterName;
    }

    public void setClusterName(String clusterName) {
        this.clusterName = clusterName;
    }

    public String getVmName() {
        return vmName;
    }

    public void setVmName(String vmName) {
        this.vmName = vmName;
    }

    public String getClusterUrn() {
        return clusterUrn;
    }

    public void setClusterUrn(String clusterUrn) {
        this.clusterUrn = clusterUrn;
    }

    public String getVmLocation() {
        return vmLocation;
    }

    public void setVmLocation(String vmLocation) {
        this.vmLocation = vmLocation;
    }

    public String getVmStatus() {
        return vmStatus;
    }

    public void setVmStatus(String vmStatus) {
        this.vmStatus = vmStatus;
    }

    public String getVmCreateTime() {
        return vmCreateTime;
    }

    public void setVmCreateTime(String vmCreateTime) {
        this.vmCreateTime = vmCreateTime;
    }

    public String getVmUuid() {
        return vmUuid;
    }

    public void setVmUuid(String vmUuid) {
        this.vmUuid = vmUuid;
    }

    public String getHostName() {
        return hostName;
    }

    public void setHostName(String hostName) {
        this.hostName = hostName;
    }

    public String getVmUri() {
        return vmUri;
    }

    public void setVmUri(String vmUri) {
        this.vmUri = vmUri;
    }

    public String getVmUrn() {
        return vmUrn;
    }

    public void setVmUrn(String vmUrn) {
        this.vmUrn = vmUrn;
    }

    public boolean isTemplate() {
        return isTemplate;
    }

    public void setTemplate(boolean template) {
        isTemplate = template;
    }

    public String getVmDescription() {
        return vmDescription;
    }

    public void setVmDescription(String vmDescription) {
        this.vmDescription = vmDescription;
    }
}
