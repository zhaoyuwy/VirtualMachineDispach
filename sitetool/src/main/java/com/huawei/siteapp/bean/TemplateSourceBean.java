package com.huawei.siteapp.bean;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by z00390414 on 2017/6/29.
 *
 * @version 1.0
 */
public class TemplateSourceBean {


    private String excelTemplatePath;
    private InputStream hostInputStream;
    private InputStream vmInputStream;

    public InputStream getHostInputStream() {
        return hostInputStream;
    }

    public void setHostInputStream(InputStream hostInputStream) {
        this.hostInputStream = hostInputStream;
    }

    public String getExcelTemplatePath() {
        return excelTemplatePath;
    }

    public void setExcelTemplatePath(String excelTemplatePath) {
        this.excelTemplatePath = excelTemplatePath;
    }

    public InputStream getVmInputStream() {
        return vmInputStream;
    }

    public void setVmInputStream(InputStream vmInputStream) {
        this.vmInputStream = vmInputStream;
    }

    public Map<String,InputStream> getAllInputStream(){
        Map<String,InputStream> inputStreams =new HashMap<>();
        inputStreams.put("hostInputStream",hostInputStream);
        inputStreams.put("vmInputStream",vmInputStream);
        return inputStreams;
    }
}
