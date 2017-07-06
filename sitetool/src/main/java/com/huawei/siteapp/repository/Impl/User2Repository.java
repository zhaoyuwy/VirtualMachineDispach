package com.huawei.siteapp.repository.Impl;

import com.huawei.siteapp.model.User2;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Created by z00390414 on 2017/7/6.
 *
 * @version 1.0
 */
public interface User2Repository extends JpaRepository<User2, Long> {
    User2 findByName(String name);
    User2 findByNameAndAge(String name, Integer age);
    @Query("select u from User2 u where u.name=:name")
    User2 findUser(@Param("name") String name);
}
