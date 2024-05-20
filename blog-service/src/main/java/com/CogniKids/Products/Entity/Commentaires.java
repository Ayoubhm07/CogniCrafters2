package com.CogniKids.Products.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
@Document(collection = "Commentaires")
@Getter
@Setter
@ToString
@AllArgsConstructor
public class Commentaires {
    @Id
    private String _id;
    private String contenu;
    private Date date_publication;
    private String articleId;

    @DBRef
    private Patient auteur;
}
