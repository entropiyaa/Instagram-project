package com.netcracker.fapi.controller;

import com.netcracker.fapi.entity.Post;
import com.netcracker.fapi.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping(params = {"page", "size"})
    public List<Post> getAllPosts(@RequestParam("page") int page,
                                  @RequestParam("size") int size) {
        return postService.findAll(page, size);
    }

    @GetMapping(value = "/last", params = {"page", "size"})
    public List<Post> getPostsByDate(@RequestParam("page") int page,
                                     @RequestParam("size") int size) {
        return postService.findAllByDate(page, size);
    }
}
