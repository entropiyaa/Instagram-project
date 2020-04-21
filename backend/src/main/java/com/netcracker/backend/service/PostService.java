package com.netcracker.backend.service;

import com.netcracker.backend.entity.Post;
import java.util.List;

public interface PostService {
    Post find(String description);
    Post findByUserId(Long postId);
    List<Post> findAll(int pageNumber, int pageSize, String sortBy, String order);
    List<Post> findAllByDate(int pageNumber, int pageSize, String sortBy, String order);
}
