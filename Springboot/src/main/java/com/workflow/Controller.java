package com.workflow;

import com.workflow.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class Controller {

    @Autowired
    private UserService userService;

    @PostMapping("/create-user")
    private User createUser(@RequestBody User user){
        return userService.createUser(user);
    }

}
