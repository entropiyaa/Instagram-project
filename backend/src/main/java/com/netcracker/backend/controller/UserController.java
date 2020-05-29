package com.netcracker.backend.controller;

import com.netcracker.backend.entity.User;
import com.netcracker.backend.service.UserService;
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

    @GetMapping(value = "/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable(name = "userId") Long userId) {
        User user = userService.findById(userId);
        return ResponseEntity.ok(user);
    }

    @GetMapping(value = "user/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        User user = userService.findByUsername(username);
        return ResponseEntity.ok(user);
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.findAll();
    }

    @PostMapping
    public User saveUser(@RequestBody User user) {
        return userService.save(user);
    }

    @PutMapping(value = "/{userId}")
    public User updateUser(@PathVariable Long userId, @RequestBody User user) {
        return userService.update(userId, user);
    }

    @GetMapping(value = "/{id}/subscriptions")
    public ResponseEntity<List<User>> getSubscriptions(@PathVariable("id") Long userId) {
        List<User> subscriptions = userService.getSubscriptions(userId);
        return ResponseEntity.ok(subscriptions);
    }

    @GetMapping(value = "/{id}/subscribers")
    public ResponseEntity<List<User>> getSubscribers(@PathVariable("id") Long userId) {
        List<User> subscribers = userService.getSubscribers(userId);
        return ResponseEntity.ok(subscribers);
    }

    @PostMapping(value = "/{id}/subscriptions")
    public User saveSubscription(@PathVariable("id") Long userId, @RequestBody User subUser) {
        return userService.saveSubscription(userId, subUser);
    }

    @DeleteMapping(value = "/{id}/subscriptions/{subId}")
    public void deleteSubscription(@PathVariable("id") Long id, @PathVariable("subId") Long subId) {
        userService.deleteSubscription(id, subId);
    }
}
