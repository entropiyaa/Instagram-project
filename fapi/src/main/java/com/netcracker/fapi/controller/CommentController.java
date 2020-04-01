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

    @RequestMapping(value = "/{commentId}", method = RequestMethod.GET)
    public Comment getCommentsById(@PathVariable(name = "commentId") Long commentId) {
        return commentService.findById(commentId);
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Comment> getAllComments() {
        return commentService.findAll();
    }

    @RequestMapping(value = "/byPost/{postId}", method = RequestMethod.GET)
    public List<Comment> getCommentsByPost(@PathVariable(name = "postId") Long postId) {
        return commentService.findAllByPostId(postId);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public Comment addComment(@RequestBody Comment comment) {
        return commentService.addComment(comment);
    }

    @RequestMapping(value = "/{commentId}", method = RequestMethod.DELETE)
    public void deleteComment(@PathVariable(name = "commentId") Long commentId) {
        commentService.deleteCommentById(commentId);
    }
}
