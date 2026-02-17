package com.springboot.LibroFlow.repository;

import com.springboot.LibroFlow.entity.Book;
import com.springboot.LibroFlow.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {

    Book findByTitle(String title);

    Book findByAuthorAndTitle(String author, String title);

    List<Book> findAllByAuthor(String author);
}
