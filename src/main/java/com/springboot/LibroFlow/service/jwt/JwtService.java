package com.springboot.LibroFlow.service.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Service
@AllArgsConstructor
public class JwtService implements IJwtService {
    @Override
    public String generateToke(UserDetails userDetails){
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .issuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000*360*24) )
                .signWith(getJwtKey())
                .compact();
    }
    private Key getJwtKey(){
        byte[] key = Decoders.BASE64.decode("874872364t23r723tr762trdgt6qwgr7GD3726G7t34824y28");
        return Keys.hmacShaKeyFor(key);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return  claimsResolver.apply(claims) ;
    }

    private Claims extractAllClaims(String token){
        return Jwts.parser().setSigningKey(getJwtKey()).build().parseClaimsJws(token).getBody() ;
    }

    @Override
    public String extractUsername(String token){
        return extractClaim(token,Claims::getSubject) ;
    }

    @Override
    public boolean isValidToken(UserDetails userDetails, String token){
        return extractUsername(token).equals(userDetails.getUsername()) && !isTokenExpired(token) ;
    }

    @Override
    public String generateRefreshToke(UserDetails user) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .issuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000*360*24*7) )
                .signWith(getJwtKey())
                .compact();
    }

    private boolean isTokenExpired(String token) {
        return extractClaim(token,Claims::getExpiration).before(new Date()) ;
    }
}
