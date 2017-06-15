package com.huawei.siteapp.common.util;

import com.huawei.siteapp.common.constats.ParamKey;

import javax.xml.crypto.Data;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * Created by z00390414 on 2017/6/15.
 *
 * @author z00390414
 * @version [版本号, 2017/6/15]
 */
public class ServiceContext {
    /**
     * 参数和值的键值对
     */
    private HashMap<String, Object> data = null;

    /**
     * <默认构造函数>
     */
    public ServiceContext() {
        data = new HashMap<String, Object>();

    }

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data.putAll(data);

    }

    /**
     * <一句话功能简述>检查是否包含对于指定的键的映射关系
     * <功能详细描述>
     *
     * @param key 键名
     * @return 是否含该键值
     * @see [类、类#方法、类#成员]
     */
    public boolean containsKey(String key) {
        if (data.containsKey(key)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * <一句话功能简述> 提取参数的值
     * <功能详细描述>
     *
     * @param key 参数名
     * @return 参数的值
     * @see [类、类#方法、类#成员]
     */
    public String getString(String key) {

        return CommonUtils.getEmptyIfNull(get(key));
    }

    /**
     * <一句话功能简述>查询错误码，如果错误码为空，则返回响应码
     * <功能详细描述>
     *
     * @param retCode 响应码，
     * @return 错误码
     * @see [类、类#方法、类#成员]
     */
    public String getErrCode(int retCode) {
        String errCode = getString(ParamKey.ERROR_CODE);

        if (CommonUtils.isNull(errCode)) {
            return "" + retCode;
        }
        return errCode;
    }

    /**
     * <一句话功能简述>提取int类型的参数
     * <功能详细描述>
     *
     * @param key 参数名
     * @return 参数的值
     * @see [类、类#方法、类#成员]
     */
    public int getInt(String key) {

        if (data.containsKey(key)) {
            try {
                return Integer.parseInt(getString(key));
            } catch (Exception e) {
                // TODO: handle exception
                return -1;
            }
        }

        return -1;
    }

    /**
     * <一句话功能简述>提取Long类型的参数
     * <功能详细描述>
     *
     * @param key 参数名
     * @return 参数的值
     * @see [类、类#方法、类#成员]
     */
    public long getLong(String key) {

        if (data.containsKey(key)) {
            try {
                return Long.parseLong(getString(key));
            } catch (Exception e) {
                // TODO: handle exception
                return -1;
            }
        }
        return -1;
    }

    /**
     * <一句话功能简述>提取int类型参数的值，如果参数不存在则返回默认值
     * <功能详细描述>
     *
     * @param key          参数名
     * @param defaultValue 默认值
     * @return 参数的值
     * @see [类、类#方法、类#成员]
     */
    public int getInt(String key, int defaultValue) {

        if (data.containsKey(key)) {
            try {
                return Integer.parseInt(getString(key));
            } catch (Exception e) {
                // TODO: handle exception
                return -1;
            }
        }

        return defaultValue;
    }

    /**
     * <一句话功能简述>提取参数的值，如果参数不存在，就使用默认值
     * <功能详细描述>
     *
     * @param key          参数名
     * @param defaultValue 默认值
     * @return 参数的值
     * @see [类、类#方法、类#成员]
     */
    public String getString(String key, String defaultValue) {

        if (data.containsKey(key)) {
            return String.valueOf(data.get(key));
        }

        return defaultValue;
    }

    /**
     * <一句话功能简述>获取参数
     * <功能详细描述>
     *
     * @param key 主键
     * @return 参数的值
     * @see [类、类#方法、类#成员]
     */
    public Object get(String key) {

        if (data.containsKey(key)) {
            return data.get(key);
        }
        return null;
    }

    /**
     * <一句话功能简述> 保存参数
     * <功能详细描述>
     *
     * @param key   主键
     * @param value 值
     * @see [类、类#方法、类#成员]
     */
    public void put(String key, Object value) {
        data.put(key, value);
    }

    /**
     * <一句话功能简述> 删除参数
     * <功能详细描述>
     *
     * @param key 主键
     * @see [类、类#方法、类#成员]
     */
    public synchronized void remove(String key) {
        data.remove(key);
    }

    /**
     * <一句话功能简述> 获取boolean类型的参数
     * <功能详细描述>
     *
     * @param key 参数名
     * @return 参数的值
     * @see [类、类#方法、类#成员]
     */
    public boolean getBoolean(String key) {
        try {
            return Boolean.parseBoolean(getString(key));
        } catch (Exception e) {
            // TODO: handle exception
            return false;
        }
    }

    public String toString()
    {
        StringBuffer buffer = new StringBuffer();
        for (Object o : data.entrySet()) {
            Map.Entry entry = (Map.Entry) o;
            Object key = entry.getKey();
            Object val = entry.getValue();
            buffer.append(key).append(":").append(val).append("\n");
        }
        return buffer.toString();
    }
}
