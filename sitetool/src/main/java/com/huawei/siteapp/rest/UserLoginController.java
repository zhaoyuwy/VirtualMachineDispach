package com.huawei.siteapp.rest;

import org.springframework.web.bind.annotation.*;

/**
 * Created by z00390414 on 2017/6/14.
 *
 * @version 1.0
 * @date 2017/6/14
 */
@RestController
public class UserLoginController {
    
    @RequestMapping(value = "/service/session", method = RequestMethod.POST, consumes = "application/json")
    public String postLogin(@PathVariable String username, @RequestParam String pwd) {
        return "Welcome," + username;
    }
}
