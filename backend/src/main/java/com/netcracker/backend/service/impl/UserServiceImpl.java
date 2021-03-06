package com.netcracker.backend.service.impl;

import com.netcracker.backend.entity.User;
import com.netcracker.backend.entity.enums.UserRole;
import com.netcracker.backend.entity.enums.UserStatus;
import com.netcracker.backend.repository.UserRepository;
import com.netcracker.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User findById(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        return optionalUser.orElse(null);
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User save(User user) {
        user.setRole(UserRole.USER);
        user.setStatus(UserStatus.ACTIVE);
        return userRepository.save(user);
    }

    @Override
    public User update(Long userId, User user) {
        User updUser = findById(userId);
        updUser.setStatus(user.getStatus());
        return userRepository.save(updUser);
    }

    @Override
    public List<User> getSubscriptions(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        return optionalUser.isPresent()
                ? optionalUser.get().getSubscribedTo()
                : new ArrayList<>();
    }

    @Override
    public List<User> getSubscribers(Long userId) {
        Optional <User> optionalUser = userRepository.findById(userId);
        return optionalUser.isPresent()
                ? optionalUser.get().getSubscribedBy()
                : new ArrayList<>();
    }

    // userId - I, subUser - i with to subscribe
    @Override
    public User saveSubscription(Long userId, User subUser) {
        if(!userId.equals(subUser.getId())) {
            Optional<User> optionalUser = userRepository.findById(userId);
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                Optional<User> optionalSubToUser = userRepository.findById(subUser.getId());
                if (optionalSubToUser.isPresent()) {
                    User subToUser = optionalSubToUser.get();
                    subToUser.getSubscribedTo().add(user);
                    userRepository.save(subToUser);
                    return user;
                }
            }
        }
        return null;
    }

    @Override
    public void deleteSubscription(Long userId, Long subId) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()) {
            Optional<User> subToUser = userRepository.findById(subId);
            if(subToUser.isPresent()) {
                subToUser.get().getSubscribedTo().remove(user.get());
                userRepository.save(subToUser.get());
            }
        }
    }
}
