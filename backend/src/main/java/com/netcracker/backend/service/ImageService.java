package com.netcracker.backend.service;

import com.netcracker.backend.entity.Image;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageService {
    Image findById(Long imageId);
    Image save(MultipartFile imageFile) throws IOException;
}
