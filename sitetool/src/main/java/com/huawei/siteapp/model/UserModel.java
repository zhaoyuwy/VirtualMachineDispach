package com.huawei.siteapp.model;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by z00390414 on 2017/6/28.
 *
 * @version 1.0
 */
@Entity
@Table(name = "fc_users")
public class UserModel implements Serializable {
    @Id
//    @GeneratedValue
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId = -1L;
    private String userName;
    private String userPwd;
//    private String newPassword;	// 新密码
    private String userEmail;
    private int userType;
//    private String loginIp;	// 最后登陆IP
//    private Date loginDate;	// 最后登陆日期
//    private String loginFlag;	// 是否允许登陆
//    private String oldLoginIp;	// 上次登陆IP
//    private Date oldLoginDate;	// 上次登陆日期

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
