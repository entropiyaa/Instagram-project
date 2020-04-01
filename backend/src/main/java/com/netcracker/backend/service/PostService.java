package com.netcracker.backend.service;

import com.netcracker.backend.entity.Post;

public interface PostService {
    Post find(String description);
    Post findByUserId(Long postId);
}
