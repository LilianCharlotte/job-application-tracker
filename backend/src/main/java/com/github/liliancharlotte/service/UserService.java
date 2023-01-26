package com.github.liliancharlotte.service;

import com.github.liliancharlotte.model.*;
import com.github.liliancharlotte.repository.UserRepo;
import org.springframework.stereotype.Service;

import java.util.List;
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
        User user = getUser(userId);

        String generateJobPostingId = idService.generateId();
        JobPosting jobPostingToAdd = new JobPosting(generateJobPostingId, jobPostingRequest.companyName(), jobPostingRequest.isUnsolicited(), jobPostingRequest.jobTitle(), jobPostingRequest.jobDescription(), jobPostingRequest.jobPostingLink(), jobPostingRequest.remote(), jobPostingRequest.locatedAt(), ColumnStatus.INTERESTED_IN, jobPostingRequest.applicationSubmissionDate(), jobPostingRequest.notes());
        user.jobPostings().add(jobPostingToAdd);
        return userRepo.save(user);
    }

    public User getUser(String userId) {
        Optional<User> userOpt = userRepo.findById(userId);
        if (userOpt.isEmpty()) {
            throw new NoSuchElementException("User %s not found".formatted(userId));
        }
        return userOpt.get();
    }

    public User editJobPostingInUser(String userId, String jobPostingId, JobPostingRequest jobPostingRequest) {
        User user = getUser(userId);
        int index = findJobPostingIndex(user.jobPostings(), jobPostingId).orElseThrow();
        JobPosting editedJobPosting = new JobPosting(jobPostingId, jobPostingRequest.companyName(), jobPostingRequest.isUnsolicited(), jobPostingRequest.jobTitle(), jobPostingRequest.jobDescription(), jobPostingRequest.jobPostingLink(), jobPostingRequest.remote(), jobPostingRequest.locatedAt(), jobPostingRequest.status(), jobPostingRequest.applicationSubmissionDate(), jobPostingRequest.notes());
        user.jobPostings().set(index, editedJobPosting);
        return userRepo.save(user);
    }

    private static Optional<Integer> findJobPostingIndex(List<JobPosting> jobPostings, String jobPostingId) {
        for (int i = 0; i < jobPostings.size(); i++) {
            JobPosting jobPosting = jobPostings.get(i);
            if (jobPosting.id().equals(jobPostingId)) {
                return Optional.of(i);
            }
        }
        return Optional.empty();
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
