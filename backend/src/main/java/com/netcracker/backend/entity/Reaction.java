package com.netcracker.backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.netcracker.backend.entity.enums.UserReaction;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "reaction")
public class Reaction {
    private Long id;
    private UserReaction reaction;
    private Date date;
    private Post post;
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "post_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    @ManyToOne
    @JoinColumn(name = "user_id")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
