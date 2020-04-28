package com.netcracker.fapi.controller;

import com.netcracker.fapi.entity.Image;
import com.netcracker.fapi.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @RequestMapping(value = "/{imageId}", method = RequestMethod.GET)
    public Image getImageById(@PathVariable(name = "imageId") Long imageId) {
        return imageService.findById(imageId);
    }

    @RequestMapping(method = RequestMethod.POST)
    public Image saveImage(@RequestBody Image imageFile) {
        return imageService.save(imageFile);
    }

}
