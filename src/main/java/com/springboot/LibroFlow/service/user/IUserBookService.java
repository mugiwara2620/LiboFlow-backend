package com.springboot.LibroFlow.service.user;

import com.springboot.LibroFlow.dto.BookItemDto;
import com.springboot.LibroFlow.entity.User;

public interface IUserBookService {
    BookItemDto addBookToMyList(Long myId, Long bookId);
    void removeBookFromMyList(Long myId, Long bookId);
    void startReading(Long myId, Long bookId);
    void finishReading(Long myId, Long bookId);
    User getUserById(Long userId);

}
