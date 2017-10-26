package com.huawei.siteapp.model;

/**
 * Created by z00390414 on 2017/7/3.
 *
 * @version 1.0
 */
public class MachineModel {
    String machineName;
    String regionName;
    String operationSystem;
    String machineCpu;
    String machineMem;
    String sysDisk;
    String dataDist;
    String netWok;
    String applicant;
    String description;

    public String getMachineName() {
        return machineName;
    }

    public void setMachineName(String machineName) {
        this.machineName = machineName;
    }

    public String getRegionName() {
        return regionName;
    }

    public void setRegionName(String regionName) {
        this.regionName = regionName;
    }

    public String getOperationSystem() {
        return operationSystem;
    }

    public void setOperationSystem(String operationSystem) {
        this.operationSystem = operationSystem;
    }

    public String getMachineCpu() {
        return machineCpu;
    }

    public void setMachineCpu(String machineCpu) {
        this.machineCpu = machineCpu;
    }

    public String getMachineMem() {
        return machineMem;
    }

    public void setMachineMem(String machineMem) {
        this.machineMem = machineMem;
    }

    public String getSysDisk() {
        return sysDisk;
    }

    public void setSysDisk(String sysDisk) {
        this.sysDisk = sysDisk;
    }

    public String getDataDist() {
        return dataDist;
    }

    public void setDataDist(String dataDist) {
        this.dataDist = dataDist;
    }

    public String getNetWok() {
        return netWok;
    }

    public void setNetWok(String netWok) {
        this.netWok = netWok;
    }

    public String getApplicant() {
        return applicant;
    }

    public void setApplicant(String applicant) {
        this.applicant = applicant;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString(){
        return "Machine Info "+machineName+"\t \t\t"+ regionName+"\t "+machineCpu;
    }
}
