package com.netcracker.fapi.service;

import com.netcracker.fapi.entity.User;

import java.util.List;

public interface UserService {
    User findById(Long userId);
    List<User> findAll();
}
