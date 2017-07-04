package com.huawei.siteapp.configuration;

import com.huawei.siteapp.bean.Result;
import com.huawei.siteapp.common.constats.ExceptionEnum;
import com.huawei.siteapp.common.util.BusinessException;
import com.huawei.siteapp.common.util.ResultUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by z00390414 on 2017/7/4.
 *
 * @version 1.0
 */
@ControllerAdvice
public class ExceptionHandle {
    private final static Logger logger = LoggerFactory.getLogger(ExceptionHandle.class);

    /**
     * 判断错误是否是已定义的已知错误，不是则由未知错误代替，同时记录在log中
     * @param e
     * @return
     */
    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public Result exceptionGet(Exception e){
        if(e instanceof BusinessException){
            BusinessException MyException = (BusinessException) e;
            return ResultUtil.error(MyException.getCode(),MyException.getMessage());
        }

        logger.error("【系统异常】{}",e);
        return ResultUtil.error(ExceptionEnum.UNKNOW_ERROR);
    }
}
