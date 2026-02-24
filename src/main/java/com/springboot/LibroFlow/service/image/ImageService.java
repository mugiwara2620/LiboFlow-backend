package com.springboot.LibroFlow.service.image;

import com.springboot.LibroFlow.dto.ImageDto;
import com.springboot.LibroFlow.entity.Book;
import com.springboot.LibroFlow.entity.Image;
import com.springboot.LibroFlow.repository.BookRepository;
import com.springboot.LibroFlow.repository.ImageRepository;
import com.springboot.LibroFlow.utils.ImageUtils;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class ImageService implements IImageService {
    private final ImageRepository imageRepository;
    private final BookRepository bookRepository;
    private final ModelMapper modelMapper;
    @Override
    public void uploadImage(MultipartFile file, Long bookId) throws IOException {
        Book book = bookRepository.findById(bookId).get();
        book.setImage(imageRepository.save(Image.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .book(book)
                .imageData(ImageUtils.compressImage(file.getBytes())).build()));
//        image.setBook(book);
        bookRepository.save(book);
//        image.setBook(book);
    }
    @Override
    public String downloadImage(byte[] image) throws IOException {
        byte[] i = ImageUtils.decompressImage(image);
        return Base64.getEncoder().encodeToString(i) ;
    }

    @Override
    public ImageDto convertToDto(Image image){
        return  modelMapper.map(image, ImageDto.class);
    }

}
