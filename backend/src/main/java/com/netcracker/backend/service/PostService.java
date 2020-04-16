package com.netcracker.backend.service;

import com.netcracker.backend.entity.Post;
import java.util.List;

public interface PostService {
    Post find(String description);
    Post findByUserId(Long postId);
    List<Post> findAll();
    List<Post> findAllByDate();
}
