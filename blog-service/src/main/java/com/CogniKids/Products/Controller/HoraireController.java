package com.CogniKids.Products.Controller;

import com.CogniKids.Products.Entity.Horairepsy;
import com.CogniKids.Products.Entity.HorairepsyRequest;
import com.CogniKids.Products.Repo.HoraireRepo;
import com.CogniKids.Products.Service.HoraireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/horaire")
@CrossOrigin("*")
public class HoraireController {
    @Autowired

    private HoraireService horaireService;

    @Autowired
    private HoraireRepo horaireRepo;


    @PostMapping(value = "/add")
    public ResponseEntity<Horairepsy> addHorairepsy(@RequestBody Horairepsy horairepsy) {
        try {



            // Enregistrer dans le repository et retourner la réponse
            return new ResponseEntity<>(horaireRepo.save(horairepsy), HttpStatus.CREATED);
        } catch (Exception e) {
            // Gérer les erreurs et retourner une réponse appropriée
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/get")
    public Iterable<Horairepsy>gethoraire()    {

        return horaireService.listAll();
    }
    @GetMapping("/get/{idPsy}")
    public ResponseEntity<List<Horairepsy>> getHorairepsyByPsy(@PathVariable String idPsy) {
        try {
            // Rechercher le psychiatre par son ID

            // Récupérer la liste des horaires pour ce psychiatre
            List<Horairepsy> horaires = horaireRepo.findHorairepsyByIdpsychiatre(idPsy);

            // Retourner la liste des horaires
            return new ResponseEntity<>(horaires, HttpStatus.OK);
        } catch (Exception e) {
            // Gérer les erreurs et retourner une réponse appropriée
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
