package com.netcracker.backend.repository;

import com.netcracker.backend.entity.Comment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Long> {
    Optional<Comment> findById(Long commentId);
    List<Comment> findAll();
    List<Comment> findAllByPostId(Long postId);
    Comment save(Comment comment);
    void deleteById(Long commentId);
}