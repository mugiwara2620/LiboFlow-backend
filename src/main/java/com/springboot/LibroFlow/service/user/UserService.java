package com.springboot.LibroFlow.service.user;

import com.springboot.LibroFlow.dto.UserDto;
import com.springboot.LibroFlow.entity.User;
import com.springboot.LibroFlow.enums.Role;
import com.springboot.LibroFlow.repository.UserRepository;
import com.springboot.LibroFlow.service.bookItem.BookItemService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
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
    private final ModelMapper modelMapper;
    private final BookItemService bookItemService;

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
    public UserDto convertUserToUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setEmail(user.getEmail());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setPassword(user.getPassword());
        userDto.setRole(user.getRole());
        userDto.setBooks(bookItemService.converteToBookItemDtoList(user.getBookItems()));
        return modelMapper.map(user, UserDto.class);
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public UserDetails changeRole(String email,List<String> roles) {
        User user = userRepository.findByEmail(email);
        if(roles.size()==2) user.setRole(List.of(Role.ADMIN,Role.USER));
        else if(roles.size()==1) user.setRole(List.of(Role.USER));
        userRepository.save(user);
        return user;
    }

}
