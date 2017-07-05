package com.huawei.siteapp.common.util;

import com.huawei.siteapp.common.constats.ExceptionEnum;

/**
 * Created by z00390414 on 2017/7/4.
 *
 * @version 1.0
 */
public class BusinessException extends RuntimeException {
    private static final long serialVersionUID = 3152616724785436891L;

    public BusinessException(String frdMessage)
    {
        super(createFriendlyErrMsg(frdMessage));
    }

    public BusinessException(Throwable throwable)
    {
        super(throwable);
    }

    public BusinessException(Throwable throwable, String frdMessage)
    {
        super(throwable);
    }

    private static String createFriendlyErrMsg(String msgBody)
    {
        String prefixStr = "抱歉，";
        String suffixStr = " 请稍后再试或与管理员联系！";

        StringBuffer friendlyErrMsg = new StringBuffer("");

        friendlyErrMsg.append(prefixStr);

        friendlyErrMsg.append(msgBody);

        friendlyErrMsg.append(suffixStr);

        return friendlyErrMsg.toString();
    }

    private Integer code;

    /**
     * 继承exception，加入错误状态值
     * @param exceptionEnum
     */
    public BusinessException(ExceptionEnum exceptionEnum) {
        super(exceptionEnum.getMsg());
        this.code = exceptionEnum.getCode();
    }

    /**
     * 自定义错误信息
     * @param message
     * @param code
     */
    public BusinessException(String message, Integer code) {
        super(message);
        this.code = code;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }
}
