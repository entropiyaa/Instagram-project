package com.netcracker.backend.service;

import com.netcracker.backend.entity.Post;
import org.springframework.data.domain.Page;
import java.util.List;

public interface PostService {
    Post find(String description);
    Post findByUserId(Long postId);
    List<Post> findAll(int pageNumber, int pageSize);
    List<Post> findAllByDate();
}
