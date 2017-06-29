package com.huawei.siteapp.configuration;

import com.huawei.siteapp.bean.TemplateSourceBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileNotFoundException;
import java.io.InputStream;

/**
 * Created by z00390414 on 2017/6/29.
 *
 * @version 1.0
 */
@Configuration
public class TemplateSourceCfg {
    @Bean
    public TemplateSourceBean templateSource() throws FileNotFoundException {
        TemplateSourceBean templateSourceBean = new TemplateSourceBean();
        ClassLoader cl = getClass().getClassLoader();
        InputStream stream = cl.getResourceAsStream("ExcelTemplate/HostReportTemplate2.xlsx");
        templateSourceBean.setInputStream(stream );
        return templateSourceBean;
    }
}
