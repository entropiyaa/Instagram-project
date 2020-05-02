package com.netcracker.backend.controller;

import com.netcracker.backend.dto.pagination.PageWrapper;
import com.netcracker.backend.entity.Post;
import com.netcracker.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping(value = "/{postId}")
    public Post getPostById(@PathVariable(name = "postId") Long postId) {
        return postService.findById(postId);
    }

    @GetMapping(params = {"page", "size", "sort", "order"})
    public PageWrapper<Post> getAllPosts(@RequestParam("page") int page,
                                         @RequestParam("size") int size,
                                         @RequestParam("sort") String sortBy,
                                         @RequestParam("order") String order) {
        return postService.findAll(page, size, sortBy, order);
    }

    @GetMapping(value = "/latest", params = {"page", "size", "sort", "order"})
    public PageWrapper<Post> getPostsByDate(@RequestParam("page") int page,
                                     @RequestParam("size") int size,
                                     @RequestParam("sort") String sortBy,
                                     @RequestParam("order") String order) {
        return postService.findAllByDate(page, size, sortBy, order);
    }

    @PostMapping()
    public Post savePost(@RequestBody Post post) {
        return postService.save(post);
    }

    @GetMapping(params = {"user", "page", "size", "sort", "order"})
    public PageWrapper<Post> getPostsByUserId(@RequestParam("user") Long id,
                                              @RequestParam("page") int page,
                                              @RequestParam("size") int size,
                                              @RequestParam("sort") String sortBy,
                                              @RequestParam("order") String order) {
        return postService.findAllByUserId(id, page, size, sortBy, order);
    }

    @DeleteMapping(value = "/{postId}")
    public void deletePost(@PathVariable(name ="postId") Long postId) {
        postService.delete(postId);
    }
}
