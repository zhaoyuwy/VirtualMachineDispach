package com.huawei.siteapp.model;

import java.sql.Struct;
import java.util.Map;

/**
 * Created by z00390414 on 2017/6/23.
 *
 * @version 1.0
 */
public class Cluster {
    String urn;
    String uri;
    String name;
    String parentObjUrn;
    String description;
    String tag;
    boolean isMemOvercommit;
    boolean isEnableHa;
    //        structure haResSetting;
    boolean isEnableDrs;
    //    DrsInnerBean drsSetting;
    String parentObjName;
    boolean enableHostNumaDRS;
    int dsFaultStrategy;
    //    Struct drsExtensionConfig;
    String statistics;
    String resStrategy;
    boolean isEnableImc;
    String imcSetting;
    int maxCpuQuantity;
    boolean enableVmDrs;
    Struct drsVmConfig;
//    boolean enableGuestNuma;
//    boolean enableIOTailor;
//    Map<String, String> params;
}
//
//class DrsInnerBean{
//    String key;
//    String value;
//}