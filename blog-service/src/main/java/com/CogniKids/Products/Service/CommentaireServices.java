package com.CogniKids.Products.Service;

import com.CogniKids.Products.Entity.Article;
import com.CogniKids.Products.Entity.CategorieArticle;
import com.CogniKids.Products.Entity.Commentaires;
import com.CogniKids.Products.Entity.Patient;
import com.CogniKids.Products.Repo.ArticleRepo;
import com.CogniKids.Products.Repo.CategorieArtRepo;
import com.CogniKids.Products.Repo.CommentairesRepo;
import com.CogniKids.Products.Repo.PatientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service

public class CommentaireServices {
    private List<String> motsInterdits = Arrays.asList("mot1", "mot2", "mot3"); // Ajoutez vos mots interdits ici


    @Autowired

    private CommentairesRepo commentairesRepo;


    @Autowired
    private ArticleRepo articleRepository;

   public void ajouterCommentaire(String articleId, Commentaires c, String patientId) {
      Article article = articleRepository.findById(articleId).get();
        c.setDate_publication(new Date());
            //article.setCommentaires(new ArrayList<>()); // Initialiser la liste de commentaires avec une nouvelle liste vide
        article.getCommentaires().add(c);
        article.setNbcmntr(article.getNbcmntr() + 1);

        articleRepository.save(article);
        commentairesRepo.save(c);
    }

    public Iterable<Commentaires> listAll() {
        return this.commentairesRepo.findAll();
    }
    public Optional<Commentaires> getcommById(String id) {
        return commentairesRepo.findById(id);
    }

    public void deletecomm(String id) {
        commentairesRepo.deleteById(id);
    }



}
