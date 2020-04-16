package com.netcracker.fapi.service.impl;

import com.netcracker.fapi.entity.Post;
import com.netcracker.fapi.service.PostService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
public class PostServiceImpl implements PostService {

    @Value("${backend.server.url}")
    private String backendUrl;

    @Override
    public List<Post> findAll() {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendUrl + "/api/posts/all", List.class);
    }

    @Override
    public List<Post> findAllByDate() {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendUrl + "/api/posts/last", List.class);
    }
}
