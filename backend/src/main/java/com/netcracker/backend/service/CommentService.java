package com.netcracker.backend.service;

import com.netcracker.backend.entity.Comment;

import java.util.List;

public interface CommentService {
    Comment findById(Long commentId);
    List<Comment> findAll();
    List<Comment> findAllByPostId(Long postId);
    Comment save(Comment comment);
    void delete(Long commentId);
}
