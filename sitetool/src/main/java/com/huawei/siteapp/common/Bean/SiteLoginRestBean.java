package com.huawei.siteapp.common.Bean;

/**
 * Created by z00390414 on 2017/6/15.
 *
 * @author z00390414
 * @version [版本号, 2017/6/15]
 */
public class SiteLoginRestBean {
    private String vrmIp;

    private String restPort;

    private String token;

    private String siteLoginUser;

    private String siteLoginPwd;

    private String restSiteUri;

    private String siteRegionName;
    private String siteLoginIp;
    private Long siteGroupId;

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

    public Long getSiteGroupId() {
        return siteGroupId;
    }

    public void setSiteGroupId(Long siteGroupId) {
        this.siteGroupId = siteGroupId;
    }

    public String getRestSiteUri() {
        return restSiteUri;
    }

    public void setRestSiteUri(String restSiteUri) {
        this.restSiteUri = restSiteUri;
    }

    private String restBody;

    public String getVrmIp() {
        return vrmIp;
    }

    public void setVrmIp(String vrmIp) {
        this.vrmIp = vrmIp;
    }

    public String getRestPort() {
        return restPort;
    }

    public void setRestPort(String restPort) {
        this.restPort = restPort;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getSiteLoginUser() {
        return siteLoginUser;
    }


    public void setSiteLoginUser(String siteLoginUser) {
        this.siteLoginUser = siteLoginUser;
    }

    public String getSiteLoginPwd() {
        return siteLoginPwd;
    }

    public void setSiteLoginPwd(String siteLoginPwd) {
        this.siteLoginPwd = siteLoginPwd;
    }

    public String getRestBody() {
        return restBody;
    }

    public void setRestBody(String restBody) {
        this.restBody = restBody;
    }

    @Override
    public String toString()
    {
        StringBuffer buffer = new StringBuffer();
        buffer.append("siteRegionName:")
                .append(siteRegionName)
                .append("siteLoginIp：")
                .append(siteLoginIp)
                .append(",restPort:")
                .append(restPort)
                .append(",siteLoginUser:")
                .append(siteLoginUser);
        return buffer.toString();
    }
}
