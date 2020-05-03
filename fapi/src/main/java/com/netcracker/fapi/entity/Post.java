package com.netcracker.fapi.entity;

import java.util.Date;
import java.util.List;

public class Post {
    private Long id;
    private String photo;
    private String description;
    private Date date;
    private String hashtag;
//    private List<Reaction> reactions;
//    private List<Complaint> complaints;
    private User user;

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

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String  photo) {
        this.photo = photo;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getHashtag() {
        return hashtag;
    }

    public void setHashtag(String hashtag) {
        this.hashtag = hashtag;
    }
}
