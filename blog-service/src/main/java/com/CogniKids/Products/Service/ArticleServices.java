package com.CogniKids.Products.Service;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.CogniKids.Products.Entity.*;
import com.CogniKids.Products.Repo.ArticleRepo;
import com.CogniKids.Products.Repo.CategorieArtRepo;
import com.CogniKids.Products.Repo.CommentairesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import org.springframework.http.*;
import org.json.JSONObject;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service

public class ArticleServices {
    private static final String UPLOAD_DIR = "C:\\Users\\HP\\Desktop\\Autisme Integration\\blog-service\\src\\main\\resources\\uploads";
    private final String PERSPECTIVE_API_URL = "https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=AIzaSyCwYP_qi5G-t6VAkXRxHxsw6JAoFVVpBRY\n";
    private final RestTemplate restTemplate;
    private static final String GPT_ENDPOINT = "https://api.openai.com/v1/completions";

    @Value("${openai.api.key}")
    private String apiKey;
    @Autowired

    private ArticleRepo articleRepo;

    @Autowired
    private CommentairesRepo commentairesRepo;
    private CategorieArtRepo categorieArtRepo;

    public ArticleServices(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void ajouterCommentaire(String articleId, Commentaires commentaire, Patient auteur) {
        // Analyser le commentaire avec Perspective API
        String response = analyzeComment(commentaire.getContenu());

        // Vérifier si le commentaire est acceptable
        if (isCommentAcceptable(response)) {
            // Le commentaire est acceptable, ajoutez-le
            Article article = articleRepo.findById(articleId).orElseThrow(() -> new IllegalArgumentException("Article non trouvé avec l'ID : " + articleId));

            commentaire.setArticleId(articleId);
            commentaire.setAuteur(auteur);
            article.setNbcmntr(article.getNbcmntr() + 1);
            commentaire.setDate_publication(new Date());
            commentairesRepo.save(commentaire);
            article.getCommentaires().add(commentaire);
            articleRepo.save(article);
        } else {
            // Le commentaire est toxique, ne l'ajoutez pas
            throw new IllegalArgumentException("Le commentaire est toxique.");
        }
    }

    private String analyzeComment(String comment) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String requestBody = String.format("{\"comment\": {\"text\": \"%s\"}, \"requestedAttributes\": {\"TOXICITY\": {}}}", comment);

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.exchange(PERSPECTIVE_API_URL, HttpMethod.POST, entity, String.class);

        return response.getBody();
    }

    private boolean isCommentAcceptable(String response) {
        // Vérifiez si la réponse est vide ou nulle
        if (response == null || response.isEmpty()) {
            // Si la réponse est vide ou nulle, considérez le commentaire comme non acceptable
            return false;
        }

        // Analysez la réponse JSON pour extraire le score de toxicité
        JSONObject jsonResponse = new JSONObject(response);
        JSONObject attributeScores = jsonResponse.getJSONObject("attributeScores");
        JSONObject toxicity = attributeScores.getJSONObject("TOXICITY");
        double toxicityScore = toxicity.getJSONObject("summaryScore").getDouble("value");

        // Définissez un seuil de toxicité prédéfini
        double toxicityThreshold = 0.5; // À ajuster selon vos besoins

        // Vérifiez si le score de toxicité dépasse le seuil prédéfini
        return toxicityScore < toxicityThreshold;
    }







    public String generateContentFromTitle(String titre) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);
        String prompt = "Titre de l'article : " + titre + "\nGénérer automatiquement le contenu de l'article.";

        // Utilisation d'ObjectMapper pour formater le corps de la requête en JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String requestBody;
        try {
            requestBody = objectMapper.writeValueAsString(Map.of(
                    "model", "gpt-3.5-turbo",
                    "prompt", prompt,
                    "max_tokens", 3000
            ));
        } catch (JsonProcessingException e) {
            // Gestion de l'exception si la conversion en JSON échoue
            e.printStackTrace();
            return null;
        }

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        String response = restTemplate.exchange(GPT_ENDPOINT, HttpMethod.POST, entity, String.class).getBody();

        return response;
    }
/*

    public Article addArticleWithGeneratedContent( String titre) throws IOException {
       // String contenu = generateContentFromTitle(titre);
        String imageUrl = uploadImage(file);

        Article article = new Article();
        article.setTitre(titre);
       // article.setImage(imageUrl);
        article.setContenu(contenu);

        Article savedArticle = addArticle(article);

        return savedArticle;
    }



 */






    public Article addArticle(Article article ) {

        article.setDate_publication(new Date());

        return articleRepo.save(article);
    }


    public String uploadImage(MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR + File.separator + fileName);
        Files.copy(file.getInputStream(), filePath);
        return fileName;
    }

    public Iterable<Article> listAll() {
        return this.articleRepo.findAll();
    }
    public Optional<Article> getArticleById(String id) {

        return articleRepo.findById(id);
    }
    public void incrementViews(Article article) {
        article.setNbvues(article.getNbvues() + 1);
        articleRepo.save(article);
    }
    public void deleteArticlee(String id) {
        articleRepo.deleteById(id);
    }



/*
    public void ajouterCommentaire(String articleId, Commentaires commentaire, Patient auteur) {
        Article article = articleRepo.findById(articleId).get();

        commentaire.setArticleId(articleId);
        commentaire.setAuteur(auteur);
        article.setNbcmntr(article.getNbcmntr() + 1);
        commentaire.setDate_publication(new Date());
        commentairesRepo.save(commentaire);
        article.getCommentaires().add(commentaire);
        articleRepo.save(article);
    }

 */



    public List<Commentaires> getCommentairesByArticleId(String articleId) {
        Optional<Article> optionalArticle = articleRepo.findById(articleId);
        if (optionalArticle.isPresent()) {
            Article article = optionalArticle.get();
            return article.getCommentaires();
        } else {
            // Gérer le cas où l'article n'est pas trouvé
            throw new ArticleNotFoundException("L'article avec l'identifiant " + articleId + " n'a pas été trouvé.");
        }
    }
    public void updateArticle(Article article) {
        articleRepo.save(article);
    }
}

