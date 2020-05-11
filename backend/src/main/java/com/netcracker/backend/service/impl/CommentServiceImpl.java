package com.netcracker.backend.service.impl;

import com.netcracker.backend.entity.Comment;
import com.netcracker.backend.entity.Post;
import com.netcracker.backend.entity.User;
import com.netcracker.backend.repository.CommentRepository;
import com.netcracker.backend.service.CommentService;
import com.netcracker.backend.service.PostService;
import com.netcracker.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Component
@Transactional
public class CommentServiceImpl implements CommentService {

    private CommentRepository commentRepository;
    private PostService postService;
    private UserService userService;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository, PostService postService, UserService userService) {
        this.commentRepository = commentRepository;
        this.postService = postService;
        this.userService = userService;
    }

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
    public Comment save(Comment comment) {
        Post post = postService.findById(comment.getPost().getId());
        comment.setPost(post);
        User user = userService.findById(comment.getUser().getId());
        comment.setUser(user);
        comment.setDate(new Date());
        return commentRepository.save(comment);
    }

    @Override
    public void delete(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}
