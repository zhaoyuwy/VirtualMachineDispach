package com.huawei.siteapp.common.client;

import com.huawei.siteapp.common.constats.ParamKey;
import com.huawei.siteapp.common.constats.RetCode;
import com.huawei.siteapp.common.util.*;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpMethod;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.io.*;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

/**
 * Created by z00390414 on 2017/6/22.
 *
 * @version 1.0
 */
public abstract class RestClient implements IClient {
    private static final Logger logger = LoggerFactory.getLogger(RestClient.class);

    protected static final Object LOCK = new Object();

    private static final int I_GET = 0;

    private static final int I_POST = 2;

    private static final int I_HEAD = 1;

    private static final int I_OPTIONS = 6;

    private static final int I_PUT = 3;

    private static final int I_DELETE = 5;

    /**
     * <一句话功能简述>REST响应消息默认处理器
     * <功能详细描述>
     *
     * @see [相关类/方法]
     * @since [产品/模块版本]
     */
    static class RestDefaultHandle implements IHandle {
        private final Logger logger = LoggerFactory.getLogger(this.getClass());

        /**
         * {@inheritDoc}
         */

        @Override
        public void handle(ServiceContext cxt, InputStream in) {
            if (null == in || null == cxt) {
                logger.error("rest defaulthandle eror, in or cxt is null");
                return;
            }

            logger.info("enter RESTDefaultHandle.handle");
            JSONUtils.parseJson(cxt, in);
            logger.info("exit RESTDefaultHandle.handle");
        }

        /**
         * {@inheritDoc}
         */

        @Override
        public void handle(ServiceContext cxt, OutputStream out) {

        }

    }

    @Override
    public int communicate(ServiceContext cxt) {
        return communicate(cxt, new RestDefaultHandle());

    }

    /**
     * {@inheritDoc}
     */

    @Override
    public int communicate(ServiceContext cxt, IHandle handle) {
        if (cxt == null) {
            logger.error("cxt is null");
        }
        logger.info("enter rest client communicate");
        String url = cxt.getString(ParamKey.REST_URL);
        logger.info("rest request url --->" + url);
        if (CommonUtils.isNull(url)) {
            logger.error("rest client url is null");
        }

        HttpMethod method = (HttpMethod) cxt.get(ParamKey.REST_METHOD);

        if (null == method) {
            logger.error("rest client check method error,method is null");
        }
        int retCode = -1;
        switch (method.ordinal()) {

            case I_GET:
                retCode = get(cxt, handle);
                break;
            case I_POST:
                retCode = post(cxt, handle);
                break;
            case I_HEAD:
                retCode = head(cxt, handle);
                break;
            case I_OPTIONS:
                retCode = options(cxt, handle);
                break;
            case I_PUT:
                retCode = put(cxt, handle);
                break;
            case I_DELETE:
                retCode = delete(cxt, handle);
                break;
            default:
                logger.error("rest client method no is error");

        }

        logger.info("exit communicate");
        return retCode;

    }

    private int get(ServiceContext cxt, IHandle handle) {
        logger.info("this a get request");
        HttpGet get = new HttpGet();
        return execute(cxt, handle, get);

    }

    private int post(ServiceContext cxt, IHandle handle) {
        String msg = cxt.getString(ParamKey.REST_MESSAGE);

        logger.info("post request,will send msg--->" + msg);

        HttpPost post = new HttpPost();
        if (!CommonUtils.isNull(msg)) {
            try {
                post.setEntity(new StringEntity(msg, "application/json", "UTF-8"));
            } catch (UnsupportedEncodingException e) {
                logger.error("rest create http post error", e);
            }
        }
        return execute(cxt, handle, post);
    }

    private int head(ServiceContext cxt, IHandle handle) {
        return execute(cxt, handle, new HttpPost());
    }

    private int options(ServiceContext cxt, IHandle handle) {
        return execute(cxt, handle, new HttpPost());
    }

    private int put(ServiceContext cxt, IHandle handle) {
        return execute(cxt, handle, new HttpPost());
    }

    private int delete(ServiceContext cxt, IHandle handle) {
        return execute(cxt, handle, new HttpPost());
    }

