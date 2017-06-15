package com.huawei.siteapp.common.util;

import org.apache.log4j.Logger;

import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

/**
 * Created by z00390414 on 2017/6/15.
 *
 * @author z00390414
 * @version [版本号, 2017/6/15]
 */
public class CommonUtils {
    private static final long SECOND = 1000;

    private static final Logger logger = Logger.getLogger(CommonUtils.class);

    private static final String loginRegexp = "[a-zA-Z0-9-_]";

    private static final Pattern loginPatern = Pattern.compile(loginRegexp);
    /**
     * <默认构造函数>
     */
    private CommonUtils()
    {
    }

    /**
     * <功能简述>检查参数是否为空
     * <br><br>
     * <功能详细描述>
     * @param str 待检查的参数
     * @return boolean
     * @see [类、类#方法、类#成员]
     */
    public static boolean isNull(String str)
    {
        return str == null || "".equals(str);
    }

    /**
     * <功能简述>检查参数是否为空
     * <br><br>
     * <功能详细描述>
     * @param str 待检查的参数
     * @return boolean
     * @see [类、类#方法、类#成员]
     */
    public static boolean isNull(Object str)
    {
        return str == null || "".equals(str);
    }

    /**
     * <功能简述>检查参数是否为空
     * <br><br>
     * <功能详细描述>
     * @param str 待检查的参数
     * @return boolean
     * @see [类、类#方法、类#成员]
     */
    public static boolean isNullObject(Object str)
    {
        return str == null;
    }

    /**
     * <功能简述>检查Map类型的参数是否为空
     * <br><br>
     * <功能详细描述>
     * @return boolean
     * @see [类、类#方法、类#成员]
     */
    public static boolean isNull(List list)
    {
        return list == null || list.isEmpty();
    }

    /**
     * <功能简述>检查Map类型的参数是否为空
     * <br><br>
     * <功能详细描述>
     * @param map 待检查的参数
     * @return boolean
     * @see [类、类#方法、类#成员]
     */
    public static boolean isNull(Map map)
    {
        return map == null || map.isEmpty();
    }

    /**
     * <功能简述>当输入的参数为Null时返回空，否则返回原来的值
     * <br><br>
     * <功能详细描述>
     * @param str      输入参数
     * @return String  转换后结果
     * @see [类、类#方法、类#成员]
     */
    public static String getEmptyIfNull(Object str)
    {
        if (null == str)
        {
            return "";
        }
        try
        {
            return getEmptyIfNull(String.valueOf(str));
        }
        catch (Exception e)
        {
            // TODO: handle exception
            logger.error(e.getMessage());
            return "";
        }
    }
}
