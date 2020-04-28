package com.netcracker.backend.service.impl;

import com.netcracker.backend.entity.Comment;
import com.netcracker.backend.entity.Post;
import com.netcracker.backend.entity.User;
import com.netcracker.backend.repository.CommentRepository;
import com.netcracker.backend.service.CommentService;
import com.netcracker.backend.service.PostService;
import com.netcracker.backend.service.UserService;
import com.sun.deploy.net.HttpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Component
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @Override
    public Comment findById(Long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        return optionalComment.orElse(null);
    }

    @Override
    public List<Comment> findAll() {
        return commentRepository.findAll();
    }

    @Override
    public List<Comment> findAllByPostId(Long postId) {
        return commentRepository.findAllByPostId(postId);
    }

    @Override
    public Comment addComment(Comment comment) {
        Post post = postService.findById(comment.getPost().getId());
        comment.setPost(post);
        User user = userService.findById(comment.getUser().getId());
        comment.setUser(user);
        return commentRepository.save(comment);
    }

    @Override
    public void deleteCommentById(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}
