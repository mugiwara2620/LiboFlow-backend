package com.springboot.LibroFlow.controller.user;

import com.springboot.LibroFlow.dto.UserDto;
import com.springboot.LibroFlow.entity.User;
import com.springboot.LibroFlow.enums.Role;
import com.springboot.LibroFlow.response.ApiResponse;
import com.springboot.LibroFlow.service.user.UserBookService;
import com.springboot.LibroFlow.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

    public final UserService userService;
//    @GetMapping
//    public ResponseEntity<String> user() {
//        return ResponseEntity.ok().body("Hi user!");
//    }


    @GetMapping("/{username}")
    public ResponseEntity<ApiResponse> getUser(@PathVariable("username") String username) {
        try{
            return ResponseEntity.ok().body(new ApiResponse(userService.loadUserByUsername(username),"User found"));
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage(),"User Not Found"));
        }
    }

}
