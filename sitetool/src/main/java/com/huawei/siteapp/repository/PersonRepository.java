package com.huawei.siteapp.repository;

import com.huawei.siteapp.model.Person;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * Created by z00390414 on 2017/6/16.
 *
 * @version 1.0
 */
@Service
public interface PersonRepository extends CrudRepository<Person, Long> {

}