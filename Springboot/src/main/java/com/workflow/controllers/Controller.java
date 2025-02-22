package com.workflow.controllers;

import com.workflow.models.LoginUser;
import com.workflow.services.UserService;
import com.workflow.models.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class Controller {

    @Autowired
    private UserService userService;

    @PutMapping("/user/{id}")
    public User updateUser(@RequestBody() User user, @PathVariable("id") Long id){
        return userService.updateUser(user);
    }

    @PostMapping("/create-user")
    private ResponseEntity<?> createUser(@RequestBody User user){
        try{
            User createdUser = userService.createUser(user);
            return ResponseEntity.ok(createdUser);
        } catch (Exception e){
            System.out.println(e);
            return ResponseEntity.badRequest().body("Could not create user.");
        }
    }

    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable("id") Long id){
        userService.deleteUser(id);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginUser loginRequest, HttpSession session) {
        try {
            boolean isAuthenticated = userService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());

            if(isAuthenticated) {
                session.setAttribute("user", loginRequest.getUsername());
                return ResponseEntity.ok("Login was successful.");
            } else
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error has occurred.");
        }
    }
}
