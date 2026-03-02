package com.springboot.LibroFlow.controller.admin;

import com.springboot.LibroFlow.dto.UserDto;
import com.springboot.LibroFlow.response.ApiResponse;
import com.springboot.LibroFlow.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    public final UserService userService;

    @GetMapping
    public ResponseEntity<String> admin() {
        return ResponseEntity.ok().body("Hi admin!");
    }

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
