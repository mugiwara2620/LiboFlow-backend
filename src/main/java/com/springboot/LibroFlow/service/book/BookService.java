package com.springboot.LibroFlow.service.book;

import com.springboot.LibroFlow.dto.BookDto;
import com.springboot.LibroFlow.entity.Book;
import com.springboot.LibroFlow.repository.BookRepository;
import com.springboot.LibroFlow.request.AddBookRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService implements IBookService {
    private final BookRepository bookRepository;
    private final ModelMapper modelMapper;


    private BookDto convertBookToBookDto(Book book) {
        return modelMapper.map(book, BookDto.class);
    }

    @Override
    public BookDto addNewBook(AddBookRequest request) {
        if(isBookExists(request.getAuthor(), request.getTitle())) {
            return null;
        }
        Book newBook = new Book();
        newBook.setAuthor(request.getAuthor());
        newBook.setPages(request.getPages());
        newBook.setDescription(request.getDescription());
        newBook.setTitle(request.getTitle());
        Book savedBook = bookRepository.save(newBook);
        return convertBookToBookDto(savedBook);
    }

    @Override
    public void removeBookByNameAndAuthor(String title, String author) {
        Book book = bookRepository.findByAuthorAndTitle(author, title);
        bookRepository.delete(book);
    }

    @Override
    public List<BookDto> getBooksByAuthor(String author) {
        List<Book> books = bookRepository.findAllByAuthor(author);
        return books.stream().map(this::convertBookToBookDto).toList();
    }

    @Override
    public List<BookDto> getAllBooks() {
        List<Book> book = bookRepository.findAll();
        return book.stream().map(this::convertBookToBookDto).toList() ;
    }

    @Override
    public boolean isBookExists(String author, String title) {
        Book book = bookRepository.findByAuthorAndTitle(author,title);
        return book!=null;
    }

    @Override
    public Book getBookById(Long id) {
        return bookRepository.findById(id).orElse(null);
    }
}
