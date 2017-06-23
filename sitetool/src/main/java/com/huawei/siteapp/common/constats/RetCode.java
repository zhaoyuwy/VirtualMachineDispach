package com.huawei.siteapp.common.constats;

/**
 * Created by z00390414 on 2017/6/22.
 *
 * @version 1.0
 */
public interface RetCode {
    int LOGIN_ERROR = 1;
    int UN_AUTHORIZED = 401;
    int OK = 200;
    int INNER_ERROR = 400;
    int REST_CONNECT_TIME_OUT = 7008;
    int REST_IO_ERROR = 7001;
    int PARSE_RESPONSE_JSON_ERROR=7002;
    int RSET_FAILED = 7003;
}
