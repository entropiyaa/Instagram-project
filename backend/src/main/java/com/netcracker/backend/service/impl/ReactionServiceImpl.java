package com.netcracker.backend.service.impl;

import com.netcracker.backend.entity.Post;
import com.netcracker.backend.entity.Reaction;
import com.netcracker.backend.entity.User;
import com.netcracker.backend.entity.enums.UserReaction;
import com.netcracker.backend.repository.ReactionRepository;
import com.netcracker.backend.service.PostService;
import com.netcracker.backend.service.ReactionService;
import com.netcracker.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Component
public class ReactionServiceImpl implements ReactionService {

    @Autowired
    private ReactionRepository reactionRepository;

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @Override
    public Reaction findById(Long reactionId) {
        Optional<Reaction> optionalReaction = reactionRepository.findById(reactionId);
        if(!optionalReaction.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Reaction not found");
        }
        return optionalReaction.get();
    }

    @Override
    public Reaction findByUserIdAndPostId(Long userId, Long postId) {
        Optional<Reaction> optionalReaction = reactionRepository.findByUserIdAndPostId(userId, postId);
        return optionalReaction.orElse(null);
    }

    @Override
    public List<Reaction> findAllByPostIdAndReaction(Long postId, UserReaction userReaction) {
        return reactionRepository.findAllByPostIdAndReaction(postId, userReaction);
    }

    @Override
    public Reaction save(Reaction reaction) {
        checkReaction(reaction);
        Optional<Reaction> optionalReaction = reactionRepository.findByUserIdAndPostId(
                reaction.getUser().getId(), reaction.getPost().getId());
        if(optionalReaction.isPresent()) {
            return updateReaction(optionalReaction.get(), reaction);
        } else {
            return saveReaction(reaction);
        }
    }

    private void checkReaction(Reaction reaction) {
        if(reaction.getPost() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Required parameter(post) is missing");
        }
        Post post = postService.findById(reaction.getPost().getId());
        reaction.setPost(post);
        if(reaction.getUser() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Required parameter(user) is missing");
        }
        User user = userService.findById(reaction.getUser().getId());
        reaction.setUser(user);
    }

    private Reaction saveReaction(Reaction reaction) {
        reaction.setDate(new Date());
        return reactionRepository.save(reaction);
    }

    private Reaction updateReaction(Reaction existReaction, Reaction newReaction) {
        if(existReaction.getReaction() != newReaction.getReaction()) {
            existReaction.setReaction(newReaction.getReaction());
            return saveReaction(existReaction);
        } else {
            return null;
        }
    }

    @Override
    public void delete(Long reactionId) {
        reactionRepository.deleteById(reactionId);
    }
}
