package com.netcracker.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.netcracker.backend.entity.enums.UserRole;
import com.netcracker.backend.entity.enums.UserStatus;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "user")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String bio;
    private UserRole role;
    private UserStatus status;
    private String photo;
    private List<User> subscribedTo;
    private List<User> subscribedBy;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "username")
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Basic
    @Column(name = "firstName")
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Basic
    @Column(name = "lastName")
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Basic
    @Column(name = "bio")
    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    @Basic
    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    @Basic
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    public UserStatus getStatus() {
        return status;
    }

    public void setStatus(UserStatus status) {
        this.status = status;
    }

    @Lob
    @Basic
    @Column(name = "photo")
    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    @ManyToMany
    @JoinTable(name = "subscriptions",
            joinColumns = {
                @JoinColumn(name = "user_id", referencedColumnName = "id")},
            inverseJoinColumns = {
                @JoinColumn(name = "subscription_id", referencedColumnName = "id")})
    @JsonIgnore
    public List<User> getSubscribedTo() {
        return subscribedTo;
    }

    public void setSubscribedTo(List<User> subscribedTo) {
        this.subscribedTo = subscribedTo;
    }

    @ManyToMany(mappedBy = "subscribedTo")
    @JsonIgnore
    public List<User> getSubscribedBy() {
        return subscribedBy;
    }

    public void setSubscribedBy(List<User> subscribedBy) {
        this.subscribedBy = subscribedBy;
    }
}
