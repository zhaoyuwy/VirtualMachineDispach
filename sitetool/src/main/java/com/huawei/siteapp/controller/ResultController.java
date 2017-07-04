package com.huawei.siteapp.controller;

import com.huawei.siteapp.bean.Result;
import com.huawei.siteapp.common.constats.ExceptionEnum;
import com.huawei.siteapp.common.util.ResultUtil;
import com.huawei.siteapp.configuration.ExceptionHandle;
import com.huawei.siteapp.model.PersonModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by z00390414 on 2017/7/4.
 *
 * @version 1.0
 */
@RestController
@RequestMapping("/result")
public class ResultController {
    @Autowired
    private ExceptionHandle exceptionHandle;

    /**
     * 返回体测试
     * @param name
     * @param pwd
     * @return
     */
    @RequestMapping(value = "/getResult",method = RequestMethod.POST)
    public Result getResult(@RequestParam("name") String name, @RequestParam("pwd") String pwd){
        Result result = ResultUtil.success();
        try {
            if (name.equals("zzp")){
                result =  ResultUtil.success(new PersonModel());
            }else if (name.equals("pzz")){
                result =  ResultUtil.error(ExceptionEnum.USER_NOT_FIND);
            }else{
                int i = 1/0;
            }
        }catch (Exception e){
            result =  exceptionHandle.exceptionGet(e);
        }
        return result;
    }
}
