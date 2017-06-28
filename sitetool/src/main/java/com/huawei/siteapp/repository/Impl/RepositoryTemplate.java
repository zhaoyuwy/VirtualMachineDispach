package com.huawei.siteapp.repository.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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
        jdbcTemplate.execute(triggerSql);
    }
}
