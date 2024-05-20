package com.cognicrafters.productservice.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "category")

public class Category {
    @Id
    private String _id;
    private String categoryName;
    private int productsCount;




    @Override
    public String toString() {
        return "Category{" +
                "_id='" + _id + '\'' +
                ", categoryName='" + categoryName + '\'' +
                '}';
    }
}
