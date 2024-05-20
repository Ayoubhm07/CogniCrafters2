package com.cognicrafters.productservice.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class ImageScraperController {
    @Autowired

    private final ImageScraperService imageScraperService;

    public ImageScraperController(ImageScraperService imageScraperService) {
        this.imageScraperService = imageScraperService;
    }

    @GetMapping("/scrape-images")
    public ResponseEntity<List<String>> scrapeImages() {
        List<String> imageUrls = imageScraperService.scrapeImages();
        return new ResponseEntity<>(imageUrls, HttpStatus.OK);
    }
    @GetMapping("/scrape-table-data")
    public List<String> scrapeTableData() {
        return imageScraperService.scrapeTableData();
    }
}
