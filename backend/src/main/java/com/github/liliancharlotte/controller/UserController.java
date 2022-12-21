package com.github.liliancharlotte.controller;

import com.github.liliancharlotte.model.User;
import com.github.liliancharlotte.model.UserRequest;
import com.github.liliancharlotte.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable String id) {
        return userService.findById(id);
    }

    @PostMapping()
    public User addUser(@RequestBody UserRequest userRequest) {
        return userService.addUser(userRequest);
    }
}
