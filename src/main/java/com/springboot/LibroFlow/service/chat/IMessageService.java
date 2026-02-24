package com.springboot.LibroFlow.service.chat;

import com.springboot.LibroFlow.dto.MessageDto;
import com.springboot.LibroFlow.entity.Message;
import com.springboot.LibroFlow.entity.OneToOneChat;
import com.springboot.LibroFlow.entity.User;
import com.springboot.LibroFlow.request.SendMessageRequest;

public interface IMessageService {
    void addMessage(Message message_1, User receiver);
}
