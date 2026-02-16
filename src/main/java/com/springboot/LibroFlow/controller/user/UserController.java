package com.springboot.LibroFlow.controller.user;

import com.springboot.LibroFlow.entity.User;
import com.springboot.LibroFlow.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    public final UserService userService;
    @GetMapping
    public ResponseEntity<String> user() {
        return ResponseEntity.ok().body("Hi user!");
    }
}
