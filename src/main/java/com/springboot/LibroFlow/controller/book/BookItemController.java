package com.springboot.LibroFlow.controller.book;

import com.springboot.LibroFlow.dto.BookItemDto;
import com.springboot.LibroFlow.response.ApiResponse;
import com.springboot.LibroFlow.service.bookItem.BookItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/user/bookItem")
@RequiredArgsConstructor
public class BookItemController {

    private final BookItemService bookItemService;

    // Add a book to user's list
    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addBookToMyList(
            @RequestParam Long userId,
            @RequestParam Long bookId) {
        if(!bookItemService.isBookItemExist(userId,bookId)){
            BookItemDto bookItemDto = bookItemService.addBookToMyList(userId, bookId);
            return ResponseEntity.ok().body(new ApiResponse(bookItemDto, "Book added successfully!"));
        }else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse(null, "Book already exist"));
        }
    }

    // Remove a book from user's list
    @DeleteMapping("/remove")
    public ResponseEntity<String> removeBookFromMyList(
            @RequestParam Long userId,
            @RequestParam Long bookId) {
        bookItemService.removeBookFromMyList(userId, bookId);
        return ResponseEntity.ok("Book removed successfully.");
    }

    // Start reading a book
    @PatchMapping("/start-reading")
    public ResponseEntity<String> startReading(
            @RequestParam Long userId,
            @RequestParam Long bookId) {
        bookItemService.startReading(userId, bookId);
        return ResponseEntity.ok("Book status updated to READING.");
    }

    // Finish reading a book
    @PatchMapping("/finish-reading")
    public ResponseEntity<String> finishReading(
            @RequestParam Long userId,
            @RequestParam Long bookId) {
        if(bookItemService.isBookItemExist(userId,bookId)){
            bookItemService.finishReading(userId, bookId);
            return ResponseEntity.ok("Book status updated to FINISHED.");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book not found! Add the book to your list");
        }
    }

    // Get all books for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookItemDto>> getUserBooks(@PathVariable Long userId) {
        List<BookItemDto> bookItems = bookItemService.converteToBookItemDtoList(
                bookItemService.getBookItemsByUserId(userId)
        );
        return ResponseEntity.ok(bookItems);
    }
}
