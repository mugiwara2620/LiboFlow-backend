package com.springboot.LibroFlow.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MessageDto {
    private String message;
    private LocalDateTime timestamp;
    private String senderName;
}
