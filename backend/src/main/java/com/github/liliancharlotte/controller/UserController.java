package com.github.liliancharlotte.controller;

import com.github.liliancharlotte.model.JobPostingRequest;
import com.github.liliancharlotte.model.User;
import com.github.liliancharlotte.model.UserRequest;
import com.github.liliancharlotte.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
class UserController {

    private final UserService userService;


    UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable String id) {
        return userService.findById(id);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable String id, @RequestBody UserRequest userRequest) {
        User updatedUser = new User(id, userRequest.name(), userRequest.jobPostings());
        return userService.updateUser(id, updatedUser);
    }

    @PostMapping()
    public User addUser(@RequestBody UserRequest userRequest) {
        return userService.addUser(userRequest);
    }

    @PutMapping("/{id}/jobPosting")
    public User addJobPostingToUser(@PathVariable String id, @RequestBody JobPostingRequest jobPostingRequest) {
        return userService.addJobPostingToUser(id, jobPostingRequest);
    }
}
