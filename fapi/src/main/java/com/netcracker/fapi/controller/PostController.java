package com.netcracker.fapi.controller;

import com.netcracker.fapi.dto.pagination.PageWrapper;
import com.netcracker.fapi.entity.Post;
import com.netcracker.fapi.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
@PreAuthorize("isAuthenticated()")
public class PostController {

    private PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping(params = {"id"})
    public ResponseEntity<Post> getPostById(@RequestParam("id") Long postId) {
        Post post = postService.findById(postId);
        return post == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(post);
    }

    @GetMapping(params = {"page", "size", "sort", "order"})
    public PageWrapper getAllPosts(@RequestParam("page") int page,
                                         @RequestParam("size") int size,
                                         @RequestParam("sort") String sortBy,
                                         @RequestParam("order") String order) {
        return postService.findAll(page, size, sortBy, order);
    }

    @GetMapping(value = "/latest", params = {"page", "size", "sort", "order"})
    public PageWrapper getPostsByDate(@RequestParam("page") int page,
                                     @RequestParam("size") int size,
                                     @RequestParam("sort") String sortBy,
                                     @RequestParam("order") String order) {
        return postService.findAllByDate(page, size, sortBy, order);
    }

    @GetMapping(params = {"user", "page", "size", "sort", "order"})
    public PageWrapper getPostsByUserId(@RequestParam("user") Long id,
                                        @RequestParam("page") int page,
                                        @RequestParam("size") int size,
                                        @RequestParam("sort") String sortBy,
                                        @RequestParam("order") String order) {
        return postService.findAllByUserId(id, page, size, sortBy, order);
    }

    @PostMapping()
    public Post savePost(@RequestBody Post post) {
        return postService.save(post);
    }

    @DeleteMapping(params = {"id"})
    public void deletePost(@RequestParam("id") Long postId) {
        postService.delete(postId);
    }
}
