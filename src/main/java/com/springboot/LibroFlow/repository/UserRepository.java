package com.springboot.LibroFlow.repository;

import com.springboot.LibroFlow.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String username);

}
