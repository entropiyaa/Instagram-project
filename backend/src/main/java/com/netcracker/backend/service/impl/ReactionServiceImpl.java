package com.netcracker.backend.service.impl;

import com.netcracker.backend.entity.Reaction;
import com.netcracker.backend.repository.ReactionRepository;
import com.netcracker.backend.service.ReactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ReactionServiceImpl implements ReactionService {

    @Autowired
    private ReactionRepository reactionRepository;

    @Override
    public List<Reaction> findAllByPostId(Long postId) {
        return reactionRepository.findAllByPostId(postId);
    }
}
