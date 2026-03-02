package com.springboot.LibroFlow.request;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Data
public class SendMessageRequest {
    private String message;
    private String username;
    private String recievername;
}
