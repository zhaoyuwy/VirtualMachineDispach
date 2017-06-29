package com.huawei.siteapp.service.ModelService.Impl;

import com.huawei.siteapp.repository.BaseRepository;
import com.huawei.siteapp.service.ModelService.IBaseService;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by z00390414 on 2017/6/28.
 *
 * @version 1.0
 */
public class BaseServiceImpl<T> implements IBaseService<T> {

    private BaseRepository<T> repository;

    public void setRepository(BaseRepository<T> repository) {
        this.repository = repository;
    }

    @Override
    public synchronized <S extends T> S save(S s) {
        return repository.save(s);
    }

    @Override
    public synchronized <S extends T> Iterable<S> save(Iterable<S> iterable) {

        repository.save(iterable);
        return null;
    }

    @Override
    @Transactional(readOnly = true)
    public synchronized T findOne(Long id) {
        return repository.findOne(id);
    }

    @Override
    public synchronized boolean exists(Long aLong) {
        return repository.exists(aLong);
    }

    @Override
    @Transactional(readOnly = true)
    public synchronized Iterable<T> findAll() {
        return repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public synchronized Iterable<T> findAll(Iterable<Long> iterable) {
        return repository.findAll(iterable);
    }

    @Override
    public long count() {
        return repository.count();
    }

    @Override
    public void delete(Long aLong) {
        repository.delete(aLong);
    }

    @Override
    public void delete(T t) {
        repository.delete(t);
    }

    @Override
    public void delete(Iterable<? extends T> iterable) {
        repository.delete(iterable);
    }

    @Override
    public void deleteAll() {
        repository.deleteAll();
    }
}
