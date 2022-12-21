package com.github.liliancharlotte.model;
import org.springframework.data.annotation.Id;

public record JobPosting(
        @Id
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
