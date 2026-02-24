package com.springboot.LibroFlow.service.chat;

import com.springboot.LibroFlow.dto.OneToOneChatDto;
import com.springboot.LibroFlow.entity.Message;
import com.springboot.LibroFlow.entity.OneToOneChat;
import com.springboot.LibroFlow.entity.User;

public interface IOneToOneChatService {
    OneToOneChat createNewOneToOneChat(User user_1, User user_2);
    boolean isChatExist(User user_1, User user_2);
    OneToOneChat getOneToOneChat(User student_1, User student_2);
}
