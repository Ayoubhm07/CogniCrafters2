package com.cognicrafters.productservice.Service;

import com.cognicrafters.productservice.Entity.Product;
import com.cognicrafters.productservice.Entity.ProductStockUpdate;
import com.cognicrafters.productservice.Repo.ProductRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class KafkaConsumerService {
    @Autowired
    private ProductRepo productRepo;

    @KafkaListener(topics = "stock-updates", groupId = "product_group")
    public void consumeStockUpdate(String message) throws IOException {
        ProductStockUpdate stockUpdate = new ObjectMapper().readValue(message, ProductStockUpdate.class);
        Product product = productRepo.findById(stockUpdate.getProductId())
                .orElseThrow(() -> new RuntimeException("Produit non trouvé avec l'id : " + stockUpdate.getProductId()));

        product.setStock(stockUpdate.getNewStock());
        productRepo.save(product);
        System.out.println("Stock updated for product ID " + product.get_id() + " to " + stockUpdate.getNewStock());
    }

    @KafkaListener(topics = "purchase-events", groupId = "product_group")
    public void handlePurchaseEvent(String message) throws IOException {
        ProductStockUpdate stockUpdate = new ObjectMapper().readValue(message, ProductStockUpdate.class);
        Product product = productRepo.findById(stockUpdate.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + stockUpdate.getProductId()));
        int newQuantity = product.getQuantity() - stockUpdate.getQuantityPurchased();
        if (newQuantity < 0) {
            System.out.println("Purchase blocked: Insufficient stock for product ID " + stockUpdate.getProductId());
            return;
        }
        product.setQuantity(newQuantity);
        product.setStock(newQuantity > 0 ? 1 : 0);
        productRepo.save(product);
        System.out.println("Quantity updated for product ID " + product.get_id() + " to " + newQuantity);
    }
}
