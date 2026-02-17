package com.springboot.LibroFlow.service.user;

import com.springboot.LibroFlow.dto.BookItemDto;
import com.springboot.LibroFlow.entity.BookItem;
import com.springboot.LibroFlow.entity.User;
import com.springboot.LibroFlow.repository.BookItemRepository;
import com.springboot.LibroFlow.repository.UserRepository;
import com.springboot.LibroFlow.service.book.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserBookService implements IUserBookService {
    private final BookItemRepository bookItemRepository;
    private final BookService bookService;
    private final UserRepository userRepository;

    @Override
    public BookItemDto addBookToMyList(Long myId, Long bookId) {
        return null;
    }

    @Override
    public void removeBookFromMyList(Long myId, Long bookId) {

    }

    @Override
    public void startReading(Long myId, Long bookId) {

    }

    @Override
    public void finishReading(Long myId, Long bookId) {

    }

    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElseGet(null);
    }
}
