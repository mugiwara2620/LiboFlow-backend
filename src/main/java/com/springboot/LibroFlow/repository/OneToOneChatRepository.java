package com.springboot.LibroFlow.repository;

import com.springboot.LibroFlow.entity.OneToOneChat;
import com.springboot.LibroFlow.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OneToOneChatRepository extends JpaRepository<OneToOneChat, Long> {
    Optional<OneToOneChat> findByStudentOneAndStudentTwo(User user1, User user2);
}
