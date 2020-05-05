package com.netcracker.fapi.entity;

import com.netcracker.fapi.entity.enums.UserReaction;

import java.util.Date;

public class Reaction {
    private Long id;
    private UserReaction reaction;
    private Date date;
    private Post post;
    private User user;

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserReaction getReaction() {
        return reaction;
    }

    public void setReaction(UserReaction reaction) {
        this.reaction = reaction;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}

