package com.netcracker.fapi.service.impl;

import com.netcracker.fapi.entity.Reaction;
import com.netcracker.fapi.entity.enums.UserReaction;
import com.netcracker.fapi.service.ReactionService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Component
public class ReactionServiceImpl implements ReactionService {

    @Value("${backend.server.url}")
    private String backendUrl;

    @Override
    public Reaction findById(Long reactionId) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendUrl + "/api/reactions?id=" + reactionId, Reaction.class);
    }

    @Override
    public Reaction findByUserIdAndPostId(Long userId, Long postId) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendUrl + "/api/reactions?user=" + userId + "&post=" + postId,
                Reaction.class);
    }

    @Override
    public List<Reaction> findAllByPostIdAndReaction(Long postId, UserReaction reaction) {
        RestTemplate restTemplate = new RestTemplate();
        String path = backendUrl + "/api/reactions?post=" + postId + "&reaction=" + reaction;
        Reaction[] reactions = restTemplate.getForObject(path, Reaction[].class);
        return reactions == null ? Collections.emptyList() : Arrays.asList(reactions);
    }

    @Override
    public Long countAllByPostIdAndReaction(Long postId, UserReaction reaction) {
        RestTemplate restTemplate = new RestTemplate();
        String path = backendUrl + "/api/reactions/count?post=" + postId + "&reaction=" + reaction;
        return restTemplate.getForObject(path, Long.class);
    }

    @Override
    public Reaction save(Reaction reaction) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForObject(backendUrl + "/api/reactions", reaction, Reaction.class);
    }

    @Override
    public void delete(Long reactionId) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(backendUrl + "/api/reactions?id=" + reactionId);
    }
}
