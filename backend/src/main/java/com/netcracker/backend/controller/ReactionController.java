package com.netcracker.backend.controller;

import com.netcracker.backend.entity.Reaction;
import com.netcracker.backend.entity.enums.UserReaction;
import com.netcracker.backend.service.ReactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reactions")
public class ReactionController {

    private ReactionService reactionService;

    @Autowired
    public ReactionController(ReactionService reactionService) {
        this.reactionService = reactionService;
    }

    @GetMapping(params = {"id"})
    public ResponseEntity<Reaction> getReactionById(@RequestParam("id") Long reactionId) {
        Reaction reaction = reactionService.findById(reactionId);
        return ResponseEntity.ok(reaction);
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

    @GetMapping(value = "/count", params = {"post", "reaction"})
    public Long getReactionsCount(@RequestParam("post") Long postId,
                                 @RequestParam("reaction") UserReaction reaction) {
        return reactionService.countAllByPostIdAndReaction(postId, reaction);
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
