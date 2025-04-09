package com.workflow.dtos;

import jakarta.validation.constraints.NotBlank;

public class LoginUser {

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    public LoginUser() {}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
