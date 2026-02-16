package com.springboot.LibroFlow.service.user;

import com.springboot.LibroFlow.entity.User;
import com.springboot.LibroFlow.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsPasswordService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        List<SimpleGrantedAuthority> authorities = user.getRole().stream().map(role -> new SimpleGrantedAuthority(role.name())).toList();
        return org.springframework.security.core.userdetails.User.builder()
                .username(username)
                .password(user.getPassword())
                .authorities(authorities)
                .build();
    }
    public boolean isUserNameValid(String username) {
        return userRepository.findByEmail(username) !=null ;
    }
}
