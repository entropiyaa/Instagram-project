package com.netcracker.backend.repository;

import com.netcracker.backend.entity.Complaint;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ComplaintRepository extends CrudRepository<Complaint, Long> {
    Optional<Complaint> findById(Long complaintId);
    List<Complaint> findAll();
    List<Complaint> findAllByPostId(Long postId);
    Complaint save(Complaint complaint);
    void deleteById(Long complaintId);
}
