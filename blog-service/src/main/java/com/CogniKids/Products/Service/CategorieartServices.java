package com.CogniKids.Products.Service;

import com.CogniKids.Products.Entity.Article;
import com.CogniKids.Products.Entity.CategorieArticle;
import com.CogniKids.Products.Repo.ArticleRepo;
import com.CogniKids.Products.Repo.CategorieArtRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service

public class CategorieartServices {

    @Autowired

    private CategorieArtRepo categorieArtRepo;
    public CategorieArticle addcat(CategorieArticle categorieArticle) {
        return categorieArtRepo.save(categorieArticle);
    }
    public Iterable<CategorieArticle> listAll() {
        return this.categorieArtRepo.findAll();
    }
    public Optional<CategorieArticle> getcatById(String id) {
        return categorieArtRepo.findById(id);
    }

    public void deletecat(String id) {
        categorieArtRepo.deleteById(id);
    }
    public CategorieArticle findByName(String name){
        return    categorieArtRepo.findCategorieArticleByType(name);
    }
}