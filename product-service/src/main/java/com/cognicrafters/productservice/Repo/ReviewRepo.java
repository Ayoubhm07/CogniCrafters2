package com.cognicrafters.productservice.Repo;

import com.cognicrafters.productservice.Entity.Review;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepo extends MongoRepository<Review,String> {
    List<Review> findByProductId(String productId);
    @Aggregation({
            // Étape de filtrage pour sélectionner les reviews du produit spécifique
            "{ '$match': { 'productId': ?0 } }",
            // Étape de groupement pour agréger les reviews et calculer le maxRating
            "{ '$group': { '_id': '$productId', 'maxRating': { '$max': '$rating' } } }"
    })
    Optional<Integer> findMaxRatingByProductId(String productId);

}
