package com.netcracker.fapi.entity;

import com.netcracker.fapi.entity.enums.UserRole;
import com.netcracker.fapi.entity.enums.UserStatus;

import java.util.List;

public class User {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String bio;
    private UserRole role;
    private UserStatus status;
    private List<Post> posts;
//    private List<Reaction> reactions;
//    private List<Complaint> complaints;
//    private Login login;

//    public Login getLogin() {
//        return login;
//    }
//
//    public void setLogin(Login login) {
//        this.login = login;
//    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

//    public List<Reaction> getReactions() {
//        return reactions;
//    }
//
//    public void setReactions(List<Reaction> reactions) {
//        this.reactions = reactions;
//    }
//
//    public List<Complaint> getComplaints() {
//        return complaints;
//    }
//
//    public void setComplaints(List<Complaint> complaints) {
//        this.complaints = complaints;
//    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public UserStatus getStatus() {
        return status;
    }

    public void setStatus(UserStatus status) {
        this.status = status;
    }
}

