package com.github.liliancharlotte.controller;

import com.github.liliancharlotte.model.User;
import com.github.liliancharlotte.model.UserRequest;
import com.github.liliancharlotte.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public List<User> listUsers() {
        return userService.list();
    }

    @PostMapping("/user")
    public User addStudent(@RequestBody UserRequest userRequest) {
        return userService.addUser(userRequest);
    }
}
