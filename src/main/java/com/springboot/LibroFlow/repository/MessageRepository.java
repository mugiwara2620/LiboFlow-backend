package com.springboot.LibroFlow.repository;

import com.springboot.LibroFlow.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
