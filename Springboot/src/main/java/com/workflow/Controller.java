package com.workflow;

import com.workflow.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class Controller {

    @Autowired
    private UserService userService;

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

}
