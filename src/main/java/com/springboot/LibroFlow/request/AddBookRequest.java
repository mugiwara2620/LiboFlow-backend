package com.springboot.LibroFlow.request;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Data
public class AddBookRequest {
    private String title;
    private String author;
    private String pages;
    private String description;
}
