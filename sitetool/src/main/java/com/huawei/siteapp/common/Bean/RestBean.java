package com.huawei.siteapp.common.Bean;

/**
 * Created by z00390414 on 2017/6/15.
 *
 * @author z00390414
 * @version [版本号, 2017/6/15]
 */
public class RestBean {
    private String vrmIp;

    private String restPort;

    private String token;

    private String restUserName;

    private String restPassword;

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

    public String getRestUserName() {
        return restUserName;
    }

    public void setRestUserName(String restUserName) {
        this.restUserName = restUserName;
    }

    public String getRestPassword() {
        return restPassword;
    }

    public void setRestPassword(String restPassword) {
        this.restPassword = restPassword;
    }
    public String toString()
    {
        StringBuffer buffer = new StringBuffer();
        buffer.append("vrmIp:")
                .append(vrmIp)
                .append(",restPort:")
                .append(restPort)
                .append(",restUserName:")
                .append(restUserName);
        return buffer.toString();
    }
}
