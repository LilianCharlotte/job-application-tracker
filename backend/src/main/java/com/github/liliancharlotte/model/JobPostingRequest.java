package com.github.liliancharlotte.model;

public record JobPostingRequest(
        String companyName,
        boolean isUnsolicited,
        String jobTitle,
        String jobDescription,
        String jobPostingLink,
        boolean isRemote,
        String locatedAt,
        ColumnStatus status) {
}
