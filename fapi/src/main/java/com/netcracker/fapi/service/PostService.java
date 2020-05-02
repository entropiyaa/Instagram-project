package com.netcracker.fapi.service;

import com.netcracker.fapi.dto.pagination.PageWrapper;
import com.netcracker.fapi.entity.Post;

public interface PostService {
    Post findById(Long postId);
    PageWrapper findAll(int pageNumber, int pageSize, String sortBy, String order);
    PageWrapper findAllByDate(int pageNumber, int pageSize, String sortBy, String order);
    PageWrapper findAllByUserId(Long id, int pageNumber, int pageSize, String sortBy, String order);
    Post save(Post post);
    void delete(Long postId);
}
