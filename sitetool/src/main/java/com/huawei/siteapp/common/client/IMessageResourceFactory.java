package com.huawei.siteapp.common.client;

/**
 * Created by z00390414 on 2017/6/22.
 *
 * @version 1.0
 */
public interface IMessageResourceFactory {
    String getTaskStatus(String key);

    /**
     * <一句话功能简述>查询任务状态的的国际化描述
     * <功能详细描述>
     *
     * @param key  状态码
     * @param args 参数
     * @return 状态描述
     * @see [类、类#方法、类#成员]
     */
    String getTaskStatus(String key, Object[] args);

    /**
     * <一句话功能简述>查询错误码对应的的国际化描述
     * <功能详细描述>
     *
     * @param key 错误码
     * @return 状态描述
     * @see [类、类#方法、类#成员]
     */
    String getErrorCodeDesc(String key);


    void saveErrCodeAndDesc(String errCode, String errDesc);

    String getLangDesc();
}
