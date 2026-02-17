package com.springboot.LibroFlow.dto;

import com.springboot.LibroFlow.entity.BookItem;
import lombok.Data;

@Data
public class BookDto {

    private Long id;
    private String title;
    private String author;
    private String pages;
    private String description;
}
