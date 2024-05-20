package com.example.congicrafters.Controller;

import com.example.congicrafters.Entity.Reclamation;
import com.example.congicrafters.Entity.TypeRec;
import com.example.congicrafters.Repository.ReclamationRepository;
import com.example.congicrafters.Repository.TypeRecRepository;
import com.mongodb.client.result.UpdateResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/typeRec")
public class TypeRecController {

    @Autowired
    public
    TypeRecRepository typeRecRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @PostMapping("/ajouter")
    public ResponseEntity<TypeRec> ajouterType(@RequestBody TypeRec rec) {
        try {
            TypeRec recs = typeRecRepository.save(new TypeRec(rec.getNom(),rec.getCreatedAt()));
            return new ResponseEntity<>(recs, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/modifier/{id}")
    public ResponseEntity<TypeRec> updateType(@PathVariable("id") String id, @RequestBody TypeRec rec) {
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = new Update()


                .set("nom", rec.getNom());




        UpdateResult result = mongoTemplate.updateFirst(query, update, TypeRec.class);

        if (result.getModifiedCount() > 0) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/supprimer/{id}")
    public ResponseEntity<String> deleteType(@PathVariable("id") String id) {
        try {
            typeRecRepository.deleteByIdString(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("TypeRec deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting Reclamation");
        }
    }

    @DeleteMapping("/supprimerT")
    public ResponseEntity<HttpStatus> deleteAllType() {
        try {
            typeRecRepository.deleteAll();
            return new ResponseEntity<>( HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    @GetMapping("/afficher")
    public ResponseEntity<List<TypeRec>> getAllType(@RequestParam(required = false) String titre) {
        try {
            List<TypeRec> rec = new ArrayList<TypeRec>();

            typeRecRepository.findAll().forEach(rec::add);

            if (rec.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(rec, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<TypeRec> getTypeById(@PathVariable("id") String id) {
        Optional<TypeRec> recData = typeRecRepository.findByIdString(id);

        if (recData.isPresent()) {
            return new ResponseEntity<>(recData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }




}
