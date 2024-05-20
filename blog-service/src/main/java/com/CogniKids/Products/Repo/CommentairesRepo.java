package com.CogniKids.Products.Repo;

import com.CogniKids.Products.Entity.Commentaires;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface CommentairesRepo extends MongoRepository<Commentaires,String> {

}
