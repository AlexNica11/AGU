package com.agu.agu_backend.controller;

import com.agu.agu_backend.model.User;
import com.agu.agu_backend.service.UserService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpServerErrorException;

import java.util.List;

/**
 * Class for accessing the user API
 *
 */
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signin")
    public String login(@RequestBody @Valid LoginDto loginDto) {
        String jwt = userService.signin(loginDto.getUsername(), loginDto.getPassword()).orElseThrow(()->
                new HttpServerErrorException(HttpStatus.FORBIDDEN, "Login Failed"));
        return "{\"jwt\":\"" + jwt + "\"}";
    }

    @PostMapping("/signup")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public User signup(@RequestBody @Valid LoginDto loginDto){
        return userService.signup(loginDto.getUsername(), loginDto.getPassword(), loginDto.getFirstName(),
                loginDto.getLastName()).orElseThrow(() -> new HttpServerErrorException(HttpStatus.BAD_REQUEST,"User already exists"));
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<User> getAllUsers() {
        return userService.getAll();
    }

}