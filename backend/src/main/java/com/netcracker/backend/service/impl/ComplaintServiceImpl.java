package com.netcracker.backend.service.impl;

import com.netcracker.backend.entity.Complaint;
import com.netcracker.backend.entity.Post;
import com.netcracker.backend.entity.User;
import com.netcracker.backend.entity.enums.ComplainStatus;
import com.netcracker.backend.repository.ComplaintRepository;
import com.netcracker.backend.service.ComplaintService;
import com.netcracker.backend.service.PostService;
import com.netcracker.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Component
@Transactional
public class ComplaintServiceImpl implements ComplaintService {

    private ComplaintRepository complaintRepository;
    private PostService postService;
    private UserService userService;

    @Autowired
    public ComplaintServiceImpl(ComplaintRepository complaintRepository, PostService postService, UserService userService) {
        this.complaintRepository = complaintRepository;
        this.postService = postService;
        this.userService = userService;
    }

    @Override
    public Complaint findById(Long complaintId) {
        Optional<Complaint> optionalComplaint = complaintRepository.findById(complaintId);
        return optionalComplaint.orElse(null);
    }

    @Override
    public List<Complaint> findAll() {
        return complaintRepository.findAll();
    }

    @Override
    public List<Complaint> findAllByPostId(Long postId) {
        return complaintRepository.findAllByPostId(postId);
    }

    @Override
    public Complaint save(Complaint complaint) {
        Post post = postService.findById(complaint.getPost().getId());
        complaint.setPost(post);
        User user = userService.findById(complaint.getUser().getId());
        complaint.setUser(user);
        complaint.setStatus(ComplainStatus.UNCHECKED);
        complaint.setDate(new Date());
        return complaintRepository.save(complaint);
    }

    @Override
    public void deleteById(Long complaintId) {
        complaintRepository.deleteById(complaintId);
    }
}
