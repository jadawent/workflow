package com.workflow;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Controller {

    @CrossOrigin
    @GetMapping("/HelloWorld")
    public String helloWorld(){
        return "Hello World!";
    }

}
