package com.springboot.LibroFlow.dto;

import com.springboot.LibroFlow.entity.Message;
import com.springboot.LibroFlow.entity.User;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class OneToOneChatDto {
    private Long id;

    private String studentOne;

    private String studentTwo;

    private List<MessageDto> messages = new ArrayList<>();
}
