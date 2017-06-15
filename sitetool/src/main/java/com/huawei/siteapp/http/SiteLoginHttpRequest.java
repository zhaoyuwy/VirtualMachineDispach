package com.huawei.siteapp.http;

import com.huawei.siteapp.cache.CacheCenter;
import com.huawei.siteapp.common.Bean.RestBean;
import com.huawei.siteapp.common.constats.ParamKey;
import com.huawei.siteapp.common.util.PropertiesUtils;
import com.huawei.siteapp.common.util.ServiceContext;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;
import java.util.Map;

/**
 * Created by z00390414 on 2017/6/15.
 *
 * @version 1.0
 * @date 2017/6/15
 */


public class SiteLoginHttpRequest {

    /**
     * 向指定 URL 发送POST方法的请求
     *
     * @param url 发送请求的 URL
     *            //     * @param param 请求参数，请求参数应该是 name1=value1&name2=value2 的形式。
     * @return 所代表远程资源的响应结果
     */
    public ServiceContext sendLoginPost(String url, String user,String pwd) {
        PrintWriter out = null;
        BufferedReader in = null;
        StringBuilder result = new StringBuilder();
        ServiceContext cxt = new ServiceContext();
        try {
            URL realUrl = new URL(url);
            // 打开和URL之间的连接
            URLConnection conn = realUrl.openConnection();
            // 设置通用的请求属性
            conn.setRequestProperty("X-Auth-User", "kwx319070");
            conn.setRequestProperty("X-Auth-Key", "OpsImage@12345");
            conn.setRequestProperty("X-Auth-UserType", "0");
            conn.setRequestProperty("X-Auth-AuthType", "0");
            conn.setRequestProperty("X-ENCRIPT-ALGORITHM", "1");
            conn.setRequestProperty("Accept-Language", "en_US");
            conn.setRequestProperty("Accept", "application/json;version=5.1;charset=UTF-8");
            conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");


            // 发送POST请求必须设置如下两行
            conn.setDoOutput(true);
            conn.setDoInput(true);
            // 获取URLConnection对象对应的输出流
            out = new PrintWriter(conn.getOutputStream());
            // 发送请求参数

            out.print("");
            // flush输出流的缓冲
            out.flush();


            Map<String, List<String>> map = conn.getHeaderFields();

//            JSONUtils.parseJSON(cxt, map);
            // 遍历所有的响应头字段
//            for (String key : map.keySet()) {
//                System.out.println(key + "--->" + map.get(key));
//                
//                cxt.put(key, map.get(key));
//                if("X-Auth-Token".equals(key)){
//                    CacheCenter.getInstance().addUrlResponse("FcLogin","" );
//                }
//            }

            for (Object o : map.entrySet()) {
                Map.Entry entry = (Map.Entry) o;
                String key = (String)entry.getKey();
                List<String> val = (List<String>)entry.getValue();

                cxt.put( key, val);
                if("X-Auth-Token".equals(key)){
                    CacheCenter.getInstance().addUrlResponse("FcLogin",val.get(0));
                }
            }
            
//                    CacheCenter.getInstance().addUrlResponse("FcLogin", true);
//            cxt.setData(map);

            // 定义BufferedReader输入流来读取URL的响应
            InputStream inputStream = conn.getInputStream();
//            JSONUtils.parseJSON(cxt, inputStream);
            in = new BufferedReader(
                    new InputStreamReader(inputStream));


            String line;
            while ((line = in.readLine()) != null) {
                result.append(line);
            }
        } catch (Exception e) {
            System.out.println("发送 POST 请求出现异常！" + e);
            e.printStackTrace();
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
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        cxt.put(ParamKey.REST_RESPONSE, result.toString());
        return cxt;
    }

    void fcLoginRest(String user, String pwd) {
//        发送 POST 请求
//        String sr = SiteLoginHttpRequest.sendLoginPost("http://192.145.17.200:7070/service/session", "");
//        System.out.println(sr);

        RestBean restInfo = getTestRest();
        String[] urlParm = new String[]{restInfo.getVrmIp(), restInfo.getRestPort()};
        String url = PropertiesUtils.getUrl("FcLogin", urlParm);
        ServiceContext sr = sendLoginPost(url, user,pwd);
        System.out.println(sr);
    }

    public RestBean getTestRest() {
        RestBean restBean = new RestBean();
        restBean.setVrmIp("192.145.17.200");
        restBean.setRestPort("7070");
        return restBean;
    }
}