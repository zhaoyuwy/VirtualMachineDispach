package com.huawei.siteapp.common.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.ThrowsAdvice;
import org.springframework.dao.DataAccessException;

import java.io.IOException;
import java.lang.reflect.Method;
import java.sql.SQLException;

/**
 * Created by z00390414 on 2017/7/4.
 *
 * @version 1.0
 */
public class ExceptionAdvisor implements ThrowsAdvice {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    public void afterThrowing(Method method, Object[] args, Object target,
                              Exception ex) throws Throwable
    {
        // 在后台中输出错误异常异常信息，通过log4j输出。
        logger.info("**************************************************************");
        logger.info("Error happened in class: " + target.getClass().getName());
        logger.info("Error happened in method: " + method.getName());
        for (int i = 0; i < args.length; i++)
        {
            logger.info("arg[" + i + "]: " + args[i]);
        }
        logger.info("Exception class: " + ex.getClass().getName());
        logger.info("ex.getMessage():" + ex.getMessage());
        ex.printStackTrace();
        logger.info("**************************************************************");

        // 在这里判断异常，根据不同的异常返回错误。
        if (ex.getClass().equals(DataAccessException.class))
        {
            ex.printStackTrace();
            throw new BusinessException("数据库操作失败！");
        } else if (ex.getClass().toString().equals(
                NullPointerException.class.toString()))
        {
            ex.printStackTrace();
            throw new BusinessException("调用了未经初始化的对象或者是不存在的对象！");
        } else if (ex.getClass().equals(IOException.class))
        {
            ex.printStackTrace();
            throw new BusinessException("IO异常！");
        } else if (ex.getClass().equals(ClassNotFoundException.class))
        {
            ex.printStackTrace();
            throw new BusinessException("指定的类不存在！");
        } else if (ex.getClass().equals(ArithmeticException.class))
        {
            ex.printStackTrace();
            throw new BusinessException("数学运算异常！");
        } else if (ex.getClass().equals(ArrayIndexOutOfBoundsException.class))
        {
            ex.printStackTrace();
            throw new BusinessException("数组下标越界!");
        } else if (ex.getClass().equals(IllegalArgumentException.class))
        {
            ex.printStackTrace();
            throw new BusinessException("方法的参数错误！");
        } else if (ex.getClass().equals(ClassCastException.class))
        {
            ex.printStackTrace();
            throw new BusinessException("类型强制转换错误！");
        } else if (ex.getClass().equals(SecurityException.class))
        {
            ex.printStackTrace();
            throw new BusinessException("违背安全原则异常！");
        } else if (ex.getClass().equals(SQLException.class))
        {
            ex.printStackTrace();
            throw new BusinessException("操作数据库异常！");
        } else if (ex.getClass().equals(NoSuchMethodError.class))
        {
            ex.printStackTrace();
            throw new BusinessException("方法末找到异常！");
        } else if (ex.getClass().equals(InternalError.class))
        {
            ex.printStackTrace();
            throw new BusinessException("Java虚拟机发生了内部错误");
        } else
        {
            ex.printStackTrace();
            throw new BusinessException("程序内部错误，操作失败！" + ex.getMessage());
        }
    }
}
