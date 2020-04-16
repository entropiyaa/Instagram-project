package com.netcracker.backend.repository;

import com.netcracker.backend.entity.Post;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends CrudRepository<Post, Long> {
    Post findByDescription(String description);
    Optional<Post> findById(Long postId);
    List<Post> findAll();
    List<Post> findAllByDateBetween(Date limitDate, Date currentDate);
}
