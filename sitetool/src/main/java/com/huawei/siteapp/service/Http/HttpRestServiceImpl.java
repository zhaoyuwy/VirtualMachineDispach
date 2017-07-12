package com.huawei.siteapp.service.Http;

import com.huawei.siteapp.cache.CacheCenter;
import com.huawei.siteapp.common.Bean.SiteLoginRestBean;
import com.huawei.siteapp.common.constats.ParamKey;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.*;
import com.huawei.siteapp.model.ClusterModel;
import com.huawei.siteapp.model.HostModel;
import com.huawei.siteapp.model.SiteModel;
import com.huawei.siteapp.repository.SiteRepository;
import com.huawei.siteapp.service.ModelService.Impl.ClusterServiceImpl;
import com.huawei.siteapp.service.ModelService.Impl.HostServiceImpl;
import net.sf.json.JSONException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.ConnectException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by z00390414 on 2017/6/15.
 *
 * @version 1.0
 */
@Service
public class HttpRestServiceImpl {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 向指定URL发送GET方法的请求
     *
     * @param url   发送请求的URL
     * @param param 请求参数，请求参数应该是 name1=value1&name2=value2 的形式。
     * @return URL 所代表远程资源的响应结果
     */
    ServiceContext sendGet(String urlNameString, String param) {

        StringBuilder result = new StringBuilder();
        BufferedReader in = null;
        ServiceContext cxt = new ServiceContext();
        try {
            urlNameString = urlNameString + "?" + param;
            logger.info("Begin of get -- " + urlNameString);
            URL realUrl = new URL(urlNameString);
            // 打开和URL之间的连接
            URLConnection connection = realUrl.openConnection();
            // 设置通用的请求属性
            connection.setRequestProperty("Accept", "application/json;version=5.1;charset=UTF-8");
            connection.setRequestProperty("X-Auth-Token", (String) CacheCenter.getInstance().getRestBeanResponse("FcLogin"));
            // 建立实际的连接
            connection.connect();
            // 获取所有响应头字段
            Map<String, List<String>> map = connection.getHeaderFields();
            // 遍历所有的响应头字段
            for (Object o : map.entrySet()) {
                Map.Entry entry = (Map.Entry) o;
                String key = (String) entry.getKey();
                List<String> val = (List<String>) entry.getValue();

                cxt.put(key, val);
            }
            // 定义 BufferedReader输入流来读取URL的响应
            in = new BufferedReader(new InputStreamReader(
                    connection.getInputStream()));
            String line;
            while ((line = in.readLine()) != null) {
                result.append(line);
            }
        } catch (ConnectException connectException) {
            logger.error("Connection timed out: connect", connectException);
        } catch (Exception e) {
            logger.error("Send get rest Exception", e);
        }
        // 使用finally块来关闭输入流
        finally {
            try {
                if (in != null) {
                    in.close();
                }
            } catch (Exception e2) {
                logger.error("finally catch", e2);
            }
        }
        cxt.put(ParamKey.REST_RESPONSE, result.toString());
        logger.info("Get rest " + urlNameString + " \n and response -- " + result.toString());
        logger.info("End of get -- " + urlNameString);
        return cxt;
    }

