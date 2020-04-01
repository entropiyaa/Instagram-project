package com.netcracker.backend.controller;

import com.netcracker.backend.entity.Login;
import com.netcracker.backend.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/logins")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Login> getAll() {
        return loginService.findAll();
    }
}
