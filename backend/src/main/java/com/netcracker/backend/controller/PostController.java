package com.netcracker.backend.controller;

import com.netcracker.backend.entity.Post;
import com.netcracker.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @RequestMapping(value = "/{description}", method = RequestMethod.GET)
    public Post getPostByName(@PathVariable(name = "description") String description) {
        return postService.find(description);
    }
}
