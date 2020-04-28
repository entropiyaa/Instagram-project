package com.netcracker.backend.repository;

import com.netcracker.backend.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User,Long> {
    Optional<User> findById(Long userId);
    List<User> findAll();
    void deleteById(Long userId);
}
