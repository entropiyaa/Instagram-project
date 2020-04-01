package com.netcracker.backend.service;

import com.netcracker.backend.entity.Complaint;

import java.util.List;

public interface ComplaintService {
    List<Complaint> findAllByUserId(Long userId);
    List<Complaint> findAllByUsername(String name);
}
