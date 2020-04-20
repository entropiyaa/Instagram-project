package com.netcracker.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.netcracker.backend.entity.enums.UserReaction;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Reaction {
    private Long id;
    private UserReaction reaction;
    private Date date;
    private Post post;
    private User user;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "post_id")
    @JsonBackReference(value = "post-reaction")
    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    @JsonBackReference(value = "user-reaction")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Id
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name  = "reaction")
    @Enumerated(EnumType.STRING)
    public UserReaction getReaction() {
        return reaction;
    }

    public void setReaction(UserReaction reaction) {
        this.reaction = reaction;
    }

    @Basic
    @Column(name = "date")
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