    public ServiceContext sendPost(String url, String param) {
        logger.info("Begin of sendPost -- " + url + "\n and postBody = " + param);


        PrintWriter out = null;
        BufferedReader in = null;
        StringBuilder result = new StringBuilder();
        ServiceContext cxt = new ServiceContext();
        try {
            URL realUrl = new URL(url);
//             打开和URL之间的连接
            URLConnection conn = realUrl.openConnection();
//             设置通用的请求属性
            conn.setRequestProperty("Accept-Language", "en_US");
            conn.setRequestProperty("Accept", "application/json;version=5.1;charset=UTF-8");
            conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            conn.setRequestProperty("X-Auth-Token", (String) CacheCenter.getInstance().getRestBeanResponse("FcLogin"));


//             发送POST请求必须设置如下两行
            conn.setDoOutput(true);
            conn.setDoInput(true);
//             获取URLConnection对象对应的输出流
            out = new PrintWriter(conn.getOutputStream());

//             发送请求参数
            out.print(param);
//             flush输出流的缓冲
            out.flush();

//             定义BufferedReader输入流来读取URL的响应
            InputStream inputStream = conn.getInputStream();
            in = new BufferedReader(new InputStreamReader(inputStream));

            String line;
            while ((line = in.readLine()) != null) {
                result.append(line);
            }
        } catch (JSONException jsonException) {
            logger.error("A JSONObject text must begin with ", jsonException);
        } catch (Exception e) {
            logger.error("Send post rest exception", e);
        }
        //使用finally块来关闭输出流、输入流
        finally {
            try {
                if (out != null) {
                    out.close();
                }
                if (in != null) {
                    in.close();
                }
            } catch (IOException e2) {
                logger.error("finally catch", e2);
            }
        }
        cxt.put(ParamKey.REST_RESPONSE, result.toString());
        logger.info("Post rest " + url + " response -- " + result.toString());
        logger.info("End of sendPost -- " + url);
        return cxt;
    }

    //等待删除。
    public int fcGetSitesRest(SiteLoginRestBean restInfo) {
        String[] urlParm = new String[]{restInfo.getSiteLoginIp(), restInfo.getRestPort()};
        String url = PropertiesUtils.getUrl("FcGetSites", urlParm);
        ServiceContext sr = sendGet(url, "");
        String restResponse = (String) sr.get(ParamKey.REST_RESPONSE);
//        String restResponse = "{\"sites\":[{\"ip\":\"192.145.17.200\",\"uri\":\"/service/sites/43DA092B\",\"urn\":\"urn:sites:43DA092B\",\"isSelf\":true,\"isDC\":false,\"status\":\"normal\",\"name\":\"site\"}]}";

        Map<String, Object> responseMap = null;
        try {
            responseMap = JSONUtils.jsonToMap(restResponse);
        } catch (JSONException jsonException) {
            logger.error("A JSONObject text must begin with", jsonException);
            String errMsg = jsonException.getMessage();
            logger.error("A JSONObject text must begin with ", jsonException);

            if (errMsg.contains("refused") || errMsg.contains("timed out")) {
                logger.error("rest connection time out");
                return RetCode.REST_CONNECT_TIME_OUT;
            }

            if (errMsg.contains("peer not authenticated")) {
                logger.info("peer not auth, try again");
//                return reLogin(cxt, request);
                return RetCode.LOGIN_ERROR;
            }

            if (errMsg.contains("A JSONObject text must begin with")) {
                return RetCode.PARSE_RESPONSE_JSON_ERROR;
            }
            throw new BusinessException(jsonException, "execute rest request error");

        }
        String urlSites = ((HashMap<String, String>) (((List) responseMap.get(ParamKey.SITES)).get(0))).get(ParamKey.URI);
        List<SiteModel> sites = new ArrayList<>();
        SiteRepository siteRepository = SpringUtil.getBean(SiteRepository.class);


        for (Object siteTemp : (List) responseMap.get(ParamKey.SITES)) {
            SiteModel siteModel = siteRepository.findSiteModelBySiteLoginIpAndSiteLoginUser(restInfo.getSiteLoginIp(), restInfo.getSiteLoginUser());
            SiteModel site = mapToSiteBean(siteTemp, siteModel);
            site.setSiteLoginUser(restInfo.getSiteLoginUser());
            site.setSiteLoginPwd(restInfo.getSiteLoginPwd());
            site.setSiteLoginIp(restInfo.getSiteLoginIp());
            site.setSiteRegionName(restInfo.getSiteRegionName());
            site.setSiteGroupId(restInfo.getSiteGroupId());
            sites.add(site);
        }
//            siteService.saveSiteList(sites);
//        ISiteService siteService = SpringUtil.getBean(ISiteService.class);
        siteRepository.save(sites);

        CacheCenter.getInstance().addUrlResponse(ParamKey.SITE_ID, urlSites);
        return RetCode.OK;
    }

