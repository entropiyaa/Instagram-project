package com.netcracker.backend.controller;

import com.netcracker.backend.dto.pagination.PageWrapper;
import com.netcracker.backend.entity.Post;
import com.netcracker.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping(params = {"id"})
    public ResponseEntity<Post> getPostById(@RequestParam("id") Long postId) {
        Post post = postService.findById(postId);
        return ResponseEntity.ok(post);
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

    @DeleteMapping(params = {"id"})
    public void deletePost(@RequestParam("id") Long postId) {
        postService.delete(postId);
    }
}
