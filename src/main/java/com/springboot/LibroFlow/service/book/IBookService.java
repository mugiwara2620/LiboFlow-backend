package com.springboot.LibroFlow.service.book;

import com.springboot.LibroFlow.dto.BookDto;
import com.springboot.LibroFlow.request.AddBookRequest;

import java.util.List;

public interface IBookService {
    BookDto addNewBook(AddBookRequest request);
    void removeBookByNameAndAuthor(String title, String author);


    List<BookDto> getBooksByAuthor(String author);
    List<BookDto> getAllBooks();
    boolean isBookExists(String author, String title);
}
