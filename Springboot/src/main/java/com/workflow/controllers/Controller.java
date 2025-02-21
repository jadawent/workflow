package com.workflow.controllers;

import com.workflow.models.Role;
import com.workflow.services.RoleService;
import com.workflow.services.UserService;
import com.workflow.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class Controller {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @PostMapping("/create-user")
    private ResponseEntity<?> createUser(@RequestBody User user){
        try{
            // Trims trailing spaces and
            // checks if username already exists
            user.setUsername(user.getUsername().trim());
            if (userService.existsByUsername(user.getUsername())) {
                return ResponseEntity.badRequest().body("Username is already taken.");
            }

            // checks if the 2 passwords match before creating the user.
            if(!user.getPassword().equals(user.getConfirmPassword())){
                return ResponseEntity.badRequest().body("Passwords do not match.");
            }

            // Creates a manager role if not already existing in database
            Role role = roleService.saveAsManagerRole();

            userService.createUser(user, List.of(role));
            return ResponseEntity.ok("User created successfully.");
        } catch (Exception e){
            System.out.println(e);
            return ResponseEntity.badRequest().body("Could not create user.");
        }
    }
}
