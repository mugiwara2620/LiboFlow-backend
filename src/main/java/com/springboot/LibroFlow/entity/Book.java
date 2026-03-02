package com.springboot.LibroFlow.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@RequiredArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String author;
    private String pages;
    private String description;

    private String username;

    @OneToOne(mappedBy = "book",cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id")
    private Image image;
}
