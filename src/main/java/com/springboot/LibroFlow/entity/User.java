package com.springboot.LibroFlow.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.springboot.LibroFlow.enums.Role;
import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@Data
@RequiredArgsConstructor
@Table(name = "users")
@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String firstName;
    private String lastName;
    private String email;
    private String password;

//    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade =
//            {CascadeType.PERSIST,  CascadeType.MERGE})
//    private List<BookItem> books;

    private List<Role> role;

//    @OneToMany(mappedBy = "user")
//    @JsonManagedReference
@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade =
        {CascadeType.PERSIST,  CascadeType.MERGE})
    private List<BookItem> bookItems;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.stream().map(role-> new SimpleGrantedAuthority(role.name())).toList();
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
