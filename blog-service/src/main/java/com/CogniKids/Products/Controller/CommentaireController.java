package com.CogniKids.Products.Controller;

import com.CogniKids.Products.Entity.Commentaires;
import com.CogniKids.Products.Service.CommentaireServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Commentaires")
@CrossOrigin("*")

public class CommentaireController {
    @Autowired

    private CommentaireServices commentaireServices;

    //@PostMapping("/add")
    //public ResponseEntity<String> ajouterrrrCommentaire(@RequestParam String articleId, @RequestBody Commentaires commentaire, @RequestParam String patientId) {
    //    commentaireServices.ajouterCommentaire(articleId, commentaire, patientId);
    //    return ResponseEntity.ok("Commentaire ajouté avec succès");
   // }




    @GetMapping(value = "/get")
    public Iterable<Commentaires>getcommentaire()    {

        return commentaireServices.listAll();
    }

    @GetMapping("/{id}")
    public Commentaires getcommentaireByid(@PathVariable String id) {
        Optional<Commentaires> psy = commentaireServices.getcommById(id);
        return psy.orElse(null);
    }
    @DeleteMapping("/{id}")
    public void deletecommentaire(@PathVariable String id) {
        commentaireServices.deletecomm(id);
    }



}

