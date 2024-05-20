package com.cognicrafters.productservice.Service;

import com.cognicrafters.productservice.Entity.Product;
import com.cognicrafters.productservice.Entity.Review;
import com.cognicrafters.productservice.Repo.ReviewRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepo reviewRepo;
    @Autowired
    private ProductServices productService; // Vous aurez probablement besoin du service ProductService pour valider l'existence du produit

  // Assurez-vous d'avoir un UserRepository


    public Review addReview(String productId, String userId, String comment, int rating) {
        // Vérifiez d'abord si le produit existe
        Optional<Product> productOptional = productService.getProductById(productId);
        Product product = productOptional.orElseThrow(() -> new IllegalArgumentException("Product with id " + productId + " not found"));

        // Récupérez l'utilisateur de la base de données

        Review review = new Review();
        review.setProductId(productId);
         review.setId_user(userId);
        review.setComment(comment);
        review.setRating(rating);
        return reviewRepo.save(review);
    }
    public List<Review> getProductReviews(String productId) {
        return reviewRepo.findByProductId(productId);
    }
    public Optional<Integer> getMaxRatingForProduct(String productId) {
        return reviewRepo.findByProductId(productId)
                .stream()
                .map(Review::getRating)
                .max(Integer::compare);
    }

}
