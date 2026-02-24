package com.springboot.LibroFlow.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name = "image")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String type;

    @Lob
    @Column(name="imagedata",columnDefinition = "LONGBLOB")
    private byte[] imageData;

    @OneToOne
    @JoinColumn(name = "book_id")
    private Book book;


}
