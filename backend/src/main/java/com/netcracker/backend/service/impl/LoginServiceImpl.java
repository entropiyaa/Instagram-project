package com.netcracker.backend.service.impl;

import com.netcracker.backend.entity.Login;
import com.netcracker.backend.entity.User;
import com.netcracker.backend.repository.LoginRepository;
import com.netcracker.backend.service.LoginService;
import com.netcracker.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LoginServiceImpl implements LoginService {

    private LoginRepository loginRepository;
    private UserService userService;

    @Autowired
    public LoginServiceImpl(LoginRepository loginRepository, UserService userService) {
        this.loginRepository = loginRepository;
        this.userService = userService;
    }

    @Override
    public Login findLoginByEmail(String email) {
        return loginRepository.findByEmail(email);
    }

    @Override
    public User findUserByEmail(String email) {
        return loginRepository.findByEmail(email).getUser();
    }

    @Override
    public List<Login> findAll() {
        List<Login> logins = loginRepository.findAll();
        for(Login login : logins) {
            login.setPassword("");
        }
        return logins;
    }

    @Override
    public Login save(Login login) {
        User user = userService.save(login.getUser());
        login.setUser(user);
        Login newLogin = loginRepository.save(login);
        newLogin.setPassword("");
        return newLogin;
    }
}
