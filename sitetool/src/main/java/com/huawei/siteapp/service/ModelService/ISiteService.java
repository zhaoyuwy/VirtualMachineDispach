package com.huawei.siteapp.service.ModelService;

import com.huawei.siteapp.model.Site;

import java.util.List;

/**
 * Created by z00390414 on 2017/6/19.
 *
 * @version 1.0
 */
public interface ISiteService{
    void save(Site site);

    void deleteById(Long id);

    void saveByBatch(List<Site> Sites);

    Site findOne(Long id);

    Iterable<Site> findAll();

    long count();
}
