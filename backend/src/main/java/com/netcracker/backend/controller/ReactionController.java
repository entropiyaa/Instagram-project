package com.netcracker.backend.controller;

import com.netcracker.backend.entity.Reaction;
import com.netcracker.backend.service.ReactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reactions")
public class ReactionController {

    @Autowired
    private ReactionService reactionService;

    @RequestMapping(value = "/{postId}")
    public List<Reaction> getAllReactionByPostId(@PathVariable(name = "postId") Long postId) {
        return reactionService.findAllByPostId(postId);
    }
}
