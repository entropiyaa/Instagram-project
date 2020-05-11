package com.netcracker.fapi.controller;

import com.netcracker.fapi.entity.User;
import com.netcracker.fapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value = "/{userId}", method = RequestMethod.GET)
    public ResponseEntity<User> getUserById(@PathVariable(name = "userId") Long userId) {
        User user =  userService.findById(userId);
        return user == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(user);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<User> getAllUsers() {
        return userService.findAll();
    }
}
