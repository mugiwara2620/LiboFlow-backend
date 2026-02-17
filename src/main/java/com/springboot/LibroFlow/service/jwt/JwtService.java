package com.springboot.LibroFlow.service.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Duration;
import java.util.Date;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtService implements IJwtService {

    // Base64-encoded 256-bit secret key (must be at least 32 bytes)
    private static final String SECRET_KEY = "q1w2e3r4t5y6u7i8o9p0a1s2d3f4g5h6";

    private Key getJwtKey() {
        byte[] keyBytes = Decoders.BASE64.decode(java.util.Base64.getEncoder().encodeToString(SECRET_KEY.getBytes()));
        return Keys.hmacShaKeyFor(keyBytes);
    }

    @Override
    public String generateToke(UserDetails userDetails) {
        long expirationMillis = Duration.ofDays(1).toMillis(); // 24 hours
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMillis))
                .signWith(getJwtKey())
                .compact();
    }

    @Override
    public String generateRefreshToke(UserDetails userDetails) {
        long expirationMillis = Duration.ofDays(7).toMillis(); // 7 days
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMillis))
                .signWith(getJwtKey())
                .compact();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setAllowedClockSkewSeconds(60) // 1 min clock skew tolerance
                .setSigningKey(getJwtKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        return claimsResolver.apply(extractAllClaims(token));
    }

    @Override
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private boolean isTokenExpired(String token) {
        try {
            return extractClaim(token, Claims::getExpiration).before(new Date());
        } catch (ExpiredJwtException e) {
            return true;
        }
    }

    @Override
    public boolean isValidToken(UserDetails userDetails, String token) {
        return extractUsername(token).equals(userDetails.getUsername()) && !isTokenExpired(token);
    }
}