    private SiteModel mapToSiteBean(Object siteObj, SiteModel siteModel) {
        String siteUri = ((HashMap<String, String>) siteObj).get("uri");
        String siteUrn = ((HashMap<String, String>) siteObj).get("urn");
        String siteIp = ((HashMap<String, String>) siteObj).get("ip");
        String siteName = ((HashMap<String, String>) siteObj).get("name");
        String siteStatus = ((HashMap<String, String>) siteObj).get("status");
        boolean siteIsDC = ((HashMap<String, Boolean>) siteObj).get("isDC");
        boolean siteIsSelf = ((HashMap<String, Boolean>) siteObj).get("isSelf");

        siteModel.setSiteUri(siteUri);
        siteModel.setSiteUrn(siteUrn);
        siteModel.setSiteIp(siteIp);
        siteModel.setSiteName(siteName);
        siteModel.setSiteStatus(siteStatus);
        siteModel.setSiteIsDC(siteIsDC);
        siteModel.setSiteIsSelf(siteIsSelf);

        return siteModel;
    }

    public void fcGetSitesClustersRest(SiteLoginRestBean restInfo) {

        String[] urlParm = new String[]{restInfo.getSiteLoginIp(), restInfo.getRestPort(), (String) CacheCenter.getInstance().getRestBeanResponse(ParamKey.SITE_ID)};
        String url = PropertiesUtils.getUrl("FcGetClusters", urlParm);
        ServiceContext sr = sendGet(url, "");
        String restResponse = (String) sr.get(ParamKey.REST_RESPONSE);
//        String restResponse = "{\"clusters\":[{\"params\":null,\"description\":\"2017.3.14\",\"tag\":null,\"uri\":\"/service/sites/43DA092B/clusters/19220\",\"urn\":\"urn:sites:43DA092B:clusters:19220\",\"cpuResource\":{\"allocatedSizeMHz\":0,\"totalSizeMHz\":518800},\"memResource\":{\"allocatedSizeMB\":954284,\"totalSizeMB\":1052924},\"parentObjUrn\":null,\"parentObjName\":null,\"name\":\"IES\"},{\"params\":null,\"description\":null,\"tag\":\"domain/default\",\"uri\":\"/service/sites/43DA092B/clusters/108\",\"urn\":\"urn:sites:43DA092B:clusters:108\",\"cpuResource\":{\"allocatedSizeMHz\":39904,\"totalSizeMHz\":1882716},\"memResource\":{\"allocatedSizeMB\":3054672,\"totalSizeMB\":5636222},\"parentObjUrn\":null,\"parentObjName\":null,\"name\":\"ManagementCluster\"}]}";
        ((List) (JSONUtils.jsonToMap(restResponse).get("clusters"))).get(0);
        ClusterServiceImpl service = SpringUtil.getBean(ClusterServiceImpl.class);
        List<ClusterModel> clusters = new ArrayList<>();
        for (Object clusterTemp : ((List<Object>) (JSONUtils.jsonToMap(restResponse).get("clusters")))) {

            ClusterModel cluster = new ClusterModel();
            String uri = ((Map<String, String>) clusterTemp).get(ParamKey.URI);
            cluster.setClusterUri(uri);
            String urn = ((Map<String, String>) clusterTemp).get(ParamKey.URN);
            cluster.setClusterUrn(urn);
            String name = ((Map<String, String>) clusterTemp).get(ParamKey.NAME);
            cluster.setClusterName(name);

            Object memResource = ((Map<String, String>) clusterTemp).get("memResource");
            int allocatedSizeMB = ((Map<String, Integer>) memResource).get("allocatedSizeMB");
            int totalSizeMB = ((Map<String, Integer>) memResource).get("totalSizeMB");
            cluster.setClusterAllocatedSizeMB(allocatedSizeMB);
            cluster.setClusterTotalSizeMB(totalSizeMB);
//            setResponseInCache(memResource);

            Object cpuResource = ((Map<String, String>) clusterTemp).get("cpuResource");
            int allocatedSizeMHz = ((Map<String, Integer>) cpuResource).get("allocatedSizeMHz");
            int totalSizeMHz = ((Map<String, Integer>) cpuResource).get("totalSizeMHz");
            cluster.setClusterAllocatedSizeMHz(allocatedSizeMHz);
            cluster.setClusterCpuTotalSizeMHz(totalSizeMHz);
            cluster.setTime(UctTimeUtil.getCurrentDate());
//            setResponseInCache(cpuResource);
            clusters.add(cluster);

        }
        service.save(clusters);
    }

