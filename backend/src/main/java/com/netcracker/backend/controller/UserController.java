package com.netcracker.backend.controller;

import com.netcracker.backend.entity.User;
import com.netcracker.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/{userId}", method = RequestMethod.GET)
    public User getUserById(@PathVariable(name = "userId") Long userId) {
        return userService.findById(userId);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<User> getUsers() {
        return userService.findAll();
    }
}
