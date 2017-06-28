package com.huawei.siteapp.configuration;

import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.repository.Impl.RepositoryTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import java.sql.SQLException;

/**
 * Created by z00390414 on 2017/6/28.
 *
 * @version 1.0
 */

@WebListener
public class SiteAppListener implements ServletContextListener {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        logger.info("IndexListener contextInitialized");
        RepositoryTemplate repositoryTemplate = SpringUtil.getBean(RepositoryTemplate.class);
        try {
            repositoryTemplate.executeSqlFile();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {

    }
}
