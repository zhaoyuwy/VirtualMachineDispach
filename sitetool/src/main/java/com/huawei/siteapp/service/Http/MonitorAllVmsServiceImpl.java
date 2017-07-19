package com.huawei.siteapp.service.Http;

import com.huawei.siteapp.common.constats.ParamKey;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.JSONUtils;
import com.huawei.siteapp.common.util.PropertiesUtils;
import com.huawei.siteapp.common.util.ServiceContext;
import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.model.SiteModel;
import com.huawei.siteapp.model.VmModel;
import com.huawei.siteapp.service.ModelService.IVmService;
import com.huawei.siteapp.service.Task.AsyncTaskServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by z00390414 on 2017/6/29.
 *
 * @version 1.0
 */
@Service
public class MonitorAllVmsServiceImpl {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private static int MAX_LIMIT = 100;
    @Resource(name = "vmService")
    IVmService vmService;

    @Resource
    HttpRestServiceImpl httpRestService;


    public int fcGetSitesClustersHostsAllVrmRest(SiteModel siteModel) {

        SiteLoginHttpRequestServiceImpl siteLoginHttpRequest = SpringUtil.getBean(SiteLoginHttpRequestServiceImpl.class);
//        retCode = siteLoginHttpRequest.fcLoginRest(siteLoginRestBean);
        int retCode = siteLoginHttpRequest.fcLoginRest(siteModel);

        if (RetCode.OK!=retCode){
            logger.error("SiteModel siteUser login fail"+siteModel);
            return retCode;
        }

        logger.info("Enter MonitorAllVmsServiceImpl fcGetSitesClustersHostsAllVrmRest");
        String[] urlParm = new String[]{siteModel.getSiteLoginIp(), PropertiesUtils.get("FC_PORT"), siteModel.getSiteUri()};
        String url = PropertiesUtils.getUrl("FcGetAllVms", urlParm);

        ServiceContext responseCxt = httpRestService.sendGet(url, "");
        String restResponse = (String) responseCxt.get(ParamKey.REST_RESPONSE);
        int total = (Integer) (JSONUtils.jsonToMap(restResponse).get("total"));

//         = total/MAX_LIMIT;
        int offSetNum = (total % MAX_LIMIT == 0) ? total / MAX_LIMIT : (total / MAX_LIMIT + 1);
        logger.info("total vrm = " + total);

        for (int offSetTemp = 0; offSetTemp < offSetNum; offSetTemp++) {
            if (RetCode.OK == getVmsByOffSet(url, offSetTemp * MAX_LIMIT, siteModel)) {
                logger.info("Save vrms success ,offset = " + offSetTemp);
            } else {
                logger.info("Save vrms error ,offset = " + offSetTemp);

            }
        }
        logger.info("save vmModels succuss");
        return RetCode.OK;
//
    }

    private int getVmsByOffSet(String url, int offSet, SiteModel siteModel) {
        String param = "offset=" + offSet;
        ServiceContext responseCxt = httpRestService.sendGet(url, param);
        String restResponse = (String) responseCxt.get(ParamKey.REST_RESPONSE);

        AsyncTaskServiceImpl asyncTaskService = SpringUtil.getBean(AsyncTaskServiceImpl.class);

        asyncTaskService.asyncSaveVmInfoInDB(siteModel, restResponse);

        List<VmModel> vmModels = new ArrayList<>();
        for (Object vmTemp : ((List<Object>) (JSONUtils.jsonToMap(restResponse).get("vms")))) {
            VmModel vmModel = new VmModel();

            vmModel.setSiteId(siteModel.getSiteId());

            String urn = ((Map<String, String>) vmTemp).get(ParamKey.URN);
            vmModel.setVmUrn(urn);
            String uri = ((Map<String, String>) vmTemp).get(ParamKey.URI);
            vmModel.setVmUri(uri);
            String uuid = ((Map<String, String>) vmTemp).get("uuid");
            vmModel.setVmUuid(uuid);
            ;
            String name = ((Map<String, String>) vmTemp).get(ParamKey.NAME);
            vmModel.setVmName(name);
            String clusterUrn = ((Map<String, String>) vmTemp).get("clusterUrn");
            vmModel.setClusterUrn(clusterUrn);
            String clusterName = ((Map<String, String>) vmTemp).get("clusterName");
            vmModel.setClusterName(clusterName);

            String locationName = ((Map<String, String>) vmTemp).get("locationName");
            vmModel.setVmLocation(locationName);
            String hostName = ((Map<String, String>) vmTemp).get("hostName");
            vmModel.setHostName(hostName);
            String createTime = ((Map<String, String>) vmTemp).get("createTime");
            vmModel.setVmCreateTime(createTime);
            Boolean isTemplate = ((Map<String, Boolean>) vmTemp).get("isTemplate");
            vmModel.setTemplate(isTemplate);

//            String description =CommonUtils.isNull(((Map<String, String>) vmTemp).get("description"))?"":((Map<String, String>) vmTemp).get("description");
//            description = CommonUtils.isNull(description)?"":description;
//            vmModel.setVmDescription(description);

            vmModels.add(vmModel);
        }
        vmService.save(vmModels);

        logger.info("save vmModels succuss , offSet = " + offSet);
        return RetCode.OK;
    }
}
