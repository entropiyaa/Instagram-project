package com.netcracker.fapi.service;

import com.netcracker.fapi.entity.Comment;

import java.util.List;

public interface CommentService {
    Comment findById(Long commentId);
    List<Comment> findAll();
    List<Comment> findAllByPostId(Long postId);
    Comment save(Comment comment);
    void delete(Long commentId);
}
