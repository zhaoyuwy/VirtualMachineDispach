package com.huawei.siteapp.common.util;


import com.huawei.siteapp.model.SiteModel;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by z00390414 on 2017/6/15.
 *
 * @author z00390414
 * @version [版本号, 2017/6/15]
 */
public class CommonUtils {
    private static final long SECOND = 1000;

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
            return String.valueOf(str);
        } catch (Exception e) {
            // TODO: handle exception
//            logger.error(e.getMessage());
            logger.error("", e);
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

    public static boolean isloginCharacterValid(String str) {
        if (isNull(str)) {
            logger.info("input str is null.");
            return false;
        }
        String src = Normalizer.normalize(str, Normalizer.Form.NFKC);    //归一化字符串
        int iLength = src.length();
        String singleChar = null;
        int i;

        for (i = 0; i < iLength; i++) {
            //singleChar = new Character(src.charAt(i)).toString();
            singleChar = Character.toString(src.charAt(i));
            if (!isContainRight(singleChar)) {
                return false;
            }
        }
        return true;
    }

    public static boolean isContainRight(String str) {
        if (isNull(str)) {
            return false;
        }

        Matcher tMatcher = loginPatern.matcher(str);
        if (tMatcher.find()) {
            return true;
        }
        return false;
    }

    public static String getTestReportName() {
        return "廊坊_PUB_10.44.70.245_hosts_" + UctTimeUtil.getCurrentDate();
    }
    public static String getReportName(SiteModel siteModel) {
        return siteModel.getSiteRegionName()+"_"+siteModel.getSiteRegion()+"_"+siteModel.getSiteLoginIp()+"_hosts_"+ UctTimeUtil.getCurrentDate();
    }
}
