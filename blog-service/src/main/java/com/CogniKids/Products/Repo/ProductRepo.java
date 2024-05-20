package com.CogniKids.Products.Repo;

import com.CogniKids.Products.Entity.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepo extends MongoRepository<Product,String> {
}