    private int execute(ServiceContext cxt, IHandle handle, HttpRequestBase request) {
        logger.info("execute http rest ");
        setSpecialHeaders(request, cxt);

        DefaultHttpClient client = null;

        request.addHeader("Connection", "close");
        if (cxt.get("version") != null && !cxt.get("version").equals("")) {
            request.setHeader("Accept", "application/json;version=" + cxt.get("version") + ";charset=UTF-8");
        }
        //MessageResourceFactory resourceFactory = ResourceUtils.getFactory();
        try {
            cxt.remove(ParamKey.ERROR_CODE);
            URI url = new URI(cxt.getString(ParamKey.REST_URL));

            String token = getToken(cxt, url);

            if (CommonUtils.isNull(token)) {
                return RetCode.LOGIN_ERROR;
            }

            request.setURI(url);
            client = getHttpsClient(url.getPort());

            HttpResponse response = sendRequest(request, client, token);
            cxt.put("version", "");
            int retCode = response.getStatusLine().getStatusCode();
            String respMsg = null;
            try {

                respMsg = EntityUtils.toString(response.getEntity());
            } catch (Exception e) {
                logger.debug(e.toString());
            }

            logger.info("status code: " + retCode);

            if (RetCode.UN_AUTHORIZED == retCode) {

                logger.error("token is not effective, to login again and retry to send request。 ");

                retCode = login(cxt, token);
                if (RetCode.OK != retCode) {
                    logger.error("login to vrm error: " + retCode);
                    return retCode;
                }

                String newToken = PropertiesUtils.get(url.getHost());
                response = sendRequest(request, client, newToken);

                retCode = response.getStatusLine().getStatusCode();
                respMsg = EntityUtils.toString(response.getEntity());

                logger.info("send request again over,ret code: " + retCode);

            }

            logger.info("ret code: " + retCode);

            if (respMsg != null && !respMsg.equals("")) {
                if (!respMsg.contains("assword")) {
                    logger.info("response ---->" + respMsg);
                }
                JSONUtils.parseJson(cxt, respMsg);
                ByteArrayInputStream in = new ByteArrayInputStream(respMsg.getBytes("UTF-8"));
                if (null != handle) {
                    handle.handle(cxt, in);
                }
            } else {
                logger.info("reponse info is null");
            }

            return retCode;
        } catch (ClientProtocolException e) {
            logger.error("rest query error", e);
        } catch (IOException e) {
            logger.error("", e);

            String errMsg = e.getMessage();
            if (errMsg.contains("refused")) {
                logger.error("rest connection time out");
                return RetCode.REST_CONNECT_TIME_OUT;
            }

            return RetCode.REST_IO_ERROR;
        } catch (URISyntaxException e) {
            logger.error("rest query error", e);
        } catch (Exception e) {
            String errMsg = e.getMessage();
            logger.error(errMsg);
            if (errMsg.contains("refused") || errMsg.contains("timed out")) {
                logger.error("rest connection time out");
                return RetCode.REST_CONNECT_TIME_OUT;
            }

            if (errMsg.contains("peer not authenticated")) {
                logger.info("peer not auth, try again");
                this.resetHttpClient();
                return reLogin(cxt, request);
            }

            if (errMsg.contains("parse json to map error")) {
                return RetCode.PARSE_RESPONSE_JSON_ERROR;
            }
            logger.error("execute rest request error", e);
        }
        return RetCode.OK;
    }

    private int reLogin(ServiceContext cxt, HttpRequestBase request) {
        DefaultHttpClient client;
        URI url;
        try {
            url = new URI(cxt.getString(ParamKey.REST_URL));
            String token = getToken(cxt, url);
            logger.info("try to relogin");
            int retCode = login(cxt, token);
            if (RetCode.OK != retCode) {
                logger.error("login to vrm error: " + retCode);
                return retCode;
            }
            String newToken = PropertiesUtils.get(url.getHost());
            client = getHttpsClient(url.getPort());
            HttpResponse response = sendRequest(request, client,
                    newToken);
            retCode = response.getStatusLine().getStatusCode();

            logger.info("send request again over,ret code: " + retCode);
            return retCode;
        } catch (Exception e1) {
            logger.error("", e1);
            return RetCode.RSET_FAILED;
        }
    }

    protected void processErrorCode(IMessageResourceFactory factory, ServiceContext cxt) {

    }

    /**
     * <一句话功能简述>
     * <功能详细描述>
     *
     * @param cxt
     * @param url
     * @return
     * @see [类、类#方法、类#成员]
     */
    private String getToken(ServiceContext cxt, URI url) {
        String token = null;

        try {
            token = PropertiesUtils.get(url.getHost());
        } catch (Exception e) {
            logger.error("", e);
        }

        if (!CommonUtils.isNull(token)) {
            return token;
        }

        logger.info("token is null, will login, reset client to null");
        this.resetHttpClient();
        int retCode = login(cxt, token);
        if (RetCode.OK != retCode) {
            logger.error("login to vrm error,ret code: " + retCode);
            cxt.put(ParamKey.ERROR_CODE, retCode);
            return null;
        }
        token = PropertiesUtils.get(url.getHost());
        return token;
    }

