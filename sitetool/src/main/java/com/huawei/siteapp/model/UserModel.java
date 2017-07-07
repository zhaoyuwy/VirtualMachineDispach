package com.huawei.siteapp.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by z00390414 on 2017/6/28.
 *
 * @version 1.0
 */
@Entity
@Table(name = "fc_users")
public class UserModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="user_id")
    private Long userId = -1L;
    private String userName;
    private String userPwd;
    private String userOldPwd;	// 旧密码
    private String userEmail;
    private int userType;
    private String userLoginIp;	// 最后登陆IP
    private Date userLoginDate;	// 最后登陆日期
    private String userLoginFlag;	// 是否允许登陆
    private String userOldLoginIp;	// 上次登陆IP
    private Date userOldLoginDate;	// 上次登陆日期

    public String getUserOldPwd() {
        return userOldPwd;
    }

    public void setUserOldPwd(String userOldPwd) {
        this.userOldPwd = userOldPwd;
    }

    public String getUserLoginIp() {
        return userLoginIp;
    }

    public void setUserLoginIp(String userLoginIp) {
        this.userLoginIp = userLoginIp;
    }

    public Date getUserLoginDate() {
        return userLoginDate;
    }

    public void setUserLoginDate(Date userLoginDate) {
        this.userLoginDate = userLoginDate;
    }

    public String getUserLoginFlag() {
        return userLoginFlag;
    }

    public void setUserLoginFlag(String userLoginFlag) {
        this.userLoginFlag = userLoginFlag;
    }

    public String getUserOldLoginIp() {
        return userOldLoginIp;
    }

    public void setUserOldLoginIp(String userOldLoginIp) {
        this.userOldLoginIp = userOldLoginIp;
    }

    public Date getUserOldLoginDate() {
        return userOldLoginDate;
    }

    public void setUserOldLoginDate(Date userOldLoginDate) {
        this.userOldLoginDate = userOldLoginDate;
    }

    public Long getUserId() {
        return userId;
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

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public int getUserType() {
        return userType;
    }

    public void setUserType(int userType) {
        this.userType = userType;
    }

    @Override
    public String toString() {
        return "PersonModel [userId=" + userId + ", userName=" + userName + ", userType=" + userType + ", userEmail=" + userEmail + "]";
    }
}
