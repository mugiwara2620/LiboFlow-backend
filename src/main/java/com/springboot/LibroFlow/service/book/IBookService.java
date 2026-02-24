package com.springboot.LibroFlow.service.book;

import com.springboot.LibroFlow.dto.BookDto;
import com.springboot.LibroFlow.entity.Book;
import com.springboot.LibroFlow.request.AddBookRequest;
import com.springboot.LibroFlow.response.BookResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IBookService {

    BookDto addNewBook(AddBookRequest request) throws IOException;

    void removeBookByNameAndAuthor(String title, String author);


    List<BookDto> getBooksByAuthor(String author);
    List<BookDto> getAllBooks();
    boolean isBookExists(String author, String title);

    BookResponse getBookResponseById(Long id) throws IOException;
    Book getBookById(Long id) throws IOException;
}
