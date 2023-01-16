package com.github.liliancharlotte.service;

import com.github.liliancharlotte.model.User;
import com.github.liliancharlotte.model.UserRequest;
import com.github.liliancharlotte.repository.UserRepo;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepo userRepo;
    private final IdService idService;

    public UserService(UserRepo userRepo, IdService idService) {
        this.userRepo = userRepo;
        this.idService = idService;
    }

    public User createUser(UserRequest userRequest, String id) {
        return new User(id, userRequest.name(), userRequest.jobPostings());
    }

    public User addUser(UserRequest userRequest) {
        String generatedUserId = idService.generateId();
        User user = createUser(userRequest, generatedUserId);
        return userRepo.save(user);
    }

    public Optional<User> findById(String id) {
        return userRepo.findById(id);
    }

    public User updateUser(String id, User user) throws NoSuchElementException {
        if (!userRepo.existsById(id)) {
            throw new NoSuchElementException("User not found");
        }
        return userRepo.save(user);
    }
}
