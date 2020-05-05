package com.netcracker.backend.service.impl;

import com.netcracker.backend.entity.Complaint;
import com.netcracker.backend.entity.enums.ComplainStatus;
import com.netcracker.backend.repository.ComplaintRepository;
import com.netcracker.backend.service.ComplaintService;
import com.sun.xml.internal.bind.v2.TODO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class ComplaintServiceImpl implements ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

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
        // TODO: check null;
        complaint.setStatus(ComplainStatus.UNCHECKED);
        complaint.setDate(new Date());
        return complaintRepository.save(complaint);
    }

    @Override
    public void deleteById(Long complaintId) {
        complaintRepository.deleteById(complaintId);
    }
}
