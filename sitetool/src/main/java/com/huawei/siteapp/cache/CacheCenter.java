package com.huawei.siteapp.cache;

import com.huawei.siteapp.common.constats.Const;
import com.huawei.siteapp.common.util.CommonUtils;
import com.huawei.siteapp.model.UserModel;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by z00390414 on 2017/6/15.
 *
 * @author z00390414
 * @version [版本号, 2017/6/15]
 */
public class CacheCenter {
    /**
     * 全局唯一实例
     */
    private static CacheCenter instance;

    private Map<String, Object> restBeansCache;
    private Map<String, Object> userCache;

    /**
     * <默认构造函数>
     */
    public CacheCenter() {
        restBeansCache = new HashMap<String, Object>();
        userCache = new HashMap<String, Object>();
//         new ConcurrentHashMap<String, Object>();
//         new HashMap<String, Boolean>();
//         new HashMap<String, Boolean>();
    }

    /**
     * <功能简述>获取数据缓存类单例
     * <功能详细描述>
     *
     * @return 线程管理类单例
     * @see [类、类#方法、类#成员]
     */
    public static CacheCenter getInstance() {
        synchronized (CacheCenter.class) {
            if (null == instance) {
                instance = new CacheCenter();
            }
            return instance;
        }
    }

    public Object getRestBeanResponse(String key) {
        if (CommonUtils.isNull(key)) {
            return null;
        }
        Object restBeanString = restBeansCache.get(key);
        if (null == restBeanString) {
            return null;
        }
        return restBeanString;
    }

    public Object getUserCacheByKey(String key) {
        if (CommonUtils.isNull(key)) {
            return null;
        }
        Object restBeanString = restBeansCache.get(key);
        if (null == restBeanString) {
            return null;
        }
        return restBeanString;
    }

    public void addUrlResponse(String key, Object value) {
        restBeansCache.put(key, value);
    }

    public void addUserCache(String key, Object value) {
        userCache.put(key, value);
    }

    public UserModel getUser() {
        UserModel userModel = (UserModel) userCache.get(Const.USER_CACHE);
        if (userModel != null) {
            return userModel;
        }
        // 如果没有登录，则返回实例化空的User对象。
        return new UserModel();
    }
}
