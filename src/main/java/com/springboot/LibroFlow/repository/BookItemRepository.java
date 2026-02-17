package com.springboot.LibroFlow.repository;

import com.springboot.LibroFlow.entity.BookItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookItemRepository extends JpaRepository<BookItem, Long> {
    BookItem findByUserIdAndBookId(Long myId, Long bookId);

    List<BookItem> findAllByUserId(Long userId);
}
