package com.springboot.LibroFlow.request;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Data
public class SigningRequest {
    private String email;
    private String  password ;
}