    //等待删除。
    public void fcGetSitesClustersHostsRest(SiteLoginRestBean restInfo) {

        String[] urlParm = new String[]{restInfo.getSiteLoginIp(), restInfo.getRestPort(), (String) CacheCenter.getInstance().getRestBeanResponse(ParamKey.SITE_ID)};
        String url = PropertiesUtils.getUrl("FcGetHosts", urlParm);
        ServiceContext sr = sendGet(url, "");
        String restResponse = (String) sr.get(ParamKey.REST_RESPONSE);
//        String restResponse = "{\"clusters\":[{\"params\":null,\"description\":\"2017.3.14\",\"tag\":null,\"uri\":\"/service/sites/43DA092B/clusters/19220\",\"urn\":\"urn:sites:43DA092B:clusters:19220\",\"cpuResource\":{\"allocatedSizeMHz\":0,\"totalSizeMHz\":518800},\"memResource\":{\"allocatedSizeMB\":954284,\"totalSizeMB\":1052924},\"parentObjUrn\":null,\"parentObjName\":null,\"name\":\"IES\"},{\"params\":null,\"description\":null,\"tag\":\"domain/default\",\"uri\":\"/service/sites/43DA092B/clusters/108\",\"urn\":\"urn:sites:43DA092B:clusters:108\",\"cpuResource\":{\"allocatedSizeMHz\":39904,\"totalSizeMHz\":1882716},\"memResource\":{\"allocatedSizeMB\":3054672,\"totalSizeMB\":5636222},\"parentObjUrn\":null,\"parentObjName\":null,\"name\":\"ManagementCluster\"}]}";
//        ((List) (JSONUtils.jsonToMap(restResponse).get("clusters"))).get(0);
        HostServiceImpl service = SpringUtil.getBean(HostServiceImpl.class);
        List<HostModel> hosts = new ArrayList<>();
        for (Object hostTemp : ((List<Object>) (JSONUtils.jsonToMap(restResponse).get("hosts")))) {
            HostModel host = new HostModel();
            String uri = ((Map<String, String>) hostTemp).get(ParamKey.URI);
            host.setHostUri(uri);
            String urn = ((Map<String, String>) hostTemp).get(ParamKey.URN);
            host.setHostUrn(urn);
            String ip = ((Map<String, String>) hostTemp).get("ip");
            host.setHostIp(ip);
            String name = ((Map<String, String>) hostTemp).get(ParamKey.NAME);
            host.setHostName(name);
            String clusterName = ((Map<String, String>) hostTemp).get("clusterName");
            host.setClusterName(clusterName);


            Object memResource = ((Map<String, String>) hostTemp).get("memResource");
            int allocatedSizeMB = ((Map<String, Integer>) memResource).get("allocatedSizeMB");
            int totalSizeMB = ((Map<String, Integer>) memResource).get("totalSizeMB");
            host.setHostAllocatedSizeMB(allocatedSizeMB);
            host.setHostTotalSizeMB(totalSizeMB);

            Object cpuResource = ((Map<String, String>) hostTemp).get("cpuResource");
            int allocatedSizeMHz = ((Map<String, Integer>) cpuResource).get("allocatedSizeMHz");
            int totalSizeMHz = ((Map<String, Integer>) cpuResource).get("totalSizeMHz");
            host.setHostAllocatedSizeMHz(allocatedSizeMHz);
            host.setHostTotalSizeMHz(totalSizeMHz);
            host.setTime(UctTimeUtil.getCurrentDate());
            hosts.add(host);
        }
        service.save(hosts);
    }

