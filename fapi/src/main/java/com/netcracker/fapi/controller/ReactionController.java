package com.netcracker.fapi.controller;

import com.netcracker.fapi.entity.Reaction;
import com.netcracker.fapi.entity.enums.UserReaction;
import com.netcracker.fapi.service.ReactionService;
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
        return reaction == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(reaction);
    }

    @GetMapping(params = {"user", "post"})
    public Reaction getReactionByUserIdAndPostId(@RequestParam("user") Long userId,
                                                 @RequestParam("post") Long postId) {
        return reactionService.findByUserIdAndPostId(userId, postId);
    }

    @RequestMapping(params = {"post", "reaction"})
    public List<Reaction> getAllReactionByPostIdAndReaction(@RequestParam("post") Long postId,
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
