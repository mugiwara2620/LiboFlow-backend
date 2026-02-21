package com.springboot.LibroFlow.dto;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.springboot.LibroFlow.entity.BookItem;
import com.springboot.LibroFlow.enums.Role;
import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class UserDto {
    private String firstName;
    private String lastName;
    private String email;
    private String password;

    private List<BookItemDto> books;

    private List<Role> role;

}
