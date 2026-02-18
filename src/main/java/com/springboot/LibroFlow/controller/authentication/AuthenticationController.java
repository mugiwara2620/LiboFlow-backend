package com.springboot.LibroFlow.controller.authentication;

import com.springboot.LibroFlow.entity.User;
import com.springboot.LibroFlow.request.RefreshTokenRequest;
import com.springboot.LibroFlow.request.SigningRequest;
import com.springboot.LibroFlow.request.SignupRequest;
import com.springboot.LibroFlow.response.ApiResponse;
import com.springboot.LibroFlow.service.authentication.AuthenticationService;
import jakarta.persistence.GeneratedValue;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")

public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @CrossOrigin
    @PostMapping("/admin/signup")
    public ResponseEntity<ApiResponse> signupToAdminAccount(@RequestBody SignupRequest request) {
            if(!authenticationService.checkIfUsernameExists(request.getEmail())){
                return ResponseEntity.ok().body(new ApiResponse(authenticationService.signUpToAdminAccount(request), "Username signup"));
            }else{
                return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse(null, "Username already exists"));
            }
    }
    @PostMapping("/user/signup")
    public ResponseEntity<ApiResponse> signupToUserAccount(@RequestBody SignupRequest request) {
        if(!authenticationService.checkIfUsernameExists(request.getEmail())){
            return ResponseEntity.ok().body(new ApiResponse(authenticationService.signUpToUserAccount(request), "Username signup"));
        }else{
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse(null, "Username already exists"));
        }
    }
    @CrossOrigin
    @PostMapping("/signin")
    public ResponseEntity<ApiResponse> signin(@RequestBody SigningRequest request) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(authenticationService.signIn(request), "Username signin")) ;
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(null, "Username or password incorrect"));
        }
    }
    @CrossOrigin
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse> refresh(@RequestBody RefreshTokenRequest request){
        try{
            return ResponseEntity.ok(new ApiResponse(authenticationService.jwtRefreshToken(request),"Token refreshed successfully"));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body( new ApiResponse(null,"Account not founded!")) ;
        }
    }
}
