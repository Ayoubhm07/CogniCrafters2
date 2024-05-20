package com.example.congicrafters.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.web.bind.annotation.*;

import com.example.congicrafters.Entity.Reclamation;
import com.example.congicrafters.Repository.ReclamationRepository;
import com.mongodb.client.result.UpdateResult;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/reclamation")
public class ReclamationController {

    @Autowired
    public
    ReclamationRepository reclamationRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @PostMapping("/ajouter")
    public ResponseEntity<Reclamation> ajouterRec(@RequestBody Reclamation rec) {
        try {
            Reclamation recs = reclamationRepository.save(new Reclamation(rec.getDescription(),rec.getType(),rec.getNom(),rec.getPrenom(),rec.getTel(),rec.getMail(),rec.getCreatedAt()));
            return new ResponseEntity<>(recs, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/modifier/{id}")
    public ResponseEntity<Reclamation> updateRec(@PathVariable("id") String id, @RequestBody Reclamation rec) {
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = new Update()

                .set("description", rec.getDescription())
                .set("type", rec.getType())
                .set("mail", rec.getMail())
                .set("nom", rec.getNom())
                .set("prenom", rec.getPrenom())
                .set("tel", rec.getTel());



        UpdateResult result = mongoTemplate.updateFirst(query, update, Reclamation.class);

        if (result.getModifiedCount() > 0) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/supprimer/{id}")
    public ResponseEntity<String> deleteRec(@PathVariable("id") String id) {
        try {
            reclamationRepository.deleteByIdString(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Reclamation deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting Reclamation");
        }
    }

    @DeleteMapping("/supprimerT")
    public ResponseEntity<HttpStatus> deleteAllRec() {
        try {
            reclamationRepository.deleteAll();
            return new ResponseEntity<>( HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    @GetMapping("/afficher")
    public ResponseEntity<List<Reclamation>> getAllRec(@RequestParam(required = false) String titre) {
        try {
            List<Reclamation> rec = new ArrayList<Reclamation>();

            reclamationRepository.findAll().forEach(rec::add);

            if (rec.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(rec, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Reclamation> getReclamationById(@PathVariable("id") String id) {
        Optional<Reclamation> recData = reclamationRepository.findByIdString(id);

        if (recData.isPresent()) {
            return new ResponseEntity<>(recData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }




}
