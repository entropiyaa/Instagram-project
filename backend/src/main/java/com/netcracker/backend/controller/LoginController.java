package com.netcracker.backend.controller;

import com.netcracker.backend.entity.Login;
import com.netcracker.backend.entity.User;
import com.netcracker.backend.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/logins")
public class LoginController {

    private LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @GetMapping(value = "/login/{email}")
    public ResponseEntity<Login> getLoginByEmail(@PathVariable(name = "email") String email) {
        Login login = loginService.findLoginByEmail(email);
        return ResponseEntity.ok(login);
    }

    @GetMapping(value = "/user/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable(name = "email") String email) {
        User user = loginService.findUserByEmail(email);
        return ResponseEntity.ok(user);
    }

    @GetMapping
    public List<Login> getAllLogins() {
        return loginService.findAll();
    }

    @PostMapping(value = "/signup")
    public Login saveLogin(@RequestBody Login login) {
        return loginService.save(login);
    }
}
