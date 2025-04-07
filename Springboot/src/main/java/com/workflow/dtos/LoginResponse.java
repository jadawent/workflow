package com.workflow.dtos;

import java.util.List;

public class LoginResponse {

    private long id;
    private List<String> userRoles;

    public LoginResponse(long id, List<String> userRoles) {
        this.id = id;
        this.userRoles = userRoles;
    }

    public List<String> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(List<String> userRoles) {
        this.userRoles = userRoles;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
