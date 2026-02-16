package com.springboot.LibroFlow.service.authentication;

import com.springboot.LibroFlow.emun.Role;
import com.springboot.LibroFlow.entity.User;
import com.springboot.LibroFlow.repository.UserRepository;
import com.springboot.LibroFlow.request.SigningRequest;
import com.springboot.LibroFlow.request.SignupRequest;
import com.springboot.LibroFlow.response.AuthenticationResponse;
import com.springboot.LibroFlow.service.jwt.IJwtService;
import com.springboot.LibroFlow.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements IAuthenticationService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final IJwtService jwtService;
    private final AuthenticationManager authenticationManager;


    @Override
    public AuthenticationResponse signIn(SigningRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        UserDetails user = userService.loadUserByUsername(request.getEmail());
        String token  = jwtService.generateToke(user);
        String refreshToken = jwtService.generateRefreshToke(user);
        return new AuthenticationResponse(token,refreshToken);
    }

    @Override
    public User signUpToUserAccount(SignupRequest request) {
//        if(!userService.isUserNameValid(request.getFirstName())){
            User user = new User();
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());
            user.setRole(List.of(Role.USER));
            userRepository.save(user);
            return user;

    }

    @Override
    public User signUpToAdminAccount(SignupRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setRole(List.of(Role.ADMIN, Role.USER));
        userRepository.save(user);
        return user;
    }

    @Override
    public boolean checkIfUsernameExists(String username) {
        return userRepository.findByEmail(username) != null;
    }

}
