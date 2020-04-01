package com.netcracker.backend.repository;

import com.netcracker.backend.entity.Reaction;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReactionRepository extends CrudRepository<Reaction, Long> {
    List<Reaction> findAllByPostId(Long postId);
}
