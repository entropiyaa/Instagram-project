package com.netcracker.backend.controller;

import com.netcracker.backend.entity.Post;
import com.netcracker.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping(params = {"page", "size", "sort", "order"})
    public List<Post> getAllPosts( @RequestParam("page") int page,
                                   @RequestParam("size") int size,
                                   @RequestParam("sort") String sortBy,
                                   @RequestParam("order") String order) {
        return postService.findAll(page, size, sortBy, order);
    }

    @GetMapping(value = "/last", params = {"page", "size", "sort", "order"})
    public List<Post> getPostsByDate(@RequestParam("page") int page,
                                     @RequestParam("size") int size,
                                     @RequestParam("sort") String sortBy,
                                     @RequestParam("order") String order) {
        return postService.findAllByDate(page, size, sortBy, order);
    }
}
