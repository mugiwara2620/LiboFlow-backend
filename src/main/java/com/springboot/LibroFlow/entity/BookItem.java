package com.springboot.LibroFlow.entity;

import com.springboot.LibroFlow.enums.Status;
import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@Table(name = "book_item")
@Entity
public class BookItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    private Status status;

    private Data loaningDate;
    private Data returningDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "book_id")
    private Book book;

}
