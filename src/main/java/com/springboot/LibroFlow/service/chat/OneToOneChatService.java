package com.springboot.LibroFlow.service.chat;

import com.springboot.LibroFlow.entity.OneToOneChat;
import com.springboot.LibroFlow.entity.User;
import com.springboot.LibroFlow.repository.OneToOneChatRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OneToOneChatService implements IOneToOneChatService{

//    private final OneToOneChatRepository oneToOneChatRepository;
//
//    @Override
//    public OneToOneChat createNewOneToOneChat(User user_1, User user_2) {
//        OneToOneChat oneToOneChat=new OneToOneChat();
//        oneToOneChat.setStudentOne(user_1);
//        oneToOneChat.setStudentTwo(user_2);
//        return oneToOneChatRepository.save(oneToOneChat);
//
//    }
//
//    @Override
//    public boolean isChatExist(User user_1, User user_2) {
//        Optional<OneToOneChat> oneToOneChat = oneToOneChatRepository.findByStudentOneAndStudentTwo(user_1,user_2);
//        return oneToOneChat.isPresent();
//    }
//
//   @Override
//   public OneToOneChat getOneToOneChat(User student_1, User student_2){
//       Optional<OneToOneChat> oneToOneChat = oneToOneChatRepository.findByStudentOneAndStudentTwo(student_1,student_2);
//       return oneToOneChat.orElse(null);
//   }

}




















