package com.springboot.LibroFlow.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.springboot.LibroFlow.enums.Status;
import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Date;

@Data
@RequiredArgsConstructor
@Table(name = "book_item")
@Entity
public class BookItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Status status;

    private Date startingDate;
    private Date finishingDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "book_id")
    private Book book;

}
