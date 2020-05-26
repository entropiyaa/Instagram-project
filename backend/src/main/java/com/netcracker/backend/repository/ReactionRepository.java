package com.netcracker.backend.repository;

import com.netcracker.backend.entity.Reaction;
import com.netcracker.backend.entity.enums.UserReaction;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReactionRepository extends CrudRepository<Reaction, Long> {
    Optional<Reaction> findById(Long reactionId);
    Optional<Reaction> findByUserIdAndPostId(Long userId, Long postId);
    List<Reaction> findAllByPostIdAndReaction(Long postId, UserReaction reaction);
    Long countAllByPostIdAndReaction(Long postId, UserReaction reaction);
    Reaction save(Reaction reaction);
    void deleteById(Long reactionId);
}
