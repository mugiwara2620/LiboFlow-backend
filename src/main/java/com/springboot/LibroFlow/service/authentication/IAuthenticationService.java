package com.springboot.LibroFlow.service.authentication;

import com.springboot.LibroFlow.entity.User;
import com.springboot.LibroFlow.request.RefreshTokenRequest;
import com.springboot.LibroFlow.request.SigningRequest;
import com.springboot.LibroFlow.request.SignupRequest;
import com.springboot.LibroFlow.response.AuthenticationResponse;

public interface IAuthenticationService {
    AuthenticationResponse signIn(SigningRequest request);
    User signUpToUserAccount(SignupRequest request);
    User signUpToAdminAccount(SignupRequest request);
    boolean checkIfUsernameExists(String username);

    AuthenticationResponse jwtRefreshToken(RefreshTokenRequest request);
}
