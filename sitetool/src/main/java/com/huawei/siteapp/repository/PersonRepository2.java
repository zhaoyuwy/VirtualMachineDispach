package com.huawei.siteapp.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 * Created by z00390414 on 2017/6/16.
 *
 * @version 1.0
 */
@Repository
public class PersonRepository2 {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void addPersonsBySQL(String sql) {
        jdbcTemplate.update(sql);
    }
}
