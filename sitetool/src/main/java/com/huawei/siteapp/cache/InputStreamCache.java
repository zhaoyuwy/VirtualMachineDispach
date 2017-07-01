package com.huawei.siteapp.cache;

import com.huawei.siteapp.bean.TemplateSourceBean;
import com.huawei.siteapp.common.util.CommonUtils;
import com.huawei.siteapp.common.util.SpringUtil;

import java.io.*;
import java.util.Map;

/**
 * Created by z00390414 on 2017/7/1.
 *
 * @version 1.0
 */
public class InputStreamCache {
    private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(InputStreamCache.class);

    private static InputStream hostTemplateInputStream;
    private static InputStream vmTemplateInputStream;
    private static InputStreamCache instance;

    /**
     * 将InputStream中的字节保存到ByteArrayOutputStream中。
     */
    private ByteArrayOutputStream byteArrayOutputStream = null;

    public InputStreamCache() {
        TemplateSourceBean templateSourceBean = SpringUtil.getBean(TemplateSourceBean.class);
        Map<String,InputStream> inputStreams = templateSourceBean.getAllInputStream();
        inputStreams.forEach((s, inputStream) -> {
            if (CommonUtils.isNull(inputStream))
                return;

            byteArrayOutputStream = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int len;
            try {
                while ((len = inputStream.read(buffer)) > -1) {
                    byteArrayOutputStream.write(buffer, 0, len);
                }
                byteArrayOutputStream.flush();

            } catch (IOException e) {
                logger.error(e.getMessage(), e);
            }
            if("hostInputStream".equals(s)){
                hostTemplateInputStream = new ByteArrayInputStream(byteArrayOutputStream.toByteArray());
            }
            if("vmInputStream".equals(s)){
                vmTemplateInputStream = new ByteArrayInputStream(byteArrayOutputStream.toByteArray());
            }
        });

    }

    public InputStream getInputStream() {
        if (CommonUtils.isNull(byteArrayOutputStream))
            return null;
//        hostTemplateInputStream = new ByteArrayInputStream(byteArrayOutputStream.toByteArray());
        return new ByteArrayInputStream(byteArrayOutputStream.toByteArray());
    }


    public static InputStream getHostTemplateInputStream() {
        try {
            hostTemplateInputStream.reset();
        } catch (IOException e) {
            logger.error("",e);
        }
        return hostTemplateInputStream;
    }
    public static InputStream getVmTemplateInputStream() {
        return vmTemplateInputStream;
    }

    public static InputStreamCache getInstance() {
        synchronized (InputStreamCache.class) {
            if (null == instance) {
                instance = new InputStreamCache();
            }
            return instance;
        }
    }
}
