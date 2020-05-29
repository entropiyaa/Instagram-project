package com.netcracker.fapi.service;

import com.netcracker.fapi.entity.User;

import java.util.List;

public interface UserService {
    User findById(Long userId);
    User findByUsername(String username);
    List<User> findAll();
    User update(Long userId, User user);
    List<User> getSubscriptions(Long userId);
    List<User> getSubscribers(Long userId);
    User saveSubscription(Long userId, User subUser);
    void deleteSubscription(Long userId, Long subId);
}
