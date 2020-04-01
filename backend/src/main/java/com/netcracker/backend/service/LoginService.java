package com.netcracker.backend.service;

import com.netcracker.backend.entity.Login;

import java.util.List;

public interface LoginService {
    List<Login> findAll();
}
