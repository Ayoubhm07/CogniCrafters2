package com.CogniKids.Products.Repo;

import com.CogniKids.Products.Entity.Article;
import com.CogniKids.Products.Entity.Commentaires;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
@EnableMongoRepositories
@Repository

public interface ArticleRepo extends MongoRepository<Article,String> {
}
