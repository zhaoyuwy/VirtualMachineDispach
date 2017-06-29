package com.huawei.siteapp.common.util;

import java.io.InputStream;

/**
 * Created by z00390414 on 2017/6/30.
 *
 * @version 1.0
 */
public class ResourceUtil {
    public static InputStream EXCEL_TEMPLATE_STREAM;

    public static void setExcelTemplateStream(InputStream inputStream){
        EXCEL_TEMPLATE_STREAM = inputStream;
    }
}
