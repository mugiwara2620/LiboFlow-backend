package com.springboot.LibroFlow.repository;

import com.springboot.LibroFlow.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface ImageRepository extends JpaRepository<Image,Long> {
    Optional<Image> findByName(String fileName);
}