    public void fcGetSitesClustersRest(SiteModel siteModel) {
        String[] urlParm = new String[]{siteModel.getSiteLoginIp(), PropertiesUtils.get("FC_PORT"), siteModel.getSiteUri()};
        String url = PropertiesUtils.getUrl("FcGetClusters", urlParm);
        ServiceContext sr = sendGet(url, "");
        String restResponse = (String) sr.get(ParamKey.REST_RESPONSE);
//        String restResponse = "{\"clusters\":[{\"params\":null,\"description\":\"2017.3.14\",\"tag\":null,\"uri\":\"/service/sites/43DA092B/clusters/19220\",\"urn\":\"urn:sites:43DA092B:clusters:19220\",\"cpuResource\":{\"allocatedSizeMHz\":0,\"totalSizeMHz\":518800},\"memResource\":{\"allocatedSizeMB\":954284,\"totalSizeMB\":1052924},\"parentObjUrn\":null,\"parentObjName\":null,\"name\":\"IES\"},{\"params\":null,\"description\":null,\"tag\":\"domain/default\",\"uri\":\"/service/sites/43DA092B/clusters/108\",\"urn\":\"urn:sites:43DA092B:clusters:108\",\"cpuResource\":{\"allocatedSizeMHz\":39904,\"totalSizeMHz\":1882716},\"memResource\":{\"allocatedSizeMB\":3054672,\"totalSizeMB\":5636222},\"parentObjUrn\":null,\"parentObjName\":null,\"name\":\"ManagementCluster\"}]}";
        ((List) (JSONUtils.jsonToMap(restResponse).get("clusters"))).get(0);
        ClusterServiceImpl service = SpringUtil.getBean(ClusterServiceImpl.class);
        List<ClusterModel> clusters = new ArrayList<>();
        for (Object clusterTemp : ((List<Object>) (JSONUtils.jsonToMap(restResponse).get("clusters")))) {

            ClusterModel cluster = new ClusterModel();
            String uri = ((Map<String, String>) clusterTemp).get(ParamKey.URI);
            cluster.setClusterUri(uri);
            String urn = ((Map<String, String>) clusterTemp).get(ParamKey.URN);
            cluster.setClusterUrn(urn);
            String name = ((Map<String, String>) clusterTemp).get(ParamKey.NAME);
            cluster.setClusterName(name);

            Object memResource = ((Map<String, String>) clusterTemp).get("memResource");
            int allocatedSizeMB = ((Map<String, Integer>) memResource).get("allocatedSizeMB");
            int totalSizeMB = ((Map<String, Integer>) memResource).get("totalSizeMB");
            cluster.setClusterAllocatedSizeMB(allocatedSizeMB);
            cluster.setClusterTotalSizeMB(totalSizeMB);

            Object cpuResource = ((Map<String, String>) clusterTemp).get("cpuResource");
            int allocatedSizeMHz = ((Map<String, Integer>) cpuResource).get("allocatedSizeMHz");
            int totalSizeMHz = ((Map<String, Integer>) cpuResource).get("totalSizeMHz");
            cluster.setClusterAllocatedSizeMHz(allocatedSizeMHz);
            cluster.setClusterCpuTotalSizeMHz(totalSizeMHz);
            cluster.setTime(UctTimeUtil.getCurrentDate());

            cluster.setSiteId(siteModel.getSiteId());
            clusters.add(cluster);

        }
        service.save(clusters);
    }

