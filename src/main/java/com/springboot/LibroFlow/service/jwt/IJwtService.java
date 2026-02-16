package com.springboot.LibroFlow.service.jwt;

import org.springframework.security.core.userdetails.UserDetails;

public interface IJwtService {

    String generateToke(UserDetails userDetails);

    String extractUsername(String token);

    boolean isValidToken(UserDetails userDetails, String token);

    String generateRefreshToke(UserDetails user);
}
