package com.netcracker.fapi.controller;

import com.netcracker.fapi.entity.Comment;
import com.netcracker.fapi.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping(value = "/{commentId}")
    public Comment getCommentById(@PathVariable(name = "commentId") Long commentId) {
        return commentService.findById(commentId);
    }

    @GetMapping
    public List<Comment> getAllComments() {
        return commentService.findAll();
    }

    @GetMapping(params = {"post"})
    public List<Comment> getCommentsByPost(@RequestParam("post") Long postId) {
        return commentService.findAllByPostId(postId);
    }

    @PostMapping
    public Comment saveComment(@RequestBody Comment comment) {
        return commentService.save(comment);
    }

    @DeleteMapping(value = "/{commentId}")
    public void deleteComment(@PathVariable(name = "commentId") Long commentId) {
        commentService.delete(commentId);
    }
}
