package com.github.liliancharlotte.model;public record JobPosting(
        String id,
        String userId,
        String companyName,
        boolean isUnsolicited,
        String jobTitle,
        String jobDescription,
        String jobPostingLink,
        boolean isRemote,
        String locatedAt) {
}
