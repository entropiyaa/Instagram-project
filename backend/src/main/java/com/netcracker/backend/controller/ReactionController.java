package com.netcracker.backend.controller;

import com.netcracker.backend.entity.Reaction;
import com.netcracker.backend.entity.enums.UserReaction;
import com.netcracker.backend.service.ReactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reactions")
public class ReactionController {

    @Autowired
    private ReactionService reactionService;

    @GetMapping(params = {"id"})
    public Reaction getReactionById(@RequestParam("id") Long reactionId) {
        return reactionService.findById(reactionId);
    }

    @GetMapping(params = {"user", "post"})
    public Reaction getReactionByUserIdAndPostId(@RequestParam("user") Long userId,
                                                 @RequestParam("post") Long postId) {
        return reactionService.findByUserIdAndPostId(userId, postId);
    }

    @GetMapping(params = {"post", "reaction"})
    public List<Reaction> getAllReactionByPostId(@RequestParam("post") Long postId,
                                                 @RequestParam("reaction") UserReaction reaction) {
        return reactionService.findAllByPostIdAndReaction(postId, reaction);
    }

    @PostMapping
    public Reaction saveReaction(@RequestBody Reaction reaction) {
        return reactionService.save(reaction);
    }

    @DeleteMapping(params = {"id"})
    public void deleteReaction(@RequestParam("id") Long reactionId) {
        reactionService.delete(reactionId);
    }
}
