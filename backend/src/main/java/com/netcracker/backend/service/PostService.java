package com.netcracker.backend.service;

import com.netcracker.backend.dto.pagination.PageWrapper;
import com.netcracker.backend.entity.Post;

import java.util.List;

public interface PostService {
    Post findById(Long postId);
    PageWrapper<Post> findAll(int pageNumber, int pageSize, String sortBy, String order);
    PageWrapper<Post> findAllByDate(int pageNumber, int pageSize, String sortBy, String order);
    Post save(Post post);
    List<Post> findAllByUserId(Long userId);
    void delete(Long postId);
}
