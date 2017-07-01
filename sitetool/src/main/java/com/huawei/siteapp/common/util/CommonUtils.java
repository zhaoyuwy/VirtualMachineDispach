package com.huawei.siteapp.common.util;


import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.util.ArrayList;
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

    //    private static final Logger logger = Logger.getLogger(this.class);
    protected static final Logger logger = LoggerFactory.getLogger(CommonUtils.class);

    private static final String loginRegexp = "[a-zA-Z0-9-_]";

    private static final Pattern loginPatern = Pattern.compile(loginRegexp);

    /**
     * <默认构造函数>
     */
    private CommonUtils() {
    }

    /**
     * <功能简述>检查参数是否为空
     * <br><br>
     * <功能详细描述>
     *
     * @param str 待检查的参数
     * @return boolean
     * @see [类、类#方法、类#成员]
     */
    public static boolean isNull(String str) {
        return str == null || "".equals(str);
    }

    /**
     * <功能简述>检查参数是否为空
     * <br><br>
     * <功能详细描述>
     *
     * @param str 待检查的参数
     * @return boolean
     * @see [类、类#方法、类#成员]
     */
    public static boolean isNull(Object str) {
        return str == null || "".equals(str);
    }

    /**
     * <功能简述>检查参数是否为空
     * <br><br>
     * <功能详细描述>
     *
     * @param str 待检查的参数
     * @return boolean
     * @see [类、类#方法、类#成员]
     */
    public static boolean isNullObject(Object str) {
        return str == null;
    }

    /**
     * <功能简述>检查Map类型的参数是否为空
     * <br><br>
     * <功能详细描述>
     *
     * @return boolean
     * @see [类、类#方法、类#成员]
     */
    public static boolean isNull(List list) {
        return list == null || list.isEmpty();
    }

    /**
     * <功能简述>检查Map类型的参数是否为空
     * <br><br>
     * <功能详细描述>
     *
     * @param map 待检查的参数
     * @return boolean
     * @see [类、类#方法、类#成员]
     */
    public static boolean isNull(Map map) {
        return map == null || map.isEmpty();
    }

    /**
     * <功能简述>当输入的参数为Null时返回空，否则返回原来的值
     * <br><br>
     * <功能详细描述>
     *
     * @param str 输入参数
     * @return String  转换后结果
     * @see [类、类#方法、类#成员]
     */
    public static String getEmptyIfNull(Object str) {
        if (null == str) {
            return "";
        }
        try {
            return getEmptyIfNull(String.valueOf(str));
        } catch (Exception e) {
            // TODO: handle exception
//            logger.error(e.getMessage());
//            logger.error("");
            return "";
        }
    }

    public static JSONObject getSendCpuMemInfo(String urn) {
        JSONObject aCpuMem = new JSONObject();
        aCpuMem.put("urn", urn);
        List<String> cpuMems = new ArrayList<>();
        cpuMems.add("cpu_usage");
        cpuMems.add("mem_usage");
        aCpuMem.put("metricId", cpuMems);
        return aCpuMem;
    }

    public static InputStream copyStream(InputStream inputStream) {

//        ByteArrayOutputStream in =new ByteArrayOutputStream(inputStream);
        ByteArrayOutputStream rstStream = new ByteArrayOutputStream();
        BufferedInputStream bis = new BufferedInputStream(inputStream);
//        inputStream;
//        BufferedReader input = new BufferedReader(new InputStreamReader(inputStream));
        try {
            byte[] buffer = new byte[1024];
            int len;
            while ((len = bis.read(buffer)) > -1) {
                rstStream.write(buffer, 0, len);
            }

            rstStream.flush();
            if (bis.markSupported()) {
                bis.mark(bis.available());
                bis.reset();

            } else {
                System.out.print("InputStream does not support reset()");
            }
        } catch (IOException e) {
            logger.error("", e);
        }
        return new ByteArrayInputStream(rstStream.toByteArray());
    }
}
