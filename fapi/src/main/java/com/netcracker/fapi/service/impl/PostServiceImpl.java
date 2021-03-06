package com.netcracker.fapi.service.impl;

import com.netcracker.fapi.dto.pagination.PageWrapper;
import com.netcracker.fapi.entity.Post;
import com.netcracker.fapi.service.PostService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Component
public class PostServiceImpl implements PostService {

    @Value("${backend.server.url}")
    private String backendUrl;

    @Override
    public Post findById(Long postId) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendUrl + "/api/posts?id=" + postId, Post.class);
    }

    @Override
    public PageWrapper findAll(int pageNumber, int pageSize, String sortBy, String order) {
        RestTemplate restTemplate = new RestTemplate();
        String path = backendUrl + "/api/posts" + "?page=" + pageNumber + "&size=" + pageSize
                                                        + "&sort=" + sortBy + "&order=" + order;
       return restTemplate.getForObject(path, PageWrapper.class);
    }

    @Override
    public PageWrapper findAllByDate(int pageNumber, int pageSize, String sortBy, String order) {
        RestTemplate restTemplate = new RestTemplate();
        String path = backendUrl + "/api/posts/latest" + "?page=" + pageNumber + "&size=" + pageSize
                                                            + "&sort=" + sortBy + "&order=" + order;
        return restTemplate.getForObject(path, PageWrapper.class);
    }

    @Override
    public PageWrapper findAllByUserId(Long id, int pageNumber, int pageSize, String sortBy, String order) {
        RestTemplate restTemplate = new RestTemplate();
        String path = backendUrl + "/api/posts?user=" + id + "&page=" + pageNumber + "&size=" + pageSize
                + "&sort=" + sortBy + "&order=" + order;
        return restTemplate.getForObject(path, PageWrapper.class);
    }

    @Override
    public Post save(Post post) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForEntity(backendUrl + "/api/posts", post, Post.class).getBody();
    }

    @Override
    public void delete(Long postId) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(backendUrl + "/api/posts?id=" + postId);
    }
}
