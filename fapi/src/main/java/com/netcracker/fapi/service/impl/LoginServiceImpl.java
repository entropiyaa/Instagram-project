package com.netcracker.fapi.service.impl;

import com.netcracker.fapi.entity.Login;
import com.netcracker.fapi.entity.User;
import com.netcracker.fapi.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service("customUserDetailsService")
public class LoginServiceImpl implements UserDetailsService, LoginService {

    @Value("${backend.server.url}")
    private String backendUrl;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public Login findLoginByEmail(String email) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendUrl + "/api/logins/login/" + email, Login.class);
    }

    @Override
    public User findUserByEmail(String email) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendUrl + "/api/logins/user/" + email, User.class);
    }

    @Override
    public List<Login> findAll() {
        RestTemplate restTemplate = new RestTemplate();
        Login[] logins = restTemplate.getForObject(backendUrl + "/api/logins", Login[].class);
        return logins == null ? Collections.emptyList() : Arrays.asList(logins);
    }

    @Override
    public Login save(Login login) {
        login.setPassword(bCryptPasswordEncoder.encode(login.getPassword()));
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForObject(backendUrl + "/api/logins", login, Login.class);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = findUserByEmail(email);
        Login login = findLoginByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(
                login.getEmail(), login.getPassword(), getAuthority(user));
    }

    private Set<SimpleGrantedAuthority> getAuthority(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole()));
        return authorities;
    }
}
