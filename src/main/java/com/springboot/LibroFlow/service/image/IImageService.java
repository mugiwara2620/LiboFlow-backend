package com.springboot.LibroFlow.service.image;

import com.springboot.LibroFlow.dto.ImageDto;
import com.springboot.LibroFlow.entity.Image;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IImageService {
    void uploadImage(MultipartFile file, Long bookId) throws IOException;


    String downloadImage(byte[] image) throws IOException;

    ImageDto convertToDto(Image image);
}
