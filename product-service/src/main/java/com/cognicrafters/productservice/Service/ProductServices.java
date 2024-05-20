package com.cognicrafters.productservice.Service;

import com.cognicrafters.productservice.Entity.CartItem;
import com.cognicrafters.productservice.Entity.PaymentInfo;
import com.cognicrafters.productservice.Entity.Product;
import com.cognicrafters.productservice.Entity.Review;
import com.cognicrafters.productservice.Repo.PaymentInfoRepo;
import com.cognicrafters.productservice.Repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductServices {
    @Autowired
    private ProductRepo repo;
    @Autowired
    private PaymentInfoRepo transactionRepo;
    @Autowired
    private KafkaProducerService kafkaProducerService;
    public void saveorUpdate(Product product){
        repo.save(product);
    }
    public Product save(Product product) {
        return repo.save(product);
    }
    public Iterable<Product> listAll() {
        return this.repo.findAll();
    }
    public List<Product> getAllProducts() {
        return this.repo.findAll();
    }
    public void deleteProduct(String id) {
        repo.deleteById(id);
    }
    public Product getProductByID(String productid) {
        return repo.findById(productid).get();


    }
    public List<Product> getProductsByCategory(String category) {
        return repo.findProductsByCategory(category);
    }
    public Map<String, Long> countProductsByCategory() {
        List<Product> products = repo.findAll();
        Map<String, Long> categoryCounts = new HashMap<>();

        for (Product product : products) {
            // Vérifiez si la propriété category est null
            if (product.getCategory() != null) {
                String categoryName = product.getCategory().getCategoryName();
                categoryCounts.put(categoryName, categoryCounts.getOrDefault(categoryName, 0L) + 1);
            }
        }

        return categoryCounts;
    }

    public double calculateDiscountedPrice(Product product) {
        double originalPrice = product.getPrice();
        double discountPercentage = product.getDiscount();
        // Calcul du prix remisé en fonction de la remise spécifique au produit
        return originalPrice * (1 - discountPercentage);
    }
    public Product getProductByName(String productName) {
        return repo.findProductByName(productName);
    }



    // Méthode pour récupérer les détails d'un produit par son ID
    public Optional<Product> getProductById(String id) {
        return repo.findById(id);
    }




    public List<Review> getProductReviews(String productId) {
        Optional<Product> productOptional = getProductById(productId);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            return product.getReviews();
        } else {
            // Gérer le cas où le produit n'existe pas
            return null;
        }
    }
    public boolean checkUniqueness(String sku, String name) {
        try {
            Product productWithSameSku = repo.findBySKU(sku);
            Product productWithSameName = repo.findByName(name);

            // Si un produit avec le même SKU ou le même nom existe déjà, retourne false
            return productWithSameSku == null && productWithSameName == null;
        } catch (IncorrectResultSizeDataAccessException e) {
            // En cas d'exception, retourne false
            return false;
        }
    }
    public Set<Product> getRelatedProducts(String productId) {
        List<PaymentInfo> paymentInfos = transactionRepo.findByProductId(productId);
        Set<String> relatedProductIds = new HashSet<>();

        // Log the paymentInfos to check if we are getting the correct data
        System.out.println("PaymentInfos containing the product: " + paymentInfos);

        for (PaymentInfo paymentInfo : paymentInfos) {
            for (CartItem item : paymentInfo.getPanier()) {
                if (!item.getProduit().get_id().equals(productId)) {
                    relatedProductIds.add(item.getProduit().get_id());
                }
            }
        }

        // Log the relatedProductIds to see if they are collected correctly
        System.out.println("Related Product IDs: " + relatedProductIds);

        List<Product> products = repo.findAllById(relatedProductIds);
        System.out.println("Related Products: " + products);

        return new HashSet<>(products);
    }
    public List<Product> getProductsByPriceRange(double minPrice, double maxPrice) {
        return repo.findByPriceBetween(minPrice, maxPrice);
    }
}
