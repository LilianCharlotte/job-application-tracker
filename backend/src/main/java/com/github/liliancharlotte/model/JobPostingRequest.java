package com.github.liliancharlotte.model;

public record JobPostingRequest(
        String companyName,
        boolean isUnsolicited,
        String jobTitle,
        String jobDescription,
        String jobPostingLink,
        WorkModel remote,
        String locatedAt,
        ColumnStatus status,
        String applicationSubmissionDate) {
}
