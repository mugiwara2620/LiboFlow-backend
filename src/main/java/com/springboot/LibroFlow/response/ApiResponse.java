package com.springboot.LibroFlow.response;

import com.springboot.LibroFlow.entity.User;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Data
public class ApiResponse {
    private Object data;
    private String message;

    public ApiResponse(Object data, String usernameSignup) {
        this.data = data;
        this.message = usernameSignup;
    }
}
