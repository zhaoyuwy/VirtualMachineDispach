package com.huawei.siteapp.service.ModelService;

import com.huawei.siteapp.model.Site;
import com.huawei.siteapp.repository.SiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by z00390414 on 2017/6/18.
 *
 * @version 1.0
 */
@Service
public class SiteServiceImpl implements ISiteService {
    @Autowired
    private SiteRepository siteRepository;

    @Override
    public void save(Site site) {
        siteRepository.save(site);
    }
    @Override
    public void save(List<Site> sites) {
        siteRepository.save(sites);
    }
    @Override
    public void deleteById(Long id) {
        siteRepository.delete(id);
    }

    @Override
    public void saveByBatch(List<Site> sites) {
        siteRepository.save(sites);
    }

    @Override
    public Site findOne(Long id) {
        return siteRepository.findOne(id);
    }

    public Page<Site> findSiteByName(String name, int pageNo, int pageSize) {
//        return siteRepository.findSiteByName(name, new PageRequest(pageNo - 1, pageSize));
        return null;
    }

    @Override
    public Iterable<Site> findAll() {
        return siteRepository.findAll();
    }

    @Override
    public long count() {
        return siteRepository.count();
    }
}
