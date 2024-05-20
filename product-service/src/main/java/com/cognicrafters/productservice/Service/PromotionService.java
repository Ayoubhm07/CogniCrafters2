package com.cognicrafters.productservice.Service;

import com.cognicrafters.productservice.Entity.Product;
import com.cognicrafters.productservice.Repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PromotionService {
    @Autowired
    private ProductRepo productRepository;

    public void applyPromotions() {
        LocalDate currentDate = LocalDate.now();
        List<Product> products = productRepository.findAll();

        for (Product product : products) {
            if (isProductInPromotionPeriod(product, currentDate)) {
                applyPromotion(product);
            }
        }
    }

    private boolean isProductInPromotionPeriod(Product product, LocalDate currentDate) {
        LocalDate startDate = product.getPromotionStartDate();
        LocalDate endDate = product.getPromotionEndDate();

        return currentDate.isAfter(startDate) && currentDate.isBefore(endDate);
    }

    private void applyPromotion(Product product) {
        double originalPrice = product.getPrice();
        double discountPercentage = product.getDiscount();

        double discountedPrice = originalPrice * (1 - discountPercentage / 100);
        product.setPrice(discountedPrice);

        productRepository.save(product);
    }
}
