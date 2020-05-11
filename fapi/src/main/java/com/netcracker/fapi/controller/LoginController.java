package com.netcracker.fapi.controller;

import com.netcracker.fapi.entity.Login;
import com.netcracker.fapi.entity.User;
import com.netcracker.fapi.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/logins")
public class LoginController {

    private LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @GetMapping(value = "/login/{email}")
    public Login getLogin(@PathVariable(name = "email") String email) {
        return loginService.findLoginByEmail(email);
    }

    @GetMapping(value = "/user/{email}")
    public User getUserByEmail(@PathVariable(name = "email") String email) {
        return  loginService.findUserByEmail(email);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<Login> getAllLogins() {
        return loginService.findAll();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "/current")
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return loginService.findUserByEmail(((org.springframework.security.core.userdetails.User)
                authentication.getPrincipal()).getUsername());
    }

    @PreAuthorize("isAnonymous()")
    @PostMapping(value = "/signup", produces = "application/json")
    public Login saveLogin(@RequestBody Login login) {
        return loginService.save(login);
    }

}
