package com.huawei.siteapp.common.util;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created by z00390414 on 2017/6/15.
 *
 * @author z00390414
 * @version [版本号, 2017/6/15]
 */
public class JSONUtils {
    private static final Logger logger = LoggerFactory.getLogger(JSONUtils.class);

    /**
     * 对象转换成JSON字符串
     *
     * @param obj 需要转换的对象
     * @return 对象的string字符
     */
    public static String toJson(Object obj) {
        JSONObject jSONObject = JSONObject.fromObject(obj);
        return jSONObject.toString();
    }

    /**
     * JSON字符串转换成对象
     *
     * @param jsonString 需要转换的字符串
     * @param type       需要转换的对象类型
     * @return 对象
     */
    @SuppressWarnings("unchecked")
    public static <T> T fromJson(String jsonString, Class<T> type) {
        JSONObject jsonObject = JSONObject.fromObject(jsonString);
        return (T) JSONObject.toBean(jsonObject, type);
    }

    /**
     * 将JSONArray对象转换成list集合
     *
     * @param jsonArr
     * @return
     */
    public static List<Object> jsonToList(JSONArray jsonArr) {
        List<Object> list = new ArrayList<Object>();
        for (Object obj : jsonArr) {
            if (obj instanceof JSONArray) {
                list.add(jsonToList((JSONArray) obj));
            } else if (obj instanceof JSONObject) {
                list.add(jsonToMap((JSONObject) obj));
            } else {
                list.add(obj);
            }
        }
        return list;
    }

    /**
     * 将json字符串转换成map对象
     *
     * @param json
     * @return
     */
    public static Map<String, Object> jsonToMap(String json) {
        JSONObject obj = JSONObject.fromObject(json);
        return jsonToMap(obj);
    }

    /**
     * 将JSONObject转换成map对象
     *
     * @param json
     * @return
     */
    public static Map<String, Object> jsonToMap(JSONObject obj) {
        Set<?> set = obj.keySet();
        Map<String, Object> map = new HashMap<String, Object>(set.size());
        for (Object key : obj.keySet()) {
            Object value = obj.get(key);
            if (value instanceof JSONArray) {
                map.put(key.toString(), jsonToList((JSONArray) value));
            } else if (value instanceof JSONObject) {
                map.put(key.toString(), jsonToMap((JSONObject) value));
            } else {
                map.put(key.toString(), obj.get(key));
            }

        }
        return map;
    }

    public static boolean parseJSON(ServiceContext cxt, InputStream in) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            Map<String, Object> maps = objectMapper.readValue(in, Map.class);
            if (maps == null) {
                return false;
            }
            for (Map.Entry<String, Object> en : maps.entrySet()) {
                cxt.put(en.getKey(), en.getValue());
            }
        } catch (JsonParseException e) {
//            throw new UpgradeToolException("parse json to map error", e);
            e.printStackTrace();
        } catch (JsonMappingException e) {
//            throw new UpgradeToolException("parse json to map error", e);
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
//            throw new UpgradeToolException("parse json to map error", e);
        }

        return true;
    }

    public static boolean parseJSON(ServiceContext cxt, String jsonStr)

    {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            Map<String, Object> maps = objectMapper.readValue(jsonStr, Map.class);
            if (maps == null) {
                return false;
            }
            for (Map.Entry<String, Object> en : maps.entrySet()) {
                cxt.put(en.getKey(), en.getValue());
            }
        } catch (JsonParseException e) {
            logger.error("parse json to map error JsonParseException ", e);
        } catch (JsonMappingException e) {
            logger.error("parse json to map error JsonMappingException", e);
        } catch (IOException e) {
            logger.error("parse json to map error IOException", e);
        }
        return true;
    }

    public static Map<String, Object> parseJSON(String jsonStr)

    {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(jsonStr, Map.class);

        } catch (JsonParseException e) {
//            throw new UpgradeToolException("parse json to map error", e);
        } catch (JsonMappingException e) {
//            throw new UpgradeToolException("parse json to map error", e);
        } catch (IOException e) {
//            throw new UpgradeToolException("parse json to map error", e);
        }
        return null;

    }
}
