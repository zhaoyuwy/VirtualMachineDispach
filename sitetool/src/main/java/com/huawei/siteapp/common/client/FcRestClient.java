package com.huawei.siteapp.common.client;

import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.CommonUtils;
import com.huawei.siteapp.common.util.JSONUtils;
import com.huawei.siteapp.common.util.PropertiesUtils;
import com.huawei.siteapp.common.util.ServiceContext;
import org.apache.http.Header;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.conn.tsccm.ThreadSafeClientConnManager;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Map;

/**
 * Created by z00390414 on 2017/6/22.
 *
 * @version 1.0
 */
public class FcRestClient extends RestClient {
    private static final Logger logger = LoggerFactory.getLogger(FcRestClient.class);

    private static DefaultHttpClient client = null;

    /**
     * HTTP "X-Auth-User2" 消息头
     */
    private static final String X_AUTH_USER = "X-Auth-User";

    /**
     * HTTP "X-Auth-Key" 消息头
     */
    private static final String X_AUTH_KEY = "X-Auth-Key";

    /**
     * HTTP "X-Auth-Token" 消息头
     */
    private static final String X_AUTH_TOKEN = "X-Auth-Token";

    @Override
    protected int toLogin(String host, int port, String userName, String pwd, ServiceContext cxt) {
        logger.debug("start to login to dsware");

        String loginUrl = PropertiesUtils.getUrl("dswareLogin", host, "" + port);
        logger.info("login url--->" + loginUrl);
        logger.info("login userName--->" + userName);

        HttpPost post = new HttpPost(loginUrl);
        //        X-Auth-User2 值为user
        //        X-Auth-Key 为密码经SHA-256加密

        post.addHeader(X_AUTH_USER, userName);
        post.addHeader(X_AUTH_KEY, pwd);
        post.addHeader("Connection", "close");
        setSpecialHeaders(post);

        DefaultHttpClient client = getHttpsClient(port);

        try {
            HttpResponse response = sendRequest(post, client, null);

            if (null == response || null == response.getStatusLine()) {
//                throw new UpgradeToolException("login to ge error response  is null");
            }

            int retCode = response.getStatusLine().getStatusCode();
            String respMsg = null;

            try {

                respMsg = EntityUtils.toString(response.getEntity());
            } catch (Exception e) {
                logger.debug(e.toString());
            }

            logger.info("Fc login reponse ----> " + respMsg);

            if (RetCode.OK == retCode) {
                Header tokenHeader = response.getFirstHeader(X_AUTH_TOKEN);

                if (null == tokenHeader) {
                    logger.error("token header is null: X-Auth-Token");
                    return RetCode.LOGIN_ERROR;
                }
                PropertiesUtils.put(host, tokenHeader.getValue());
                logger.info("Fc login success");
                return retCode;

            }
            logger.error("login error,retcode: " + retCode);

            if (CommonUtils.isNull(respMsg)) {
                return retCode;
            }

            Map<String, Object> map = JSONUtils.jsonToMap(respMsg);
            if (null == map) {
                return RetCode.INNER_ERROR;
            }

//            int errCode = CommonUtils.getIntegerFromStr(map.get(ParamKey.ERROR_CODE));
//            if (errCode > 0)
//            {
//                return errCode;
//            }

            return RetCode.LOGIN_ERROR;

        } catch (ClientProtocolException e) {
//            throw new UpgradeToolException("", e);
        } catch (IOException e) {
            logger.error("rest connection error.", e);
            String errMsg = e.getMessage();
            if (errMsg.contains("refused")) {
                return RetCode.REST_CONNECT_TIME_OUT;
            }

            return RetCode.REST_IO_ERROR;
        } catch (Exception e) {
            String errMsg = e.getMessage();
            logger.error(e.getMessage());
            if (errMsg.contains("refused") || errMsg.contains("timed out")) {
                return RetCode.REST_CONNECT_TIME_OUT;
            }
//            throw new UpgradeToolException("login to dsware eror", e);
        } finally {
            if (null != client) {
                client.getConnectionManager().shutdown();
            }
        }
        //
        return 0;
    }

    @Override
    public void resetHttpClient() {

    }

    @Override
    protected DefaultHttpClient getHttpsClient(int httpsPort) {
        return createClient(httpsPort);
    }

    @Override
    protected DefaultHttpClient getHttpsClientWithCre(int httpsPort, String creFile) {
        return createClient(httpsPort);
    }

    private static synchronized DefaultHttpClient createClient(int httpSport) {
        if (null != client) {
            return client;
        }
        /*if (CommonUtils.isNull(creFile))
        {
        	creFile = PropertiesUtils.getUrl("DSWARE_CER_FILE");;
        }*/

        SchemeRegistry schemeRegistry = new SchemeRegistry();

        //String crPwd = AES128Utils.decrypt(PropertiesUtils.getUrl("CR_PWD"));

        Scheme sch = createHttpsSchema(httpSport, null, null);
        if (null == sch) {
            logger.error("Get https schema null");
            sch = new Scheme("https", httpSport, SSLSocketFactory.getSocketFactory());
        }

        schemeRegistry.register(sch);
        ThreadSafeClientConnManager cm = new ThreadSafeClientConnManager(schemeRegistry);
        cm.setDefaultMaxPerRoute(PropertiesUtils.getInt("HTTP_CLIENT_PER_ROUT_NUM"));
        cm.setMaxTotal(PropertiesUtils.getInt("HTTP_CLIENT_MAX_TOTAL"));
        client = new DefaultHttpClient(cm);
        //        client.getParams().setIntParameter("http.socket.timeout", PropertiesUtils.getInt("REST_TIME_OUT"));
        return client;
    }

}
