package com.huawei.siteapp.common.client;

import com.huawei.siteapp.common.util.ServiceContext;

/**
 * Created by z00390414 on 2017/6/22.
 *
 * @version 1.0
 */
public interface IClient {

    /**
     * <一句话功能简述>与部件通信，使用默认的响应消息处理器
     * <功能详细描述>
     *
     * @param cxt 执行上下文
     * @return 响应码
     * @see [类、类#方法、类#成员]
     */
    int communicate(ServiceContext cxt);

    /**
     * <一句话功能简述>与部件通信，指定具体的响应消息处理类
     * <功能详细描述>
     *
     * @param cxt    执行上下文
     * @param handle 响应消息处理器
     * @return 响应码
     * @see [类、类#方法、类#成员]
     */
    int communicate(ServiceContext cxt, IHandle handle);
}
