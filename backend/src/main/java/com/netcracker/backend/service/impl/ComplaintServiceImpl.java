package com.netcracker.backend.service.impl;

import com.netcracker.backend.entity.Complaint;
import com.netcracker.backend.repository.ComplaintRepository;
import com.netcracker.backend.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ComplaintServiceImpl implements ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Override
    public List<Complaint> findAllByUserId(Long userId) {
        return complaintRepository.findAllByUserId(userId);
    }

    @Override
    public List<Complaint> findAllByUsername(String name) {
        return complaintRepository.findAllByUserUsername(name);
    }
}
