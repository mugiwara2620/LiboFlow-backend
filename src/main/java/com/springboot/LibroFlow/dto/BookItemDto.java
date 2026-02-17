package com.springboot.LibroFlow.dto;

import com.springboot.LibroFlow.entity.Book;
import com.springboot.LibroFlow.entity.User;
import com.springboot.LibroFlow.enums.Status;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
public class BookItemDto {

    private Status status;

    private Date startingDate;
    private Date finishingDate;

    private BookDto book;
}
