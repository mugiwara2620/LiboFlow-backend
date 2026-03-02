package com.springboot.LibroFlow.service.chat;

import com.springboot.LibroFlow.dto.MessageDto;
import com.springboot.LibroFlow.entity.Message;
import com.springboot.LibroFlow.entity.OneToOneChat;
import com.springboot.LibroFlow.entity.User;
import com.springboot.LibroFlow.request.SendMessageRequest;

import java.util.List;

public interface IMessageService {
    List<MessageDto> getAllMessagesByUsernames(String senderId, String receiverId);
//    void addMessage(Message message_1, User receiver);
}
