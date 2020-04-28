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
    public List<User> findAll() {
        RestTemplate restTemplate = new RestTemplate();
        User[] users = restTemplate.getForObject(backendUrl + "/api/users", User[].class);
        return users == null ? Collections.emptyList() : Arrays.asList(users);
    }
}
