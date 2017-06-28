package com.huawei.siteapp.configuration;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

/**
 * Created by z00390414 on 2017/6/28.
 *
 * @version 1.0
 */
@WebFilter(urlPatterns = "/*", filterName = "indexFilter")
public class SiteAppFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

    }

    @Override
    public void destroy() {

    }
}
