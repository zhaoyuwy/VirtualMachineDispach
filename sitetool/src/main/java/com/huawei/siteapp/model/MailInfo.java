//package com.huawei.siteapp.model;
//
//
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.Id;
//import javax.persistence.Table;
//import java.io.Serializable;
//import java.sql.Timestamp;
//
///**
// * Created by z00390414 on 2017/6/15.
// *
// * @author z00390414
// * @version [版本号, 2017/6/15]
// */
//@Entity
//@Table(name="site_mail_info")
//public class MailInfo implements Serializable {
//
//    @Id
//    @GeneratedValue
//    @Column(name = "id")
//    private Long mail_id;
//
//    @Column(name = "tasking_id")
//    private Long taskingId;
//
//    @Column(name = "mail_server")
//    private String mailServer;
//
//    @Column(name = "ssl_port")
//    private String sslPort;
//
//    @Column(name = "enable_ssl")
//    private Boolean enableSsl;
//
//    @Column(name = "from_addr")
//    private String fromAddr;
//
//    @Column(name = "user_name")
//    private String userName;
//
//    @Column(name = "user_pwd")
//    private String userPwd;
//
//    @Column(name = "mail_title")
//    private String mailTitle;
//
//    @Column(name = "to_addr")
//    private String toAddr;
//
//    private String testAddr;
//
//    @Column(name = "add_time")
//    private Timestamp addTime;
//
//    public String getTestAddr() {
//        return testAddr;
//    }
//
//    public void setTestAddr(String testAddr) {
//        this.testAddr = testAddr;
//    }
//
//    public Long getMail_id() {
//        return mail_id;
//    }
//
//    public void setMail_id(Long mail_id) {
//        this.mail_id = mail_id;
//    }
//
//    public Long getTaskingId() {
//        return taskingId;
//    }
//
//    public void setTaskingId(Long taskingId) {
//        this.taskingId = taskingId;
//    }
//
//    public String getMailServer() {
//        return mailServer;
//    }
//
//    public void setMailServer(String mailServer) {
//        this.mailServer = mailServer;
//    }
//
//    public String getSslPort() {
//        return sslPort;
//    }
//
//    public void setSslPort(String sslPort) {
//        this.sslPort = sslPort;
//    }
//
//    public Boolean getEnableSsl() {
//        return enableSsl;
//    }
//
//    public void setEnableSsl(Boolean enableSsl) {
//        this.enableSsl = enableSsl;
//    }
//
//    public String getUserName() {
//        return userName;
//    }
//
//    public void setUserName(String userName) {
//        this.userName = userName;
//    }
//
//    public String getUserPwd() {
//        return userPwd;
//    }
//
//    public void setUserPwd(String userPwd) {
//        this.userPwd = userPwd;
//    }
//
//    public String getMailTitle() {
//        return mailTitle;
//    }
//
//    public void setMailTitle(String mailTitle) {
//        this.mailTitle = mailTitle;
//    }
//
//    public String getFromAddr() {
//        return fromAddr;
//    }
//
//    public void setFromAddr(String fromAddr) {
//        this.fromAddr = fromAddr;
//    }
//
//    public String getToAddr() {
//        return toAddr;
//    }
//
//    public void setToAddr(String toAddr) {
//        this.toAddr = toAddr;
//    }
//
//    public Timestamp getAddTime() {
//        return addTime;
//    }
//
//    public void setAddTime(Timestamp addTime) {
//        this.addTime = addTime;
//    }
//
//    public String getAddTimeString()
//    {
//        if(addTime == null)
//            return null;
//        else
//            return String.valueOf(addTime.getTime());
//    }
//}
