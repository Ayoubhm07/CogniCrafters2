package com.CogniKids.Products.Repo;

import com.CogniKids.Products.Entity.CategorieArticle;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface CategorieArtRepo extends MongoRepository<CategorieArticle,String> {
    CategorieArticle findCategorieArticleByType(String type);
}
