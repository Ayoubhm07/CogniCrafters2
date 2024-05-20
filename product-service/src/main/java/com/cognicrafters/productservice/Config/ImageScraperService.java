package com.cognicrafters.productservice.Config;

import org.springframework.stereotype.Service;

import java.util.List;

public interface ImageScraperService {
    List<String> scrapeImages();
    public List<String> scrapeTableData();
}
