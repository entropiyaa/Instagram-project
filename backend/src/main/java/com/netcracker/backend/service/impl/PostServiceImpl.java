package com.netcracker.backend.service.impl;

import com.netcracker.backend.dto.pagination.PageWrapper;
import com.netcracker.backend.entity.Post;
import com.netcracker.backend.entity.User;
import com.netcracker.backend.repository.PostRepository;
import com.netcracker.backend.service.PostService;
import com.netcracker.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.Date;
import java.util.Optional;

@Component
@Transactional
public class PostServiceImpl implements PostService {

    private PostRepository postRepository;
    private UserService userService;

    @Autowired
    public PostServiceImpl(PostRepository postRepository, UserService userService) {
        this.postRepository = postRepository;
        this.userService = userService;
    }

    @Override
    public Post findById(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        return optionalPost.orElse(null);
    }

    @Override
    public PageWrapper<Post> findAll(int pageNumber, int pageSize, String sortBy, String order) {
        PageRequest pageRequest = this.createRequest(pageNumber, pageSize, sortBy, order);
        Page<Post> page = postRepository.findAll(pageRequest);
        return new PageWrapper<>(page.getContent(), page.getTotalPages());
    }

    @Override
    public PageWrapper<Post> findAllByDate(int pageNumber, int pageSize, String sortBy, String order) {
        Date currentDate = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);
        calendar.add(Calendar.HOUR_OF_DAY, -12);
        Date limitDate = calendar.getTime();

        PageRequest pageRequest = this.createRequest(pageNumber, pageSize, sortBy, order);
        Page<Post> page = postRepository.findAllByDateBetween(limitDate, currentDate, pageRequest);
        return new PageWrapper<>(page.getContent(), page.getTotalPages());
    }

    private PageRequest createRequest(int pageNumber, int pageSize, String sortBy, String order) {
        Sort sort;
        if("desc".equals(order)) {
            sort = Sort.by(sortBy).descending();
        } else {
            sort = Sort.by(sortBy).ascending();
        }
        return PageRequest.of(pageNumber, pageSize, sort);
    }

    @Override
    public Post save(Post post) {
        User user = userService.findById(post.getUser().getId());
        post.setUser(user);
        post.setDate(new Date());
        return postRepository.save(post);
    }

    @Override
    public PageWrapper<Post> findAllByUserId(Long id, int pageNumber, int pageSize, String sortBy, String order) {
        PageRequest pageRequest = this.createRequest(pageNumber, pageSize, sortBy, order);
        Page<Post> page = postRepository.findAllByUserId(id, pageRequest);
        return new PageWrapper<>(page.getContent(), page.getTotalPages());
    }

    @Override
    public void delete(Long postId) {
        postRepository.deleteById(postId);
    }
}
