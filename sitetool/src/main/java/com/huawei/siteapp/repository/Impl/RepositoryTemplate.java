package com.huawei.siteapp.repository.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.init.ScriptUtils;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.SQLException;

/**
 * Created by z00390414 on 2017/6/16.
 *
 * @version 1.0
 */
@Repository
public class RepositoryTemplate {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void addTriggerBySQL(String triggerSql) {
        String filePath = getClass().getClassLoader().getResource("").getPath();
        System.out.println(filePath);
        jdbcTemplate.execute(triggerSql);
    }

    public void executeSqlFile() throws SQLException {
        jdbcTemplate.getDataSource().getConnection();
        DataSource  dataSource = jdbcTemplate.getDataSource();
        ScriptUtils.executeSqlScript(dataSource.getConnection(), new ClassPathResource("sitetool.sql"));
//        jdbcTemplate.ex
    }

}
