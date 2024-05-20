package com.cognicrafters.productservice.Repo;

import com.cognicrafters.productservice.Entity.Category;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepo extends MongoRepository<Category,String> {
    Category findByCategoryName(String categoryName);
}
