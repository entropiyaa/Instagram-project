package com.netcracker.backend.repository;

import com.netcracker.backend.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends PagingAndSortingRepository<Post, Long> {
    Post findByDescription(String description);
    Optional<Post> findById(Long postId);
    Page<Post> findAll(Pageable pageable);
    List<Post> findAllByDateBetween(Date limitDate, Date currentDate);
}
