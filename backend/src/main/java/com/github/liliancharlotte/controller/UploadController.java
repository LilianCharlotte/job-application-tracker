package com.github.liliancharlotte.controller;

import com.github.liliancharlotte.service.CloudinaryService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/user/{id}/jobPosting/{jobPostingId}")
public class UploadController {
    private final CloudinaryService cloudinaryService;

    public UploadController(CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping("/file")
    public String uploadPdf(@RequestParam("file") MultipartFile multipartFile, @PathVariable String id, @PathVariable String jobPostingId) throws IOException {
        return cloudinaryService.uploadFile(multipartFile);
    }
}
