package com.netcracker.backend.controller;

import com.netcracker.backend.entity.Comment;
import com.netcracker.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping(params = {"id"})
    public ResponseEntity<Comment> getCommentById(@RequestParam("id") Long commentId) {
        Comment comment = commentService.findById(commentId);
        return ResponseEntity.ok(comment);
    }

    @GetMapping
    public List<Comment> getAllComments() {
        return commentService.findAll();
    }

    @GetMapping(params = {"post"})
    public List<Comment> getCommentsByPostId(@RequestParam("post") Long postId) {
        return commentService.findAllByPostId(postId);
    }

    @PostMapping
    public Comment saveComment(@RequestBody Comment comment) {
        return commentService.save(comment);
    }

    @DeleteMapping(params = {"id"})
    public void deleteComment(@RequestParam("id") Long commentId) {
        commentService.delete(commentId);
    }
}
