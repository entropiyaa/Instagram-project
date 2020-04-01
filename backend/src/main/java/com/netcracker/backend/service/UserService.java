package com.netcracker.backend.service;

import com.netcracker.backend.entity.User;

public interface UserService {
    User find(String name);
    User findByUserId(Long userId);
}
