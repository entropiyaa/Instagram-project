package com.netcracker.fapi.controller;

import com.netcracker.fapi.entity.Complaint;
import com.netcracker.fapi.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@PreAuthorize("isAuthenticated()")
public class ComplaintController {

    private ComplaintService complaintService;

    @Autowired
    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    @GetMapping(params = {"id"})
    public ResponseEntity<Complaint> getComplaintById(@RequestParam("id") Long complaintId) {
        Complaint complaint = complaintService.findById(complaintId);
        return complaint == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(complaint);
    }

    @GetMapping
    public List<Complaint> getAllComplaints() {
        return complaintService.findAll();
    }

    @GetMapping(params = {"post"})
    public List<Complaint> getAllByPostId(@RequestParam("post") Long postId) {
        return complaintService.findAllByPostId(postId);
    }

    @PostMapping
    public Complaint saveComplaint(@RequestBody Complaint complaint) {
        return complaintService.save(complaint);
    }

    @DeleteMapping(params = {"id"})
    public void deleteComplaint(@RequestParam("id") Long complaintId) {
        complaintService.deleteById(complaintId);
    }
}
