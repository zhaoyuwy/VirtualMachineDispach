package com.huawei.siteapp.common.client;

import com.huawei.siteapp.common.util.ServiceContext;

import java.io.InputStream;
import java.io.OutputStream;

/**
 * Created by z00390414 on 2017/6/22.
 *
 * @version 1.0
 */
public interface IHandle {
    /**
     * <一句话功能简述> 处理输入流中的响应消息
     * <功能详细描述>
     *
     * @param cxt 执行上下文
     * @param in  输入流
     * @see [类、类#方法、类#成员]
     */
    void handle(ServiceContext cxt, InputStream in);

    /**
     * <一句话功能简述> 处理输出流中的响应消息
     * <功能详细描述>
     *
     * @param cxt 执行上下文
     * @param out 输出流
     * @see [类、类#方法、类#成员]
     */
    void handle(ServiceContext cxt, OutputStream out);
}
