package com.huawei.siteapp.configuration;

import com.huawei.siteapp.bean.TemplateSourceBean;
import com.huawei.siteapp.common.util.ResourceUtil;
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
//        String templatePath = "ExcelTemplate/HostReportTemplate2.xlsx";
        InputStream stream = cl.getResourceAsStream("ExcelTemplate/HostReportTemplate2.xlsx");
//        String templatePath = cl.getResourceAsStream("ExcelTemplate/HostReportTemplate2.xlsx").getPath()+"/ExcelTemplate/HostReportTemplate2.xlsx";

//        String templatePath2 = "ExcelTemplate/";
//        new SpringTemplateLoader((ResourceLoader) cl,templatePath);
//        templateSourceBean.setInputStream(new FileInputStream(templatePath) );
        templateSourceBean.setInputStream(stream );
        System.out.println("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        ResourceUtil.setExcelTemplateStream(stream);
        return templateSourceBean;
    }
}
