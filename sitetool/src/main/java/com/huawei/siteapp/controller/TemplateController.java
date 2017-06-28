package com.huawei.siteapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

/**
 * Created by z00390414 on 2017/6/29.
 *
 * @version 1.0
 */
@Controller
public class TemplateController {
    @RequestMapping("/helloHtml")
    public String helloHtml(Map<String,Object> map){

        map.put("hello","from TemplateController.helloHtml");
        return"/helloHtml";
    }


    @RequestMapping("/helloFtl")
    public String helloFtl(Map<String,Object> map){
        map.put("hello","from TemplateController.helloFtl");
        return"/helloFtl";
    }
}
