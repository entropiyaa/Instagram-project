package com.netcracker.fapi.controller;

import com.netcracker.fapi.entity.Comment;
import com.netcracker.fapi.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@PreAuthorize("isAuthenticated()")
public class CommentController {

    private CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping(params = {"id"})
    public ResponseEntity<Comment> getCommentById(@RequestParam("id") Long commentId) {
        Comment comment = commentService.findById(commentId);
        return comment == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(comment);
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

    @DeleteMapping(params = {"id"})
    public void deleteComment(@RequestParam("id") Long commentId) {
        commentService.delete(commentId);
    }
}
