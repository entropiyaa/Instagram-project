package com.netcracker.fapi.service.impl;

import com.netcracker.fapi.entity.Comment;
import com.netcracker.fapi.service.CommentService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
public class CommentServiceImpl implements CommentService {

    @Value("${backend.server.url}")
    private String backendUrl;

    @Override
    public Comment findById(Long commentId) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendUrl + "/api/comments/" + commentId, Comment.class);
    }

    @Override
    public List<Comment> findAll() {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendUrl + "/api/comments/all", List.class);
    }

    @Override
    public List<Comment> findAllByPostId(Long postId) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendUrl + "/api/comments/byPost/" + postId, List.class);
    }

    @Override
    public Comment addComment(Comment comment) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForObject(backendUrl + "/api/comments/", comment, Comment.class);
    }

    @Override
    public void deleteCommentById(Long commentId) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(backendUrl + "/api/comments/" + commentId);
    }
}
