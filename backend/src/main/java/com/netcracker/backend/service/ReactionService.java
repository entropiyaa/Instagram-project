package com.netcracker.backend.service;

import com.netcracker.backend.entity.Reaction;
import com.netcracker.backend.entity.enums.UserReaction;

import java.util.List;
import java.util.Optional;

public interface ReactionService {
    Reaction findById(Long reactionId);
    Reaction findByUserIdAndPostId(Long userId, Long postId);
    List<Reaction> findAllByPostIdAndReaction(Long postId, UserReaction reaction);
    Long countAllByPostIdAndReaction(Long postId, UserReaction reaction);
    Reaction save(Reaction reaction);
    void delete(Long reactionId);
}
