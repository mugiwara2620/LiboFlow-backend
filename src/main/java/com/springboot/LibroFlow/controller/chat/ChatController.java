//package com.springboot.LibroFlow.controller.chat;
//
//import com.springboot.LibroFlow.entity.Message;
//import com.springboot.LibroFlow.entity.OneToOneChat;
//import com.springboot.LibroFlow.entity.User;
//import com.springboot.LibroFlow.repository.MessageRepository;
//import com.springboot.LibroFlow.request.SendMessageRequest;
//import com.springboot.LibroFlow.response.ApiResponse;
//import com.springboot.LibroFlow.service.chat.IMessageService;
//import com.springboot.LibroFlow.service.chat.IOneToOneChatService;
//import com.springboot.LibroFlow.service.user.IUserBookService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/api/v1/user/chat")
//public class ChatController {
//    private final IOneToOneChatService oneToOneChatService;
//    private final IMessageService messageService;
//    private final IUserBookService userBookService;
//    private final MessageRepository messageRepository;
//
//    @PostMapping("/one-to-one")
//    public ResponseEntity<ApiResponse> newMessage(@RequestBody SendMessageRequest request){
//        try{
//            User sender = userBookService.getUserById(request.getSenderId());
//            User reciever = userBookService.getUserById(request.getRecieverId());
//            Message message = new Message();
//            message.setSender(sender);
//            message.setMessage(request.getMessage());
//            messageRepository.save(message);
//            messageService.addMessage(message, reciever);
//            return ResponseEntity.ok().body(new ApiResponse(true, "Message added successfully"));
//        }catch(Exception e){
//            return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage(), e.getMessage())) ;
//        }
//
//    }
//}

package com.springboot.LibroFlow.controller.chat;

import com.springboot.LibroFlow.entity.Message;
import com.springboot.LibroFlow.repository.MessageRepository;
import com.springboot.LibroFlow.repository.UserRepository;
import com.springboot.LibroFlow.request.SendMessageRequest;
import com.springboot.LibroFlow.response.ApiResponse;
import com.springboot.LibroFlow.service.chat.IMessageService;
import com.springboot.LibroFlow.service.user.UserBookService;
import com.springboot.LibroFlow.service.user.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.hibernate.jdbc.Expectation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final MessageRepository messageRepository;
    private final UserBookService userService;
    private final IMessageService messageService;

    @MessageMapping("/message") // /app/message
    @SendTo("/chatroom/public ")
    public Message receivePublicMessage(@Payload Message message){
        return message;
    }

    @MessageMapping("/private-message") // /user/David/private
    public void receivePrivateMessage(@Payload SendMessageRequest message){
        simpMessagingTemplate.convertAndSendToUser(message.getRecievername(),"/private", message);
    }
    @PostMapping("/api/v1/user/chat/one-to-one")
    public ResponseEntity<ApiResponse> sendOneToOneMessage(@RequestBody SendMessageRequest request){
        try{
            Message message = new Message();
            message.setMessage(request.getMessage());
            message.setReceiver(userService.getUserByUserName(request.getRecievername()));
            message.setSender(userService.getUserByUserName(request.getUsername()));
            return ResponseEntity.ok().body(new ApiResponse(messageRepository.save(message),"Message sent"));

        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(),""));
        }
    }
    @GetMapping("/api/v1/user/chat/{username}/{receivername}")
    @ResponseBody // Required if using @Controller
    public ResponseEntity<ApiResponse> getAllMessages(
            @PathVariable("username") String username,
            @PathVariable("receivername") String receivername) {
        try {
            var messages = messageService.getAllMessagesByUsernames(username, receivername);
            return ResponseEntity.ok().body(new ApiResponse(messages, "Messages fetched successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage(), ""));
        }
    }
}
