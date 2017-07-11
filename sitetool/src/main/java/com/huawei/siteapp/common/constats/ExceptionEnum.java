package com.huawei.siteapp.common.constats;

/**
 * Created by z00390414 on 2017/7/4.
 *
 * @version 1.0
 */
public enum ExceptionEnum {
    UNKNOW_ERROR(-1, "unknown error"),
    USER_LOGIN_ERROR(6001,"user login failed"),
    USER_NOT_FIND(6002, "user not exist");

    private Integer code;

    private String msg;

    ExceptionEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public Integer getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}
