package com.springboot.LibroFlow.service.book;

import com.springboot.LibroFlow.dto.BookDto;
import com.springboot.LibroFlow.entity.Book;
import com.springboot.LibroFlow.repository.BookRepository;
import com.springboot.LibroFlow.request.AddBookRequest;
import com.springboot.LibroFlow.response.BookResponse;
import com.springboot.LibroFlow.service.image.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService implements IBookService {
    private final BookRepository bookRepository;
    private final ImageService imageService;


    private BookDto convertBookToBookDto(Book book) throws IOException {
        BookDto bookDto = new BookDto();
        bookDto.setId(book.getId());
        bookDto.setUsername(book.getUsername());
        bookDto.setAuthor(book.getAuthor());
        bookDto.setTitle(book.getTitle());
        bookDto.setDescription(book.getDescription());
        bookDto.setPages(book.getPages());
        bookDto.setImage(imageService.downloadImage(book.getImage().getImageData()));
        return bookDto;
    }

    @Override
    public BookDto addNewBook(AddBookRequest request) throws IOException {
        if(isBookExists(request.getAuthor(), request.getTitle())) {
            return null;
        }

        Book newBook = new Book();
        newBook.setAuthor(request.getAuthor());
        newBook.setPages(request.getPages());
        newBook.setDescription(request.getDescription());
        newBook.setTitle(request.getTitle());
        bookRepository.save(newBook);
        imageService.uploadImage(request.getFile(),newBook.getId());
        newBook.setUsername(request.getUsername());
        Book savedBook = bookRepository.save(newBook);
        return convertBookToBookDto(savedBook);
    }

    @Override
    public void removeBookByNameAndAuthor(String title, String author) {
        Book book = bookRepository.findByAuthorAndTitle(author, title);
        bookRepository.delete(book);
    }

    @SneakyThrows
    @Override
    public List<BookDto> getBooksByAuthor(String author) {
        List<Book> books = bookRepository.findAllByAuthor(author);
        return books.stream().map(book -> {
            try {
                return convertBookToBookDto(book);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }).toList();
    }

    @SneakyThrows
    @Override
    public List<BookDto> getAllBooks() {
        List<Book> book = bookRepository.findAll();
        return book.stream().map(book1 -> {
            try {
                return convertBookToBookDto(book1);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }).toList() ;
    }

    @Override
    public boolean isBookExists(String author, String title) {
        Book book = bookRepository.findByAuthorAndTitle(author,title);
        return book!=null;
    }

    @Override
    public BookResponse getBookResponseById(Long id) throws IOException {
        Book book = bookRepository.findById(id).get();

        return new BookResponse(
                book.getTitle(),
                book.getAuthor(),
                book.getDescription(),
                book.getPages(),
                imageService.downloadImage(book.getImage().getImageData()
                ), book.getUsername()
        );
    }
    @Override
    public Book getBookById(Long id) throws IOException {
        Book book = bookRepository.findById(id).get();
        return book;
    }
}
