package com.netcracker.fapi.service;

import com.netcracker.fapi.entity.Post;
import org.springframework.data.domain.Page;

import java.util.List;

public interface PostService {
    List<Post> findAll(int pageNumber, int pageSize);
    List<Post> findAllByDate(int pageNumber, int pageSize);
}
