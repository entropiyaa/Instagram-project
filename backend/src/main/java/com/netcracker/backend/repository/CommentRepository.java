package com.netcracker.backend.repository;

import com.netcracker.backend.entity.Comment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Long> {
    @Query(value = "SELECT * FROM comment c where c.id = ?1", nativeQuery = true)
    Optional<Comment> findById(Long commentId);
    @Query(value = "SELECT * FROM comment", nativeQuery = true)
    List<Comment> findAll();
    @Query(value = "SELECT * FROM comment c where c.post_id = ?1", nativeQuery = true)
    List<Comment> findAllByPostId(Long postId);
    Comment save(Comment comment);
    void deleteById(Long commentId);
}
