package com.CogniKids.Products.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController

public class TranslationController {
    @GetMapping("/translate")
    public String translateText(@RequestParam String text, @RequestParam String sourceLang, @RequestParam String targetLang) {
        String url = "https://api.mymemory.translated.net/get?q=" + text + "&langpair=" + sourceLang + "|" + targetLang;
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }
}