    public int login(ServiceContext cxt, String oldToken) {
        String loginUrl = cxt.getString(ParamKey.REST_URL);
        /*if (null == loginUrl)
        {
            logger.error("login url is null");
            return RetCode.INNER_ERROR;
        }*/

        synchronized (LOCK) {
            logger.info("start login");

            String host = getHost(loginUrl);
            String currentToken = PropertiesUtils.get(host);
            if (currentToken != null && !currentToken.equalsIgnoreCase(oldToken)) {
                logger.info("old token not equal current token,not need to login again");
                return RetCode.OK;
            }

            String userName = cxt.getString(ParamKey.REST_USER);
            String pwd = AESUtils.decrypt(cxt.getString(ParamKey.REST_PWD));
            return toLogin(host, getPort(loginUrl), userName, pwd, cxt);
        }
    }

    protected abstract int toLogin(String host, int port, String userName, String pwd, ServiceContext cxt);

    public abstract void resetHttpClient();

    public int getPort(String loginUrl) {

        URL url = null;
        try {
            url = new URL(loginUrl);
        } catch (MalformedURLException e) {
            logger.error("get login port error");
        }
        return url.getPort();
    }

    public String getHost(String loginUrl) {

        URL url = null;
        try {
            url = new URL(loginUrl);
        } catch (MalformedURLException e) {
            logger.error("get login host error");
        }
        return url.getHost();
    }

    protected HttpResponse sendRequest(HttpRequestBase request, DefaultHttpClient client, String token)
            throws IOException

    {
        //删除旧token
        request.removeHeaders("X-Auth-Token");
        if (!CommonUtils.isNull(token)) {
            //添加新token
            request.addHeader("X-Auth-Token", token);
        }


        HttpResponse response = null;
        int retryTime = PropertiesUtils.getInt("SSL_RETRY_TIME");

        for (int i = 0; true; i++) {
            try {
                response = client.execute(request);
                break;
            } catch (Exception e) {
                String msg = e.getMessage();

                if (i < retryTime && msg.contains("peer not authenticated")) {
                    logger.warn("peer not authenticated,will to retry,i= " + i);
                    continue;
                }
//                throw new UpgradeToolException(msg);
            }

        }

        if (null == response || null == response.getStatusLine()) {
//            throw new UpgradeToolException("rest client response is null");
        }
        return response;
    }

    /**
     * <一句话功能简述>设置头域
     * <功能详细描述>
     *
     * @param request 请求
     * @see [类、类#方法、类#成员]
     */
    protected void setSpecialHeaders(HttpRequestBase request, ServiceContext cxt) {
        this.setSpecialHeaders(request);
    }

    protected void setSpecialHeaders(HttpRequestBase request) {

    }

    /**
     * <一句话功能简述> 获取https client
     * <功能详细描述>
     *
     * @param httpsport 端口
     * @return 实例
     * @see [类、类#方法、类#成员]
     */
    protected abstract DefaultHttpClient getHttpsClient(int httpsPort);

    /**
     * <一句话功能简述> 获取https client
     * <功能详细描述>
     *
     * @param httpsport 端口
     * @param creFile   证书
     * @return 实例
     * @see [类、类#方法、类#成员]
     */
    protected abstract DefaultHttpClient getHttpsClientWithCre(int httpsport, String creFile);

    /**
     * <一句话功能简述>
     * <功能详细描述>
     *
     * @param httpsPort
     * @param creFile
     * @param pwd
     * @return
     * @see [类、类#方法、类#成员]
     */
    protected static Scheme createHttpsSchema(int httpsPort, String creFile, String pwd) {
        logger.info("load ge scheme enter:");
        Scheme sch = null;
        try {
            final X509Certificate[] _AcceptedIssuers = new X509Certificate[]{};
            SSLContext sslContext = SSLContext.getInstance("TLS");

            X509TrustManager tm = new X509TrustManager() {

                @Override
                public void checkClientTrusted(X509Certificate[] arg0,
                                               String arg1) throws CertificateException {
                }

                @Override
                public void checkServerTrusted(X509Certificate[] arg0,
                                               String arg1) throws CertificateException {
                }

                @Override
                public X509Certificate[] getAcceptedIssuers() {
                    return _AcceptedIssuers;
                }

            };

            sslContext.init(null, new TrustManager[]{tm}, new SecureRandom());

            String supportProtocol = PropertiesUtils.get(ParamKey.HAPROXY_PROTOCOL);

            String[] protocol = null;
            if (supportProtocol != null)
                protocol = supportProtocol.split(",");

//            SSLSocketFactory socketFactory =
//                    new WrappedSSLSocketFactory(sslContext, SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER, protocol);
//
//            sch = new Scheme("https", httpsPort, socketFactory);
        } catch (NoSuchAlgorithmException e) {
            logger.error("LoadHttpsConfig getHttpsScheme NoSuchAlgorithmException ", e);
        } catch (KeyManagementException e) {
            logger.error("LoadHttpsConfig getHttpsScheme KeyManagementException ", e);
        } catch (Exception e) {
            logger.error("catch exception while read value from config file", e);
        }
        logger.debug("LoadHttpsConfig getHttpsScheme exit:");
        return sch;
    }
}
