package com.huawei.siteapp.service.ModelService.Impl;

import com.huawei.siteapp.repository.BaseRepository;
import com.huawei.siteapp.service.ModelService.IBaseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/**
 * Created by z00390414 on 2017/6/28.
 *
 * @version 1.0
 */
@Transactional(readOnly = true)
public abstract class BaseServiceImpl<T> implements IBaseService<T> {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private BaseRepository<T> repository;
    private Lock lock = new ReentrantLock();

    public void setRepository(BaseRepository<T> repository) {
        this.repository = repository;
    }

    @Override
    @Transactional()
    public <S extends T> S save(S s) {
        return repository.save(s);
    }

    @Override
    @Transactional()
    public synchronized <S extends T> Iterable<S> save(Iterable<S> iterable) {

        save(iterable, "save model");
        return null;
    }

    @Override
    public T findOne(Long id) {
        return repository.findOne(id);
    }

    @Override
    public boolean exists(Long aLong) {
        return repository.exists(aLong);
    }

    @Override
    public Iterable<T> findAll() {
        return repository.findAll();
    }

    @Override
    public Iterable<T> findAll(Iterable<Long> iterable) {
        return repository.findAll(iterable);
    }

    @Override
    public long count() {
        return repository.count();
    }

    @Override
    @Transactional()
    public void delete(Long aLong) {
        repository.delete(aLong);
    }

    @Override
    @Transactional()
    public void delete(T t) {
        repository.delete(t);
    }

    @Override
    @Transactional()
    public void delete(Iterable<? extends T> iterable) {
        repository.delete(iterable);
    }

    @Override
    @Transactional()
    public void deleteAll() {
        repository.deleteAll();
    }

    public synchronized int save(Iterable iterable, String string) {
//        System.out.println(Thread.currentThread().getName() + "准备写入数据");
//        model
        repository.save(iterable);
//        System.out.println(Thread.currentThread().getName() + "写入" + iterable);
        return 0;
    }
}
