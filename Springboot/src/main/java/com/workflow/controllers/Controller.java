package com.workflow.controllers;

import java.util.HashMap;
import java.util.Map;

import com.workflow.dtos.LoginResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workflow.dtos.LoginUser;
import com.workflow.models.User;
import com.workflow.services.UserService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
public class Controller {

    @Autowired
    private UserService userService;

    @PutMapping("/user/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody() LoginUser resetRequest) {
        try {
            userService.resetPassword(resetRequest);
            return ResponseEntity.ok(userService.generateLoginResponse(resetRequest.getUsername(), "Password Reset Successful"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new LoginResponse(null, null, e.getMessage()));
        }
    }

    @GetMapping("/user/get-user/{id}")
    public ResponseEntity<?> getUser(@PathVariable("id") Long id){
        try {
            return ResponseEntity.ok(userService.getUserByID(id));
        } catch (Exception e){
            return ResponseEntity.badRequest().body("Could not retrieve user.");
        }
    }

    @GetMapping("/up")
    public ResponseEntity<?> up(){
        Map<String, String> response = new HashMap<>();
        response.put("status", "Up and running");
        return ResponseEntity.ok(response);   
    }

    @PostMapping("/create-user")
    private ResponseEntity<?> createUser(@RequestBody User user) {
        try{
            userService.createUser(user);
            return ResponseEntity.ok(userService.generateLoginResponse(user.getUsername(), "Success"));
        } catch(IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch(Exception e){
            return ResponseEntity.badRequest().body("Could not create user.");
        }
    }

    @GetMapping("/user/list")
    public ResponseEntity<?> listUsers() {
        try{
            return ResponseEntity.ok(userService.listUsers());
        } catch (Exception e){
            return ResponseEntity.badRequest().body("Could not list users.");
        }
    }

    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable("id") Long id){
        userService.deleteUser(id);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginUser loginRequest, HttpSession session) {
        try {
            boolean isAuthenticated = userService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());

            if(isAuthenticated) {
                session.setAttribute("user", loginRequest.getUsername());
                if(loginRequest.getUsername().equals("ADMIN") &&
                        loginRequest.getPassword().equals("password")) {
                    return ResponseEntity.ok(userService.generateLoginResponse(loginRequest.getUsername(), "Reset ADMIN password"));
                }
                return ResponseEntity.ok(userService.generateLoginResponse(loginRequest.getUsername(), "Success"));
            } else
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error has occurred.");
        }
    }
}
