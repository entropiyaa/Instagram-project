package com.netcracker.fapi.service;

import com.netcracker.fapi.entity.Complaint;

import java.util.List;

public interface ComplaintService {
    List<Complaint> findAll();
    List<Complaint> findAllByPostId(Long postId);
    Complaint save(Complaint complaint);
    void deleteById(Long complaintId);
}
