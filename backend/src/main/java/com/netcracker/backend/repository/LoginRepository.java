package com.netcracker.backend.repository;

import com.netcracker.backend.entity.Login;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LoginRepository extends CrudRepository<Login, Long> {
    Optional<Login> findByEmail(String email);
    List<Login> findAll();
    Login save(Login login);
}
