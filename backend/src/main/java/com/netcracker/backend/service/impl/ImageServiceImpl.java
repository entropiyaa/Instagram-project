package com.netcracker.backend.service.impl;

import com.netcracker.backend.entity.Image;
import com.netcracker.backend.repository.ImageRepository;
import com.netcracker.backend.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Component
public class ImageServiceImpl implements ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Override
    public Image findById(Long imageId) {
        Optional<Image> optionalImage = imageRepository.findById(imageId);
        return optionalImage.orElse(null);
    }

    @Override
    public Image save(MultipartFile imageFile) throws IOException {
        Image img = new Image(imageFile.getOriginalFilename(), imageFile.getContentType(), imageFile.getBytes());
        return imageRepository.save(img);
    }
}
