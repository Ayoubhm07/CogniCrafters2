package com.CogniKids.Products.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "CategorieArticle")
@Getter
@Setter
@ToString
@AllArgsConstructor

public class CategorieArticle {
    @Id
    private String _id;
    private String type;


}
