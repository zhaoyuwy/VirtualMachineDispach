package com.huawei.siteapp.bean;

/**
 * Created by z00390414 on 2017/6/18.
 *
 * @version 1.0
 */
public class Token {
    private static final long serialVersionUID = -3667914001133777991L;

    private String id;
    private long expirationTime;

    public Token(String id, long expirationTime) {
        if (id == null) {
            throw new IllegalArgumentException("id can not be null");
        }

        this.expirationTime = expirationTime;
        this.id = id;
    }

    public Token(String id) {
        if (id == null) {
            throw new IllegalArgumentException("id can not be null");
        }

        this.id = id;
    }

    /**
     * Returns a string containing the unique identifier assigned to this token.
     */
    public String getId() {
        return id;
    }

    public long getExpirationTime() {
        return expirationTime;
    }

    /**
     * expirationTime 不予考虑, 因为就算 expirationTime 不同也认为是相同的 token.
     */
    @Override
    public int hashCode() {
        return id.hashCode();
    }

    @Override
    public boolean equals(Object object) {
        return object instanceof Token && ((Token) object).id.equals(this.id);
    }
}
