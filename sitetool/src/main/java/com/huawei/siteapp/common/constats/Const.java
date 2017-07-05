package com.huawei.siteapp.common.constats;

/**
 * Created by z00390414 on 2017/6/18.
 *
 * @version 1.0
 */
public interface Const {
    int DEFAULT_SECONDS_OF_TOKEN_TIME_OUT = 900;            // 900 seconds ---> 15 minutes

    int MIN_SECONDS_OF_TOKEN_TIME_OUT = 300;                // 300 seconds ---> 5 minutes

    String USER_CACHE = "userCache";
    String USER_CACHE_ID_ = "id_";
    String USER_CACHE_LOGIN_NAME_ = "ln";
    String USER_CACHE_LIST_BY_OFFICE_ID_ = "oid_";

    String CACHE_AUTH_INFO = "authInfo";
    String CACHE_ROLE_LIST = "roleList";
    String CACHE_MENU_LIST = "menuList";
    String CACHE_AREA_LIST = "areaList";
    String CACHE_OFFICE_LIST = "officeList";
    String CACHE_OFFICE_ALL_LIST = "officeAllList";


    String RETURN_CODE = "returnCode";
}
