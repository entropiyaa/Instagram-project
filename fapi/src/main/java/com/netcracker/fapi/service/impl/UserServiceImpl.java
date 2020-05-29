package com.netcracker.fapi.service.impl;

import com.netcracker.fapi.entity.User;
import com.netcracker.fapi.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Component
public class UserServiceImpl implements UserService {

    @Value("${backend.server.url}")
    private String backendUrl;

    @Override
    public User findById(Long userId) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendUrl + "/api/users/" + userId, User.class);
    }

    @Override
    public User findByUsername(String username) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendUrl + "api/users/user/" + username, User.class);
    }

    @Override
    public List<User> findAll() {
        RestTemplate restTemplate = new RestTemplate();
        User[] users = restTemplate.getForObject(backendUrl + "/api/users", User[].class);
        return users == null ? Collections.emptyList() : Arrays.asList(users);
    }

    @Override
    public User update(Long userId, User user) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.put(backendUrl + "api/users/" + userId, user);
        return findById(userId);
    }

    @Override
    public List<User> getSubscriptions(Long userId) {
        RestTemplate restTemplate = new RestTemplate();
        User[] users = restTemplate.getForObject(backendUrl + "/api/users/" + userId + "/subscriptions", User[].class);
        return users == null ? Collections.emptyList() : Arrays.asList(users);
    }

    @Override
    public List<User> getSubscribers(Long userId) {
        RestTemplate restTemplate = new RestTemplate();
        User[] users = restTemplate.getForObject(backendUrl + "/api/users/" + userId + "/subscribers", User[].class);
        return users == null ? Collections.emptyList() : Arrays.asList(users);
    }

    @Override
    public User saveSubscription(Long userId, User subUser) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForObject(backendUrl + "/api/users/" + userId + "/subscriptions", subUser, User.class);
    }

    @Override
    public void deleteSubscription(Long userId, Long subId) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(backendUrl + "/api/users/" + userId + "/subscriptions/" + subId);
    }
}
