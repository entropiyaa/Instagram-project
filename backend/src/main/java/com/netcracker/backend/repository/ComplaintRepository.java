package com.netcracker.backend.repository;

import com.netcracker.backend.entity.Complaint;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends CrudRepository<Complaint, Long> {
    List<Complaint> findAllByUserId(Long userId);
    List<Complaint> findAllByUserUsername(String name);
}