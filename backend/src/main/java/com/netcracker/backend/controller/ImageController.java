package com.netcracker.backend.controller;

import com.netcracker.backend.entity.Image;
import com.netcracker.backend.repository.ImageRepository;
import com.netcracker.backend.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Autowired
    ImageService imageService;

    @RequestMapping("/{imageId}")
    public Image getImageById(@PathVariable("imageId") Long imageId) {
        return imageService.findById(imageId);
    }

    @PostMapping()
    public Image saveImage(@RequestParam("image") MultipartFile imageFile) throws IOException {
        return imageService.save(imageFile);
    }
}
