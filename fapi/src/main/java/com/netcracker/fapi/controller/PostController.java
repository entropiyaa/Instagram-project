package com.netcracker.fapi.controller;

import com.netcracker.fapi.entity.Post;
import com.netcracker.fapi.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Post> getAllPosts() {
        return postService.findAll();
    }

    @RequestMapping(value = "/last", method = RequestMethod.GET)
    public List<Post> getPostsByDate() {
        return postService.findAllByDate();
    }
}
