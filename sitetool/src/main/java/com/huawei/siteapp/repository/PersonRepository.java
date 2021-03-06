package com.huawei.siteapp.repository;

import com.huawei.siteapp.model.PersonModel;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

/**
 * Created by z00390414 on 2017/6/16.
 *
 * @version 1.0
 */
@Transactional
public interface PersonRepository extends CrudRepository<PersonModel, Long> {

}