package com.springboot.LibroFlow.service.chat;

import com.springboot.LibroFlow.dto.MessageDto;
import com.springboot.LibroFlow.entity.Message;
import com.springboot.LibroFlow.entity.OneToOneChat;
import com.springboot.LibroFlow.entity.User;
import com.springboot.LibroFlow.repository.MessageRepository;
import com.springboot.LibroFlow.repository.OneToOneChatRepository;
import com.springboot.LibroFlow.repository.UserRepository;
import com.springboot.LibroFlow.service.user.UserBookService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MessageService implements IMessageService{

    private final MessageRepository messageRepository;
    private final ModelMapper modelMapper;
    private final UserBookService userService;

    @Override
    public List<MessageDto> getAllMessagesByUsernames(String senderName, String receiverName) {
        User user1 = userService.getUserByUserName(senderName);
        User user2 = userService.getUserByUserName(receiverName);

        // 1. Get the full conversation in one go
        List<Message> conversation = messageRepository.findConversation(user1.getId(), user2.getId());

        // 2. Map directly to DTOs
        return conversation.stream()
                .map(message -> {
                    MessageDto dto = new MessageDto() ;
                    dto.setMessage(message.getMessage());
                    dto.setTimestamp(message.getTimestamp());
                    // Dynamically set the sender's username so the UI knows who sent what
                    dto.setSenderName(message.getSender().getUsername());
                    return dto;
                })
                .toList();
    }
}
