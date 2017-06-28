package com.huawei.siteapp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

/**
 * Created by z00390414 on 2017/6/28.
 *
 * @version 1.0
 */
@NoRepositoryBean
public interface BaseRepository <T> extends CrudRepository<T, Long> {
}
