package com.github.liliancharlotte.model;

import java.util.List;

public record UserRequest(
        String name,
        List<JobPosting> jobPostings) {
}
