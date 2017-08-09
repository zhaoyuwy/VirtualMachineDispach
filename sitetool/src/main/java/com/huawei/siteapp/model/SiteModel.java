package com.huawei.siteapp.model;


import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by z00390414 on 2017/6/16.
 *
 * @author z00390414
 * @version [版本号, 2017/6/16]
 */
@Entity
@Table(name = "fc_sites")
//@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SiteModel implements Serializable {
    public void setSiteId(Long siteId) {
        this.siteId = siteId;
    }

    @Id
//    @GeneratedValue
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long siteId = -1L;

    private String siteUrn;

    private String siteUri;

    private String siteName;


    private String siteIp;

    private boolean siteIsDC;

    private boolean siteIsSelf;

    private String siteStatus;

    private String siteLoginUser;
    @JSONField(serialize = false)
    private String siteLoginPwd;
    private String siteLoginIp;
    private String siteRegionName;
    private String siteRegion;

    public String getSiteRegion() {
        return siteRegion;
    }

    public void setSiteRegion(String siteRegion) {
        this.siteRegion = siteRegion;
    }

    private Long siteGroupId;

    public Long getSiteGroupId() {
        return siteGroupId;
    }

    public void setSiteGroupId(Long siteGroupId) {
        this.siteGroupId = siteGroupId;
    }

    public String getSiteRegionName() {
        return siteRegionName;
    }

    public void setSiteRegionName(String siteRegionName) {
        this.siteRegionName = siteRegionName;
    }

    public String getSiteLoginIp() {
        return siteLoginIp;
    }

    public void setSiteLoginIp(String siteLoginIp) {
        this.siteLoginIp = siteLoginIp;
    }

    public String getSiteLoginUser() {
        return siteLoginUser;
    }

    public void setSiteLoginUser(String siteLoginUser) {
        this.siteLoginUser = siteLoginUser;
    }

    @JsonIgnore
    @JsonProperty(value = "site_login_pwd")
    public String getSiteLoginPwd() {
        return siteLoginPwd;
    }

    public void setSiteLoginPwd(String siteLoginPwd) {
        this.siteLoginPwd = siteLoginPwd;
    }

    public Long getSiteId() {
        return siteId;
    }

    public String getSiteUrn() {
        return siteUrn;
    }

    public void setSiteUrn(String siteUrn) {
        this.siteUrn = siteUrn;
    }

    public String getSiteUri() {
        return siteUri;
    }

    public void setSiteUri(String siteUri) {
        this.siteUri = siteUri;
    }

    public String getSiteName() {
        return siteName;
    }

    public void setSiteName(String siteName) {
        this.siteName = siteName;
    }

    public String getSiteIp() {
        return siteIp;
    }

    public void setSiteIp(String siteIp) {
        this.siteIp = siteIp;
    }

    public boolean getSiteIsDC() {
        return siteIsDC;
    }

    public void setSiteIsDC(boolean siteIsDC) {
        this.siteIsDC = siteIsDC;
    }

    public boolean getSiteIsSelf() {
        return siteIsSelf;
    }

    public void setSiteIsSelf(boolean siteIsSelf) {
        this.siteIsSelf = siteIsSelf;
    }

    public String getSiteStatus() {
        return siteStatus;
    }

    public void setSiteStatus(String siteStatus) {
        this.siteStatus = siteStatus;
    }

    @Override
    public String toString() {
        return "SiteModel [siteRegionName=" + siteRegionName + ", siteRegion=" + siteRegion + ", siteIp=" + siteIp + ", siteLoginUser=" + siteLoginUser + "]";
    }
}
