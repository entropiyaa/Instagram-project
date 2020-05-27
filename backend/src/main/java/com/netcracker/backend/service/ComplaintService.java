package com.netcracker.backend.service;

import com.netcracker.backend.entity.Complaint;

import java.util.List;

public interface ComplaintService {
    Complaint findById(Long complaintId);
    List<Complaint> findAll();
    List<Complaint> findAllByPostId(Long postId);
    Complaint save(Complaint complaint);
    void deleteById(Long complaintId);
}
