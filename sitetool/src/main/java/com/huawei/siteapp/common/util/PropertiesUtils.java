package com.huawei.siteapp.common.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * Created by z00390414 on 2017/6/15.
 *
 * @author z00390414
 * @version [版本号, 2017/6/15]
 */
public class PropertiesUtils {
    private static final Logger logger =  LoggerFactory.getLogger(PropertiesUtils.class);
    private static final String TOOL_CONFIG = "url.properties";
    private static final String PARAM_NAME_REGEX = "\\{[a-zA-Z0-9]*\\}";



    private static Properties config = new Properties();
    static
    {
        InputStream in = null;

        try
        {
            ClassLoader classloader = PropertiesUtils.class.getClassLoader();
            if(classloader != null){
                in = classloader.getResourceAsStream(TOOL_CONFIG);
                config.load(in);
            }
        }
        catch (FileNotFoundException e)
        {
            logger.error("url.properties not found error.");
        }
        catch (IOException e)
        {
            logger.error("", e);
        }
        finally
        {
            if (in != null)
            {
                try
                {
                    in.close();
                }
                catch (IOException e)
                {
                    logger.error("", e);
                }
            }
        }
    }
    /**
     * <一句话功能简述>查找配置信息 <功能详细描述>
     *
     * @param key 键
     * @return value
     * @see [类、类#方法、类#成员]
     */
    public static synchronized String get(String key)
    {
        if(CommonUtils.isNull(key))
        {
            return null;
        }

        return config.getProperty(key);
    }
    
    /**
     * <一句话功能简述>根据键值和参数查询对应的URL
     * <功能详细描述>
     * @param key 键值
     * @param args 参数
     * @return 拼接后的url
     * @see [类、类#方法、类#成员]
     */
    public static String getUrl(String key, String... args)
    {
        String url = get(key);
        if (!CommonUtils.isNull(url))
        {
            for (String arg : args)
            {
                if (CommonUtils.isNull(arg))
                {
                    arg = "";
                }
                url = url.replaceFirst(PARAM_NAME_REGEX, arg);
            }
        }
        return url;
    }

    public static synchronized int getInt(String key)
    {
        try
        {
            return Integer.parseInt(config.getProperty(key).trim());
        }
        catch (Exception e)
        {
            if(CommonUtils.isNull(key))
            {
                logger.error("key is null.");
                return 0;
            }

            logger.error(key + "'s value is not integer,value=" + config.getProperty(key), e);
            return 0;
        }
    }

    /**
     * <一句话功能简述>置入配置信息
     * <功能详细描述>
     * @param key 键
     * @param value 值
     * @see [类、类#方法、类#成员]
     */
    public static synchronized void put(String key, String value)
    {
        if(CommonUtils.isNull(key))
        {
            return;
        }

        config.put(key, value);
    }
}
