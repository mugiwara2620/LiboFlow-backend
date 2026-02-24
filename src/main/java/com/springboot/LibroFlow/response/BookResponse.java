package com.springboot.LibroFlow.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
public class BookResponse {
    private final String title;
    private final String author;
    private final String description;
    private final String pages;
    private final String image;


    public BookResponse(String title, String author, String description, String pages, String image) {

        this.title = title;
        this.author = author;
        this.description = description;
        this.pages = pages;
        this.image = image;
    }
}
