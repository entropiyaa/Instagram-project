package com.netcracker.backend.controller;

import com.netcracker.backend.entity.Post;
import com.netcracker.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @RequestMapping(value = "/{description}", method = RequestMethod.GET)
    public Post getPostByName(@PathVariable(name = "description") String description) {
        return postService.find(description);
    }

    @GetMapping(params = {"page", "size"})
    public List<Post> getAllPosts( @RequestParam("page") int page,
                                   @RequestParam("size") int size) {
        return postService.findAll(page, size);
    }

    @RequestMapping(value = "/last", method = RequestMethod.GET)
    public List<Post> getPostsByDate() {
        return postService.findAllByDate();
    }
}
