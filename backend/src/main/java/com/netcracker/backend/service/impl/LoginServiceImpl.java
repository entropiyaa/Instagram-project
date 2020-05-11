package com.netcracker.backend.service.impl;

import com.netcracker.backend.entity.Login;
import com.netcracker.backend.entity.User;
import com.netcracker.backend.repository.LoginRepository;
import com.netcracker.backend.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LoginServiceImpl implements LoginService {

    private LoginRepository loginRepository;

    @Autowired
    public LoginServiceImpl(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
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
        return loginRepository.findAll();
    }

    @Override
    public Login save(Login login) {
        return loginRepository.save(login);
    }
}
