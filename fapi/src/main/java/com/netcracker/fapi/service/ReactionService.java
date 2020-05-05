package com.netcracker.fapi.service;

import com.netcracker.fapi.entity.Reaction;
import com.netcracker.fapi.entity.enums.UserReaction;

import java.util.List;

public interface ReactionService {
    Reaction findById(Long reactionId);
    Reaction findByUserIdAndPostId(Long userId, Long postId);
    List<Reaction> findAllByPostIdAndReaction(Long postId, UserReaction userReaction);
    Reaction save(Reaction reaction);
    void delete(Long reactionId);
}
