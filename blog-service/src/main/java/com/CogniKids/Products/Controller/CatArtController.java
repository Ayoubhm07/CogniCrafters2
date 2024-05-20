package com.CogniKids.Products.Controller;

import com.CogniKids.Products.Entity.CategorieArticle;
import com.CogniKids.Products.Service.CategorieartServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/categorieA")
@CrossOrigin("*")

public class CatArtController {
    @Autowired

    private CategorieartServices categorieartServices;
    @PostMapping(value = "/add")
    public ResponseEntity<CategorieArticle> addCategorieArticle(@RequestBody CategorieArticle categorieArticle) {
        CategorieArticle newCategorieArticle = categorieartServices.addcat(categorieArticle);
        return new ResponseEntity<>(newCategorieArticle, HttpStatus.CREATED);
    }

    @GetMapping(value = "/get")
    public Iterable<CategorieArticle>getCategorieArticle()    {

        return categorieartServices.listAll();
    }

    @GetMapping("/{id}")
    public CategorieArticle getCategorieArticleByid(@PathVariable String id) {
        Optional<CategorieArticle> categorieArticle = categorieartServices.getcatById(id);
        return categorieArticle.orElse(null);
    }
    @DeleteMapping("/{id}")
    public void deletePSY(@PathVariable String id) {
        categorieartServices.deletecat(id);
    }
}

