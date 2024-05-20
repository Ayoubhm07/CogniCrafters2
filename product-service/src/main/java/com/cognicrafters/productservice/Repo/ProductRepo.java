package com.cognicrafters.productservice.Repo;

import com.cognicrafters.productservice.Entity.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends MongoRepository<Product,String> {
    Product findProductByName(String name);
    @Query("{ 'category' : ?0 }") // Utilisation de la syntaxe JSON de MongoDB
    List<Product> findProductsByCategory(String category);

    Product findProductBy_id(String id);
    Product findBySKU(String sku);
    Product findByName(String name);
    List<Product> findByPriceBetween(double minPrice, double maxPrice);
}
