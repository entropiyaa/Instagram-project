package com.netcracker.fapi.service;

import com.netcracker.fapi.entity.Login;
import com.netcracker.fapi.entity.User;

import java.util.List;

public interface LoginService {
    Login findLoginByEmail(String email);
    User findUserByEmail(String email);
    List<Login> findAll();
    Login save(Login login);
}
