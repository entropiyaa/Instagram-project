package com.netcracker.fapi.service;

import com.netcracker.fapi.entity.Post;

import java.util.List;

public interface PostService {
    List<Post> findAll();
    List<Post> findAllByDate();
}
