package com.springboot.LibroFlow.controller.book;

import com.springboot.LibroFlow.dto.BookDto;
import com.springboot.LibroFlow.repository.BookRepository;
import com.springboot.LibroFlow.request.AddBookRequest;
import com.springboot.LibroFlow.response.ApiResponse;
import com.springboot.LibroFlow.service.book.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/")
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

    @PostMapping("/admin/book/add")
    private  ResponseEntity<ApiResponse> addBook(@RequestBody AddBookRequest request) {
        if (bookService.isBookExists(request.getAuthor(), request.getTitle())) {
            return new ResponseEntity<>(new ApiResponse(null,"Book already exists"),HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(new ApiResponse(bookService.addNewBook(request),"Book added successfully"),HttpStatus.CREATED) ;
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
