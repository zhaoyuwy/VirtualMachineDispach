package com.huawei.siteapp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by z00390414 on 2017/7/6.
 *
 * @version 1.0
 */
@Entity
public class User2 {
    @Id
    @GeneratedValue
    private Long id;
    @Column(nullable = false)
    private String name;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Column(nullable = false)

    private Integer age;
// 省略构造函数
// 省略getter和setter
}
