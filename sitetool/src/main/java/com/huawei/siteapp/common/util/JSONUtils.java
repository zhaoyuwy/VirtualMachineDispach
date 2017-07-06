package com.huawei.siteapp.common.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

/**
 * Created by z00390414 on 2017/6/15.
 *
 * @author z00390414
 * @version [版本号, 2017/6/15]
 */
public class JSONUtils {
    private static final Logger logger = LoggerFactory.getLogger(JSONUtils.class);
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

    public static boolean parseJson(ServiceContext cxt, InputStream in) {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> maps = null;
        try {
            maps = objectMapper.readValue(in, Map.class);
        } catch (IOException e) {
            logger.error("", e);
        }
        if (maps == null) {
            return false;
        }
        for (Map.Entry<String, Object> en : maps.entrySet()) {
            cxt.put(en.getKey(), en.getValue());
        }
        return true;
    }

    public static boolean parseJson(ServiceContext cxt, String jsonStr)

    {
        ObjectMapper objectMapper = new ObjectMapper();
//        try {
        Map<String, Object> maps = null;
        try {
            maps = objectMapper.readValue(jsonStr, Map.class);
        } catch (IOException e) {
            logger.error("", e);
        }
        if (maps == null) {
            return false;
        }
        for (Map.Entry<String, Object> en : maps.entrySet()) {
            cxt.put(en.getKey(), en.getValue());
        }
        return true;
    }


    public static String jsonToServiceContext(HttpServletRequest request) {
        StringBuilder content = new StringBuilder();
        try {
            ServletInputStream ris = request.getInputStream();

            byte[] b = new byte[1024];
            int lens = -1;
            while ((lens = ris.read(b)) > 0) {
                content.append(new String(b, 0, lens));
            }
        } catch (IOException e) {
            logger.error("", e);
        }
        logger.info("request" + content.toString());
        return content.toString();

    }
}
