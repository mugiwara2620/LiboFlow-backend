package com.springboot.LibroFlow.service.chat;

import com.springboot.LibroFlow.entity.Message;
import com.springboot.LibroFlow.entity.OneToOneChat;
import com.springboot.LibroFlow.entity.User;
import com.springboot.LibroFlow.repository.MessageRepository;
import com.springboot.LibroFlow.repository.OneToOneChatRepository;
import com.springboot.LibroFlow.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageService implements IMessageService{
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final OneToOneChatService oneToOneChatService;
    private final OneToOneChatRepository oneToOneChatRepository;

    @Override
    public void addMessage(Message message_1, User receiver) {
        if (oneToOneChatService.isChatExist(message_1.getSender(),receiver)) {
            OneToOneChat oneToOneChat = oneToOneChatService.getOneToOneChat(message_1.getSender(),receiver);
            oneToOneChat.getMessages().add(message_1);
            oneToOneChatRepository.save(oneToOneChat);
        }else{
            OneToOneChat oneToOneChat = oneToOneChatService.createNewOneToOneChat(message_1.getSender(),receiver);
            oneToOneChat.getMessages().add(message_1);
            oneToOneChatRepository.save(oneToOneChat);
        }
    }
}