    public void fcGetSitesClustersHostsRest(SiteModel siteModel) {

        String[] urlParm = new String[]{siteModel.getSiteLoginIp(), PropertiesUtils.get("FC_PORT"), siteModel.getSiteUri()};
        String url = PropertiesUtils.getUrl("FcGetHosts", urlParm);
        ServiceContext sr = sendGet(url, "");
        String restResponse = (String) sr.get(ParamKey.REST_RESPONSE);
//        String restResponse = "{\"clusters\":[{\"params\":null,\"description\":\"2017.3.14\",\"tag\":null,\"uri\":\"/service/sites/43DA092B/clusters/19220\",\"urn\":\"urn:sites:43DA092B:clusters:19220\",\"cpuResource\":{\"allocatedSizeMHz\":0,\"totalSizeMHz\":518800},\"memResource\":{\"allocatedSizeMB\":954284,\"totalSizeMB\":1052924},\"parentObjUrn\":null,\"parentObjName\":null,\"name\":\"IES\"},{\"params\":null,\"description\":null,\"tag\":\"domain/default\",\"uri\":\"/service/sites/43DA092B/clusters/108\",\"urn\":\"urn:sites:43DA092B:clusters:108\",\"cpuResource\":{\"allocatedSizeMHz\":39904,\"totalSizeMHz\":1882716},\"memResource\":{\"allocatedSizeMB\":3054672,\"totalSizeMB\":5636222},\"parentObjUrn\":null,\"parentObjName\":null,\"name\":\"ManagementCluster\"}]}";
//        ((List) (JSONUtils.jsonToMap(restResponse).get("clusters"))).get(0);
        HostServiceImpl service = SpringUtil.getBean(HostServiceImpl.class);
        ClusterServiceImpl clusterService = SpringUtil.getBean(ClusterServiceImpl.class);
        List<ClusterModel> clusterModels = (List<ClusterModel>) clusterService.findAll();
        List<HostModel> hosts = new ArrayList<>();
        for (Object hostTemp : ((List<Object>) (JSONUtils.jsonToMap(restResponse).get("hosts")))) {
            HostModel host = new HostModel();
            String uri = ((Map<String, String>) hostTemp).get(ParamKey.URI);
            host.setHostUri(uri);
            String urn = ((Map<String, String>) hostTemp).get(ParamKey.URN);
            host.setHostUrn(urn);
            String ip = ((Map<String, String>) hostTemp).get("ip");
            host.setHostIp(ip);
            String name = ((Map<String, String>) hostTemp).get(ParamKey.NAME);
            host.setHostName(name);
            String clusterName = ((Map<String, String>) hostTemp).get("clusterName");
            host.setClusterName(clusterName);
            String clusterUrn = ((Map<String, String>) hostTemp).get("clusterUrn");
            host.setClusterUrn(clusterUrn);


            Object memResource = ((Map<String, String>) hostTemp).get("memResource");
            int allocatedSizeMB = ((Map<String, Integer>) memResource).get("allocatedSizeMB");
            int totalSizeMB = ((Map<String, Integer>) memResource).get("totalSizeMB");
            host.setHostAllocatedSizeMB(allocatedSizeMB);
            host.setHostTotalSizeMB(totalSizeMB);

            Object cpuResource = ((Map<String, String>) hostTemp).get("cpuResource");
            int allocatedSizeMHz = ((Map<String, Integer>) cpuResource).get("allocatedSizeMHz");
            int totalSizeMHz = ((Map<String, Integer>) cpuResource).get("totalSizeMHz");
            host.setHostAllocatedSizeMHz(allocatedSizeMHz);
            host.setHostTotalSizeMHz(totalSizeMHz);
            host.setTime(UctTimeUtil.getCurrentDate());


            host.setSiteId(siteModel.getSiteId());
            hosts.add(host);
        }
        service.save(hosts);
    }
}