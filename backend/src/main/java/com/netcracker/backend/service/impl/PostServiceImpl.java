package com.netcracker.backend.service.impl;

import com.netcracker.backend.entity.Post;
import com.netcracker.backend.repository.PostRepository;
import com.netcracker.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Component
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Override
    public Post find(String description) {
        return postRepository.findByDescription(description);
    }

    @Override
    public Post findByUserId(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        return optionalPost.orElse(null);
    }

    @Override
    public List<Post> findAll(int pageNumber, int pageSize, String sortBy, String order) {
        PageRequest pageRequest = this.createRequest(pageNumber, pageSize, sortBy, order);
        return postRepository.findAll(pageRequest).getContent();
    }

    @Override
    public List<Post> findAllByDate(int pageNumber, int pageSize, String sortBy, String order) {
        Date currentDate = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);
        calendar.add(Calendar.HOUR_OF_DAY, -12);
        Date limitDate = calendar.getTime();

        PageRequest pageRequest = this.createRequest(pageNumber, pageSize, sortBy, order);
        return postRepository.findAllByDateBetween(limitDate, currentDate, pageRequest).getContent();
    }

    private PageRequest createRequest(int pageNumber, int pageSize, String sortBy, String order) {
        Sort sort;
        if(order.equals("desc")) {
            sort = Sort.by(sortBy).descending();
        } else {
            sort = Sort.by(sortBy).ascending();
        }
        return PageRequest.of(pageNumber, pageSize, sort);
    }
}
