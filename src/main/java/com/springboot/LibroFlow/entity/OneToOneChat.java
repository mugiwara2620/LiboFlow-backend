package com.springboot.LibroFlow.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@RequiredArgsConstructor
public class OneToOneChat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_one_id")
    private User studentOne;

    @ManyToOne
    @JoinColumn(name = "student_two_id")
    private User studentTwo;


}
//