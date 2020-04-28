package com.netcracker.fapi.service;

import com.netcracker.fapi.dto.pagination.PageWrapper;
import com.netcracker.fapi.entity.Post;

import java.util.List;

public interface PostService {
    Post findById(Long postId);
    PageWrapper findAll(int pageNumber, int pageSize, String sortBy, String order);
    PageWrapper findAllByDate(int pageNumber, int pageSize, String sortBy, String order);
    List<Post> findAllByUserId(Long userId);
    Post save(Post post, Long userId);
    void delete(Long postId);
}
