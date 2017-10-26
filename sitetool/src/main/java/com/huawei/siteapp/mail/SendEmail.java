package com.huawei.siteapp.mail;


import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.security.Security;
import java.util.Date;
import java.util.Properties;

/**
 * Created by z00390414 on 2017/6/16.
 *
 * @version 1.0
 * @date 2017/6/16
 */
public class SendEmail {

    public static void main(String[] args) throws AddressException,
            MessagingException {
        String SEND_USER = "694998138@qq.com";
        String SEND_UNAME = "694998138";
        String SEND_PWD = "Ishot@12";
        String VALUE_SMTP = "smtp.exmail.qq.com";
        Security.addProvider(new com.sun.net.ssl.internal.ssl.Provider());
        //final String SSL_FACTORY = "javax.net.ssl.SSLSocketFactory";
        // Get a Properties object
        Properties props = System.getProperties();
        // props.setProperty("mail.smtp.host", "smtp.gmail.com");
        props.setProperty("mail.smtp.host", "smtp.exmail.qq.com");
        //props.setProperty("mail.smtp.socketFactory.class", SSL_FACTORY);
        //props.setProperty("mail.smtp.socketFactory.fallback", "false");
        props.setProperty("mail.smtp.port", "25");
        //props.setProperty("mail.smtp.port", "587");
        //props.setProperty("mail.smtp.socketFactory.port", "25");
        //props.setProperty("mail.smtp.socketFactory.port", "587");
        props.put("mail.smtp.auth", "true");
        final String username = "694998138";
        final String password = "Ishot@12";
        Session session = Session.getDefaultInstance(props,
                new Authenticator() {
                    @Override
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });

        // -- Create a new message --
        session.setDebug(true);
        Message msg = new MimeMessage(session);

        // -- Set the FROM and TO fields --
        msg.setFrom(new InternetAddress(username + "@qq.com"));
        msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(
                "694998138@qq.com", false));
        msg.setSubject("Hello---");
        msg.setText("How are you");
        msg.setSentDate(new Date());
        Transport transport = session.getTransport("smtp");
        // smtp验证，就是你用来发邮件的邮箱用户名密码
        transport.connect(VALUE_SMTP, SEND_UNAME, SEND_PWD);
        // 发送
        transport.sendMessage(msg, msg.getAllRecipients());
        Transport.send(msg);
        transport.close();

        System.out.println("Message sent.");
    }

}
