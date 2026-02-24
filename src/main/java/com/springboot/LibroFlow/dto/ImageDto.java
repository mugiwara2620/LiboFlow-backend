package com.springboot.LibroFlow.dto;

import com.springboot.LibroFlow.entity.Book;
import jakarta.persistence.*;
import lombok.Data;

@Data
public class ImageDto {

    private String name;
    private String type;

    private byte[] imageData;
}
