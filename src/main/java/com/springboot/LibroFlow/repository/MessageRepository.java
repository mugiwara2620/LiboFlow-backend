package com.springboot.LibroFlow.repository;

import com.springboot.LibroFlow.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findAllBySenderIdAndReceiverId(int id, int id1);
    @Query("SELECT m FROM Message m WHERE " +
            "(m.sender.id = :sId AND m.receiver.id = :rId) OR " +
            "(m.sender.id = :rId AND m.receiver.id = :sId) " +
            "ORDER BY m.timestamp ASC")
    List<Message> findConversation(@Param("sId") int sId, @Param("rId") int rId);
}
