package com.netcracker.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.netcracker.backend.entity.enums.ComplainStatus;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "complaint")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Complaint {
    private Long id;
    private String cause;
    private Date date;
    private ComplainStatus status;
    private Post post;
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "post_id")
    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

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
    @Column(name = "cause")
    public String getCause() {
        return cause;
    }

    public void setCause(String cause) {
        this.cause = cause;
    }

    @Basic
    @Column(name = "date")
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Basic
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    public ComplainStatus getStatus() {
        return status;
    }

    public void setStatus(ComplainStatus status) {
        this.status = status;
    }
}
