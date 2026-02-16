package com.springboot.LibroFlow.response;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class AuthenticationResponse {
    private String jwt;
    private String refreshToken;

    public AuthenticationResponse(String jwt,String refreshToken) {
        this.jwt = jwt;
        this.refreshToken = refreshToken;
    }

    public AuthenticationResponse(String jwt) {
        this.jwt = jwt;
    }
}
