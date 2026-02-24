package com.springboot.LibroFlow.controller.book;

import com.springboot.LibroFlow.dto.BookDto;
import com.springboot.LibroFlow.repository.BookRepository;
import com.springboot.LibroFlow.request.AddBookRequest;
import com.springboot.LibroFlow.response.ApiResponse;
import com.springboot.LibroFlow.service.book.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class BookController {
    private final BookService bookService;

    @GetMapping("/all")
    public ResponseEntity<ApiResponse> getAllBooks() {
        if(bookService.getAllBooks() == null || bookService.getAllBooks().isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(null,"No Books available"));
        }else{
            return ResponseEntity.ok()
                    .body(new ApiResponse(bookService.getAllBooks(),"Get all books successfully"));
        }
    }

    @GetMapping("/book/{bookId}")
    public ResponseEntity<ApiResponse> getBookById(@PathVariable Long bookId) {
        try{
            if(bookService.getBookById(bookId) == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(null,"Book with id "+bookId+" not found"));
            }
            return ResponseEntity.ok().body(new ApiResponse(bookService.getBookResponseById(bookId),"Get book with id "+bookId));
        }catch(IOException e){
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ApiResponse(e.getMessage(),"Failed to get book with id "+bookId));
        }

    }
    @PostMapping(value = "/admin/book/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)

    private  ResponseEntity<ApiResponse> addBook(@ModelAttribute AddBookRequest request){
        try{
            if (bookService.isBookExists(request.getAuthor(), request.getTitle())) {
                return new ResponseEntity<>(new ApiResponse(null,"Book already exists"),HttpStatus.CONFLICT);
            }
            return new ResponseEntity<>(new ApiResponse(bookService.addNewBook(request),"Book added successfully"),HttpStatus.CREATED) ;
        }catch (Exception e){
            return new ResponseEntity<>(new ApiResponse(e.getMessage(),"Bad "),HttpStatus.NOT_FOUND) ;
        }

    }
    @DeleteMapping("/admin/book/delete/{author}/{title}")
    private ResponseEntity<ApiResponse> removeBook(@PathVariable String title, @PathVariable String author) {
        if(bookService.isBookExists(author, title)) {
            bookService.removeBookByNameAndAuthor(title,author);
            return new ResponseEntity<>(new ApiResponse(null,title + " by "+ author+ " was removed successfully"),HttpStatus.OK);
        }else{
            return new ResponseEntity<>(new ApiResponse(null,title + " not found"),HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/user/book/author/{author}")
    public ResponseEntity<ApiResponse> getBookByAuthor(@PathVariable String author) {
        if(bookService.getBooksByAuthor(author) == null || bookService.getBooksByAuthor(author).isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(null,"No Books available"));
        }else{
            return ResponseEntity.ok()
                    .body(new ApiResponse(bookService.getBooksByAuthor(author),author + "'s book was found"));
        }
    }
}
