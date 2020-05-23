package com.netcracker.fapi.service;

import com.netcracker.fapi.entity.User;

import java.util.List;

public interface UserService {
    User findById(Long userId);
    User findByUsername(String username);
    List<User> findAll();
}
