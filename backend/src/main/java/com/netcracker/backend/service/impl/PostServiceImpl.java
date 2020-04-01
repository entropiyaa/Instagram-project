package com.netcracker.backend.service.impl;

import com.netcracker.backend.entity.Post;
import com.netcracker.backend.repository.PostRepository;
import com.netcracker.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Override
    public Post find(String description) {
        return postRepository.findByDescription(description);
    }

    @Override
    public Post findByUserId(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        return optionalPost.orElse(null);
    }
}
