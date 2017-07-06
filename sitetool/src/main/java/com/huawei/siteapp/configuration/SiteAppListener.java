package com.huawei.siteapp.configuration;

import com.huawei.siteapp.model.UserModel;
import com.huawei.siteapp.service.ExcelService.VmReportServiceImpl;
import com.huawei.siteapp.service.ModelService.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

/**
 * Created by z00390414 on 2017/6/28.
 *
 * @version 1.0
 */

@WebListener
public class SiteAppListener implements ServletContextListener {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private static WebApplicationContext webApplicationContext;

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        logger.info("IndexListener contextInitialized");
        webApplicationContext = (WebApplicationContext) servletContextEvent.getServletContext().getAttribute(WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE);


        VmReportServiceImpl vmReportService = webApplicationContext.getBean(VmReportServiceImpl.class);

//        IUserService userService = webApplicationContext.getBean("IUserService",IUserService.class);
//        UserModel userDao=this.getObjectFromApplication(servletContextEvent.getServletContext(), UserModel.class);
//        System.out.println("取得的Dao的实例="+userDao);

        System.out.println("ServletContex初始化");
        System.out.println(servletContextEvent.getServletContext().getServerInfo());
//        RepositoryTemplate repositoryTemplate = SpringUtil.getBean(RepositoryTemplate.class);
//        try {
//            repositoryTemplate.executeSqlFile();
//        } catch (SQLException e) {
//            logger.error("",e);
//        }
        saveDefaultSystemUser();
    }


    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        System.out.println("ServletContext退出");
    }

    private void saveDefaultSystemUser() {
        String defaultUserName = "admin";
        String defaultPwd = "Huawei123";
//        IUserService userService = SpringUtil.getBean(IUserService.class);
        IUserService userService = webApplicationContext.getBean("IUserService", IUserService.class);
//        UserModel userModel = userService.findOne((long)1);

        UserModel newUser = new UserModel();
        newUser.setUserType(1);
        newUser.setUserName(defaultUserName);
        newUser.setUserPwd(defaultPwd);

        userService.save(newUser);
    }
}
