package com.cognicrafters.productservice.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.ElementCollection;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Document(collection = "product")
public class Product {
    @Id
    private String _id;
    private double price;
    private int quantity;
    private String name;
    private String description;
    private String image;
    private Boolean etat;
    private String currency;
    private String SKU;
    private LocalDate promotionStartDate;
    private LocalDate promotionEndDate;
    @DBRef
    private Category category;
    private int rating;
    @DBRef
    private List<Review> reviews;
    private List<String> relatedProductIds; // Stores IDs of related products
    private double discount;
    private int stock; // Ajouter la propriété stock

    public Product() {

    }
}
