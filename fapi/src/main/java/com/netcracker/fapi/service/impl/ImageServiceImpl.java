package com.netcracker.fapi.service.impl;

import com.netcracker.fapi.entity.Image;
import com.netcracker.fapi.service.ImageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;


@Component
public class ImageServiceImpl implements ImageService {

    @Value("${backend.server.url}")
    private String backendUrl;

    @Override
    public Image findById(Long imageId) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendUrl + "/api/images/" + imageId, Image.class);
    }

    @Override
    public Image save(Image imageFile) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForEntity(backendUrl + "/api/images", imageFile, Image.class).getBody();
    }
}
