package com.CogniKids.Products.Controller;

import com.CogniKids.Products.Entity.*;
import com.CogniKids.Products.Repo.ArticleRepo;
import com.CogniKids.Products.Repo.PatientRepo;
import com.CogniKids.Products.Service.ArticleServices;
import com.CogniKids.Products.Service.CategorieartServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/article")
@CrossOrigin("*")

public class ArticleController {
    @Value("${openai.model}")
    private String model;

    @Value(("${openai.api.url}"))
    private String apiURL;

    @Autowired
    private RestTemplate template;

    @Autowired

    private ArticleServices articleServices;
    @Autowired

    CategorieartServices categorieartServices;

    @Autowired
    private PatientRepo patientRepo;
    @Autowired
    private ArticleRepo articleRepo;




/*
    @PostMapping(value = "/save")
    public Article addArticle(

            @RequestParam("titre") String titre,
            @RequestParam("description") String description,
            @RequestParam("contenu") String contenu,
            @RequestParam("image") MultipartFile image,
            @RequestParam("categoryName") String categoryName,
            @RequestParam("psyId") String psyId

            ) {
        String imageUrl = "uploads/";
Psychiatre p =psyRepo.findById(psyId).get();
        if (p == null) {
            System.err.println("L'id de patient '" + psyId + "' n'a pas été trouvée.");
            return null;
        }
        CategorieArticle category = categorieartServices.findByName(categoryName);

        if (category == null) {
            System.err.println("La catégorie '" + categoryName + "' n'a pas été trouvée.");
            return null;
        }

        Article newArticle = new Article();
        newArticle.setTitre(titre);
        newArticle.setContenu(contenu);
        newArticle.setNbvues(0);
        newArticle.setDescription(description);
        newArticle.setNbcmntr(0);
        newArticle.setNblikes(0);
        newArticle.setDate_publication(new Date());
        newArticle.setCat(category); // Associez la catégorie au produit
        newArticle.setAuteur(p);

        if (!image.isEmpty()) {
            try {
                imageUrl += image.getOriginalFilename();
                File uploadDirectory = new File("C:\\Users\\MSI\\Desktop\\CogniCrafters_User-BackPlatform\\src\\main\\resources\\uploads\\");
                image.transferTo(new File(uploadDirectory, image.getOriginalFilename()));
                newArticle.setImage(imageUrl);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        Article savearticle = articleRepo.save(newArticle);

        return savearticle;
    }

 */


    @PostMapping("/save")
    public ResponseEntity<Article> addArticle(
            @RequestParam("titre") String titre,
            @RequestParam("description") String description,
            @RequestParam("image") MultipartFile image,
            @RequestParam("categoryName") String categoryName,
            @RequestParam("psyId") String psyId
    ) {
        String prompt = "Generate content for article with title: " + titre;
        String contenu = generateContent(prompt);

        if (contenu == null) {
            return ResponseEntity.badRequest().build();
        }
        String imageUrl = "uploads/";

        CategorieArticle category = categorieartServices.findByName(categoryName);

        if (category == null) {
            System.err.println("La catégorie '" + categoryName + "' n'a pas été trouvée.");
            return null;
        }


        Article newArticle = new Article();
        newArticle.setTitre(titre);
        newArticle.setContenu(contenu);
        newArticle.setNbvues(0);
        newArticle.setDescription(description);
        newArticle.setNbcmntr(0);
        newArticle.setNblikes(0);
        newArticle.setDate_publication(new Date());

        newArticle.setCat(category); // Associez la catégorie au produit
        newArticle.setIdpsychiatre(psyId);

        if (!image.isEmpty()) {
            try {
                imageUrl += image.getOriginalFilename();
                File uploadDirectory = new File("C:\\Users\\HP\\Desktop\\Autisme Integration\\blog-service\\src\\main\\resources\\uploads");
                image.transferTo(new File(uploadDirectory, image.getOriginalFilename()));
                newArticle.setImage(imageUrl);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        Article savedArticle = articleRepo.save(newArticle);

        return ResponseEntity.ok(savedArticle);
    }

    private String generateContent(String prompt) {
        ChatGptRequest request = new ChatGptRequest(model, prompt);
        ChatGptResponse chatGptResponse = template.postForObject(apiURL, request, ChatGptResponse.class);
        if (chatGptResponse != null && !chatGptResponse.getChoices().isEmpty()) {
            return chatGptResponse.getChoices().get(0).getMessage().getContent();
        } else {
            return null;
        }
    }

    @GetMapping(value = "/get")
    public Iterable<Article>getArticle()    {

        return articleServices.listAll();
    }

      @GetMapping("/{id}")
      public ResponseEntity<Article> getArticleDetails(@PathVariable String id) {
          Article article = articleServices.getArticleById(id).get();
          if(article == null) {
              return ResponseEntity.notFound().build();
          }
          // Incrémenter le nombre de vues
          articleServices.incrementViews(article);
          return ResponseEntity.ok(article);
      }





    @DeleteMapping("/{id}")
    public void deletearticle(@PathVariable String id) {
        articleServices.deleteArticlee(id);
    }




    @PostMapping("/comments/{articleId}")
    public ResponseEntity<String> ajouterCommentaire(@PathVariable String articleId,
                                                     @RequestBody Commentaires commentaire,
                                                     @RequestParam String patientId) {
        Optional<Patient> optionalPatient = patientRepo.findById(patientId);
        if (!optionalPatient.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Patient non trouvé avec l'ID : " + patientId);
        }

        articleServices.ajouterCommentaire(articleId, commentaire, optionalPatient.get());
        return ResponseEntity.ok("Commentaire ajouté avec succès à l'article avec l'ID : " + articleId);
    }


    @GetMapping("/comments/{articleId}")
    public ResponseEntity<List<Commentaires>> getCommentairesByArticleId(@PathVariable String articleId) {
        List<Commentaires> commentaires = articleServices.getCommentairesByArticleId(articleId);
        return ResponseEntity.ok(commentaires);
    }









    @PostMapping("/like/{id}")
    public ResponseEntity<String> likeArticle(@PathVariable String id) {
        // Récupérez l'article correspondant à l'ID
        Article article = articleServices.getArticleById(id).get();
        if (article == null) {
            return ResponseEntity.notFound().build();
        }

        // Incrémentez le nombre de "likes"
        article.setNblikes(article.getNblikes() + 1);

        // Mettez à jour l'article dans la base de données
        articleServices.updateArticle(article);

        return ResponseEntity.ok("Article liked successfully");
    }



}
