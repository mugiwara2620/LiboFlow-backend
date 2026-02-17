package com.springboot.LibroFlow.service.bookItem;

import com.springboot.LibroFlow.dto.BookItemDto;
import com.springboot.LibroFlow.entity.BookItem;

import java.util.List;

public interface IBookItemService {
    BookItemDto converteToBookItemDto(BookItem bookItem);
    List<BookItemDto> converteToBookItemDtoList(List<BookItem> bookItems);
    BookItemDto addBookToMyList(Long myId, Long bookId);
    void removeBookFromMyList(Long myId, Long bookId);
    void startReading(Long myId, Long bookId);
    void finishReading(Long myId, Long bookId);

    List<BookItem> getBookItemsByUserId(Long userId);

    boolean isBookItemExist(Long userId, Long bookId);
}
