package com.netcracker.fapi.service.impl;

import com.netcracker.fapi.entity.Complaint;
import com.netcracker.fapi.service.ComplaintService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Component
public class ComplaintServiceImpl implements ComplaintService {

    @Value("${backend.server.url}")
    private String backendUrl;

    @Override
    public List<Complaint> findAll() {
        RestTemplate restTemplate = new RestTemplate();
        Complaint[] complaints = restTemplate.getForObject(backendUrl + "/api/complaints", Complaint[].class);
        return complaints == null ? Collections.emptyList() : Arrays.asList(complaints);
    }

    @Override
    public List<Complaint> findAllByPostId(Long postId) {
        RestTemplate restTemplate = new RestTemplate();
        Complaint[] complaints = restTemplate.getForObject(backendUrl + "/api/complaints?post=" + postId,
                Complaint[].class);
        return complaints == null ? Collections.emptyList() : Arrays.asList(complaints);
    }

    @Override
    public Complaint save(Complaint complaint) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForObject(backendUrl + "/api/complaints", complaint, Complaint.class);
    }

    @Override
    public void deleteById(Long complaintId) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(backendUrl + "api/complaints?id=" + complaintId);
    }
}
