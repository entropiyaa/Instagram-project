package com.netcracker.backend.service;

import com.netcracker.backend.entity.Reaction;

import java.util.List;

public interface ReactionService {
    List<Reaction> findAllByPostId(Long postId);
}
