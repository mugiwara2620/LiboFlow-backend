package com.springboot.LibroFlow.controller.user;

import com.springboot.LibroFlow.dto.UserDto;
import com.springboot.LibroFlow.entity.User;
import com.springboot.LibroFlow.enums.Role;
import com.springboot.LibroFlow.response.ApiResponse;
import com.springboot.LibroFlow.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin")
public class UserController {

    public final UserService userService;
//    @GetMapping
//    public ResponseEntity<String> user() {
//        return ResponseEntity.ok().body("Hi user!");
//    }
    @GetMapping("/users/all")
    public ResponseEntity<ApiResponse> getAllUser() {
        try{
            List<UserDto> users = userService.getAllUsers().stream().map(userService::convertUserToUserDto).toList();

            return ResponseEntity.ok().body(new ApiResponse(users,"Getting all users successfully")) ;
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage(),"Getting all users failed")) ;
        }
    }

    @PostMapping("/change/user-role/{email}")
    public ResponseEntity<ApiResponse> changeUserRole(@PathVariable String email, @RequestBody List<String> roles) {
        try{
            UserDetails userDetails = userService.changeRole(email,roles);
            return ResponseEntity.ok().body(new ApiResponse(userDetails,"Changing role successfully"));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage(),"Changing role failed")) ;
        }
    }
}
