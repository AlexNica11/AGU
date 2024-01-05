package com.agu.agu_backend.controller;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

public class LoginDto {
    @NotNull
    @Setter
    @Getter
    private String username;

    @NotNull
    @Setter
    @Getter
    private String password;

    @Getter
    private String firstName;

    @Getter
    private String lastName;

    /**
     * Default constructor
     */
    protected LoginDto() {
    }

    /**
     * Partial constructor
     * @param username
     * @param password
     */
    public LoginDto(String username, String password) {
        this.username = username;
        this.password = password;
    }
    /**
     * Full constructor
     * @param username
     * @param password
     * @param firstName
     * @param lastName
     */
    public LoginDto(String username, String password, String firstName, String lastName) {
       this(username, password);
       this.firstName = firstName;
       this.lastName = lastName;
    }
}
