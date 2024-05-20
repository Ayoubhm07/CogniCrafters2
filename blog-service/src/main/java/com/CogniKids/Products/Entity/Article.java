package com.CogniKids.Products.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document(collection = "Article")
@Getter
@Setter
@ToString
@AllArgsConstructor

public class Article {
    @Id
    private String _id;
    private String titre;

    private String contenu;
    private String description;

    private Date date_publication;
    private int nbvues;
    private int nblikes;
    private int nbcmntr;
    private String image;
    @DBRef
    private CategorieArticle cat;
    @DBRef
    private List<Commentaires> commentaires;
    private String idpsychiatre;
    public Article(String _id) {
        this._id=_id;
    }
    public Article() {
        this.commentaires = new ArrayList<>();
    }
    public List<Commentaires> getCommentaires() {
        return commentaires;
    }
}
