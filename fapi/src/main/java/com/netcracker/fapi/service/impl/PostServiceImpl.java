package com.netcracker.fapi.service.impl;

import com.netcracker.fapi.entity.Post;
import com.netcracker.fapi.service.PostService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Component
public class PostServiceImpl implements PostService {

    @Value("${backend.server.url}")
    private String backendUrl;

    @Override
    public List<Post> findAll(int pageNumber, int pageSize, String sortBy, String order) {
        RestTemplate restTemplate = new RestTemplate();
        String path = backendUrl + "/api/posts" + "?page=" + pageNumber + "&size=" + pageSize
                                                        + "&sort=" + sortBy + "&order=" + order;
        Post[] posts = restTemplate.getForObject(path, Post[].class);
        return posts == null ? Collections.emptyList() : Arrays.asList(posts);
    }

    @Override
    public List<Post> findAllByDate(int pageNumber, int pageSize, String sortBy, String order) {
        RestTemplate restTemplate = new RestTemplate();
        String path = backendUrl + "/api/posts/last" + "?page=" + pageNumber + "&size=" + pageSize
                                                            + "&sort=" + sortBy + "&order=" + order;
        Post[] posts = restTemplate.getForObject(path, Post[].class);
        return posts == null ? Collections.emptyList() : Arrays.asList(posts);
    }
}
