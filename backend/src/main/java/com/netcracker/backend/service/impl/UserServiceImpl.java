package com.netcracker.backend.service.impl;

import com.netcracker.backend.entity.User;
import com.netcracker.backend.repository.UserRepository;
import com.netcracker.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Component
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User findById(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if(!optionalUser.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        return optionalUser.get();
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }
}
