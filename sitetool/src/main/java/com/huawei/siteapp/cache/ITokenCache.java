package com.huawei.siteapp.cache;

import com.huawei.siteapp.bean.Token;

import java.util.List;

/**
 * Created by z00390414 on 2017/6/18.
 *
 * @version 1.0
 */
public interface ITokenCache {
    void put(Token token);

    void remove(Token token);

    boolean contains(Token token);

    List<Token> getAll();
}
