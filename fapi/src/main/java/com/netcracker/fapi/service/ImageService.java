package com.netcracker.fapi.service;

import com.netcracker.fapi.entity.Image;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    Image findById(Long imageId);
    Image save(Image imageFile);
}
