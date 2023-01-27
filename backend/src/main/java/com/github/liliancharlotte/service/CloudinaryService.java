package com.github.liliancharlotte.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    public String uploadFile(MultipartFile multipartFile) throws IOException {
        Cloudinary cloudinary = new Cloudinary();
        Map<?, ?> uploadResult = cloudinary.uploader().upload(multipartFile.getBytes(), ObjectUtils.asMap("format", "pdf"));
        return (String) uploadResult.get("url");
    }
}
