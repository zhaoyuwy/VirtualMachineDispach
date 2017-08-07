package com.huawei.siteapp.model;

import javax.persistence.*;

/**
 * Created by z00390414 on 2017/8/7.
 *
 * @version 1.0
 */
@Entity
@Table(name = "fc_mail")
public class MailModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long mailId = -1L;

    String addTime;
    boolean enableSSL;
    String fromAddr;
    String mailServer;
    String mailTitle;
    String SSLPort;
    String testAddr;
    String userName;
    String userPwd;

    public Long getMailId() {
        return mailId;
    }

    public void setMailId(Long mailId) {
        this.mailId = mailId;
    }

    public String getAddTime() {
        return addTime;
    }

    public void setAddTime(String addTime) {
        this.addTime = addTime;
    }

    public boolean isEnableSSL() {
        return enableSSL;
    }

    public void setEnableSSL(boolean enableSSL) {
        this.enableSSL = enableSSL;
    }

    public String getFromAddr() {
        return fromAddr;
    }

    public void setFromAddr(String fromAddr) {
        this.fromAddr = fromAddr;
    }

    public String getMailServer() {
        return mailServer;
    }

    public void setMailServer(String mailServer) {
        this.mailServer = mailServer;
    }

    public String getMailTitle() {
        return mailTitle;
    }

    public void setMailTitle(String mailTitle) {
        this.mailTitle = mailTitle;
    }

    public String getSSLPort() {
        return SSLPort;
    }

    public void setSSLPort(String SSLPort) {
        this.SSLPort = SSLPort;
    }

    public String getTestAddr() {
        return testAddr;
    }

    public void setTestAddr(String testAddr) {
        this.testAddr = testAddr;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPwd() {
        return userPwd;
    }

    public void setUserPwd(String userPwd) {
        this.userPwd = userPwd;
    }
}
