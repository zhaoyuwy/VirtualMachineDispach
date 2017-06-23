package com.huawei.siteapp.common.util;

/**
 * Created by z00390414 on 2017/6/22.
 * 对界面配置的密码信息提供加密接口和解密接口
 *
 * @version 1.0
 */
public final class AESUtils {
    public static String encrypt(String sSrc) {
        String pwd = null;
        try {
//            Crypter crypter = CrypterFactory.getCrypter(CrypterFactory.AES_CBC);
//            pwd = crypter.encrypt(sSrc);
        } catch (Exception e) {
//            // TODO: handle exception
//            logger.info(e.getMessage());
        }
        return pwd;
    }
    /**
     * <一句话功能简述>对加密后的字符串进行解密
     * <功能详细描述>
     * @param sSrc 待解密的字符串
     * @return 解密后的字符串
     * @throws UpgradeToolException 异常
     * @see [类、类#方法、类#成员]
     */
    public static String decrypt(String sSrc)
    {
        String pwd = null;
        try {
//            Crypter crypter = CrypterFactory.getCrypter(CrypterFactory.AES_CBC);
//            pwd = crypter.decrypt(sSrc);

        } catch (Exception e) {
//            logger.info("exception occor");
            // TODO: handle exception
        }
        return pwd;
    }
}
