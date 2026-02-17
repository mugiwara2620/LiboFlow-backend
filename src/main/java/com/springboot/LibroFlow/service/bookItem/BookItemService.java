package com.springboot.LibroFlow.service.bookItem;

import com.springboot.LibroFlow.dto.BookItemDto;
import com.springboot.LibroFlow.entity.Book;
import com.springboot.LibroFlow.entity.BookItem;
import com.springboot.LibroFlow.entity.User;
import com.springboot.LibroFlow.enums.Status;
import com.springboot.LibroFlow.repository.BookItemRepository;
import com.springboot.LibroFlow.service.book.BookService;
import com.springboot.LibroFlow.service.user.UserBookService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookItemService implements IBookItemService {

    private final ModelMapper modelMapper;
    private final BookService bookService;
    private final UserBookService userBookService;
    private final BookItemRepository bookItemRepository;

    @Override
    public BookItemDto converteToBookItemDto(BookItem bookItem) {
        return modelMapper.map(bookItem, BookItemDto.class) ;
    }

    @Override
    public List<BookItemDto> converteToBookItemDtoList(List<BookItem> bookItems) {
        return bookItems.stream().map(this::converteToBookItemDto).toList();
    }


    @Override
    public BookItemDto addBookToMyList(Long myId, Long bookId) {
        BookItem bookItem = new BookItem();
        Book book = bookService.getBookById(bookId);
        User user = userBookService.getUserById(myId);
        bookItem.setBook(book);
        bookItem.setUser(user);
        bookItem.setStatus(Status.WANT_TO_READ);
        bookItemRepository.save(bookItem);
        return  modelMapper.map(bookItem, BookItemDto.class) ;
    }

    @Override
    public void removeBookFromMyList(Long myId, Long bookId) {
        BookItem bookItem = bookItemRepository.findByUserIdAndBookId(myId,bookId);
        bookItemRepository.delete(bookItem);
    }

    @Override
    public void startReading(Long myId, Long bookId) {
        BookItem bookItem = bookItemRepository.findByUserIdAndBookId(myId,bookId);
        bookItem.setStatus(Status.READING);
        bookItemRepository.save(bookItem);
    }

    @Override
    public void finishReading(Long myId, Long bookId) {
        BookItem bookItem = bookItemRepository.findByUserIdAndBookId(myId,bookId);
        bookItem.setStatus(Status.FINISHED);
        bookItemRepository.save(bookItem);
    }
    @Override
    public List<BookItem> getBookItemsByUserId(Long userId) {
        return bookItemRepository.findAllByUserId(userId);
    }

    @Override
    public boolean isBookItemExist(Long userId, Long bookId) {
        return bookItemRepository.findByUserIdAndBookId(userId,bookId) !=null;
    }

}
