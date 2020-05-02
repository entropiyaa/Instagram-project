package com.netcracker.fapi.controller;

import com.netcracker.fapi.dto.pagination.PageWrapper;
import com.netcracker.fapi.entity.Post;
import com.netcracker.fapi.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @DeleteMapping(value = "/{postId}")
    public void deletePost(@PathVariable(name = "postId") Long postId) {
        postService.delete(postId);
    }
}
