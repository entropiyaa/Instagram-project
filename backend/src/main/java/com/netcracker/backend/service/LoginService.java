package com.netcracker.backend.service;

import com.netcracker.backend.entity.Login;
import com.netcracker.backend.entity.User;

import java.util.List;

public interface LoginService {
    Login findLoginByEmail(String email);
    User findUserByEmail(String email);
    List<Login> findAll();
    Login save(Login login);
}
