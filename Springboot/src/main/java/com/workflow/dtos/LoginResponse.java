package com.workflow.dtos;

import java.util.List;

public class LoginResponse {

    private Long id;
    private List<String> userRoles;
    private String confirmation;

    public LoginResponse(Long id, List<String> userRoles, String confirmation) {
        this.id = id;
        this.userRoles = userRoles;
        this.confirmation = confirmation;
    }

    public List<String> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(List<String> userRoles) {
        this.userRoles = userRoles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getConfirmation() {
        return confirmation;
    }

    public void setConfirmation(String confirmation) {
        this.confirmation = confirmation;
    }
}
