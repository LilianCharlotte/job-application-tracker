package com.github.liliancharlotte.model;

import java.util.List;

public record User(
        String id,
        String name,
        List<JobPosting> jobPostings) {
}
