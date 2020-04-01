package com.netcracker.backend.controller;

import com.netcracker.backend.entity.Complaint;
import com.netcracker.backend.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    @RequestMapping(value = "/{userId}", method = RequestMethod.GET)
    public List<Complaint> getAllByUserId(@PathVariable(name = "userId") Long userId) {
        return complaintService.findAllByUserId(userId);
    }

    @RequestMapping(value = "/name/{username}", method = RequestMethod.GET)
    public List<Complaint> getAllByUsername(@PathVariable(name = "username") String username) {
        return complaintService.findAllByUsername(username);
    }
}
