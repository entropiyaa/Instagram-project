package com.netcracker.fapi.service.impl;

import com.netcracker.fapi.entity.Comment;
import com.netcracker.fapi.service.CommentService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
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
        Comment[] comments = restTemplate.getForObject(backendUrl + "/api/comments", Comment[].class);
        return comments == null ? Collections.emptyList() : Arrays.asList(comments);
    }

    @Override
    public List<Comment> findAllByPostId(Long postId) {
        RestTemplate restTemplate = new RestTemplate();
        Comment[] comments = restTemplate.getForObject(backendUrl + "/api/comments?post=" + postId, Comment[].class);
        return comments == null ? Collections.emptyList() : Arrays.asList(comments);
    }

    @Override
    public Comment save(Comment comment) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForObject(backendUrl + "/api/comments", comment, Comment.class);
    }

    @Override
    public void delete(Long commentId) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(backendUrl + "/api/comments/" + commentId);
    }
}
