package com.springboot.LibroFlow.response;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class AuthenticationResponse {
    private String jwt;
    private String refreshToken;
    private String role ;
    public AuthenticationResponse(String jwt,String refreshToken, String role) {
        this.jwt = jwt;
        this.refreshToken = refreshToken;
        this.role = role;
    }

    public AuthenticationResponse(String jwt, String role) {
        this.jwt = jwt;
        this.role = role;
    }
}
