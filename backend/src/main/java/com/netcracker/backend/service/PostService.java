package com.netcracker.backend.service;

import com.netcracker.backend.dto.pagination.PageWrapper;
import com.netcracker.backend.entity.Post;

public interface PostService {
    Post findById(Long postId);
    PageWrapper<Post> findAll(int pageNumber, int pageSize, String sortBy, String order);
    PageWrapper<Post> findAllByDate(int pageNumber, int pageSize, String sortBy, String order);
    Post save(Post post);
    PageWrapper<Post> findAllByUserId(Long userId, int pageNumber, int pageSize, String sortBy, String order);
    void delete(Long postId);
}
