package com.netcracker.backend.repository;

import com.netcracker.backend.entity.Login;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoginRepository extends CrudRepository<Login, Long> {
    Login findByEmail(String email);
    List<Login> findAll();
    Login save(Login login);
}
