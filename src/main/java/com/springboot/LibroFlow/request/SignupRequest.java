package com.springboot.LibroFlow.request;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Data
public class SignupRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
