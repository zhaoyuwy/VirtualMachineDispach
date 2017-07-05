package com.huawei.siteapp.common.constats;

/**
 * Created by z00390414 on 2017/6/22.
 *
 * @version 1.0
 */
public interface RetCode {
    int INIT_ERROR = -1;
    int LOGIN_ERROR = 1;
    int UN_AUTHORIZED = 401;
    int OK = 200;
    int INNER_ERROR = 400;
    int REST_CONNECT_TIME_OUT = 7008;
    int REST_IO_ERROR = 7001;
    int PARSE_RESPONSE_JSON_ERROR = 7002;
    int RSET_FAILED = 7003;

    // 字段1600 到1700用户操作使用
    //账户已锁定
    int LOGIN_LOCKED_ALLREADY = 1601;
    //登录失败
    int LOGIN_FAILED = 1602;
    //首次登录
    int LOGIN_FIRST = 1603;
    //登陆成功
    int LOGIN_SUCCESS = 1604;
    //登录锁定
    int LOGIN_LOCKED = 1605;

    //两次输入的密码不相同
    int RESET_PWD_NOT_SAME = 1606;


}
