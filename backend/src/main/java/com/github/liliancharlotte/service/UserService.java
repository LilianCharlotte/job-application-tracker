package com.github.liliancharlotte.service;

import com.github.liliancharlotte.model.*;
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

    public User addJobPostingToUser(String userId, JobPostingRequest jobPostingRequest) throws NoSuchElementException {
        Optional<User> userOpt = userRepo.findById(userId);
        if (userOpt.isEmpty()) {
            throw new NoSuchElementException("User %s not found".formatted(userId));
        }
        User user = userOpt.get();

        String generateJobPostingId = idService.generateId();
        JobPosting jobPostingToAdd = new JobPosting(generateJobPostingId, jobPostingRequest.companyName(), jobPostingRequest.isUnsolicited(), jobPostingRequest.jobTitle(), jobPostingRequest.jobDescription(), jobPostingRequest.jobPostingLink(), jobPostingRequest.isRemote(), jobPostingRequest.locatedAt(), ColumnStatus.INTERESTED_IN);
        user.jobPostings().add(jobPostingToAdd);
        return userRepo.save(user);
    }

    public Optional<User> findById(String id) {
        return userRepo.findById(id);
    }

    public User updateUser(String id, User user) throws NoSuchElementException {
        if (!userRepo.existsById(id)) {
            throw new NoSuchElementException("User %s not found".formatted(id));
        }
        return userRepo.save(user);
    }
}
