package com.springboot.LibroFlow.request;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Data
public class AddBookRequest {
    private String title;
    private String author;
    private String pages;
    private String description;
    private MultipartFile file;
}
