package com.CogniKids.Products.Controller;

import com.CogniKids.Products.Entity.Patient;
import com.CogniKids.Products.Entity.Rdv;
import com.CogniKids.Products.Entity.RdvRequest;
import com.CogniKids.Products.Service.RdvServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rdv")
@CrossOrigin("*")

public class RdvController {

        @Autowired
        private RdvServices rdvServices;

        @GetMapping(value = "/get")
        public List<Rdv> getAllRdv() {
            return rdvServices.getAllrdv();
        }

        @GetMapping("/{id}")
        public Rdv getRdvById(@PathVariable String id) {
            Optional<Rdv> patient = rdvServices.getrdvById(id);
            return patient.orElse(null);
        }

       // @PostMapping(value = "/add")
      //  public Rdv addRdv(@RequestBody Rdv rdv) {
        //    return rdvServices.addrdv(rdv);
        //}
/*
    @PostMapping("/add")
    public ResponseEntity<Rdv> addRdv(@RequestParam String idPsychiatre,
                                      @ModelAttribute Rdv rdv,
                                      @ModelAttribute Patient patient,
                                      @RequestParam LocalTime heureDebut,
                                      @RequestParam LocalTime heureFin) {
        Rdv nouveauRdv = rdvServices.addRdv(idPsychiatre, rdv, patient, heureDebut, heureFin);
        return new ResponseEntity<>(nouveauRdv, HttpStatus.CREATED);
    }

 */



/*
    @PostMapping("/add")
    public ResponseEntity<Rdv> addRdv(@RequestBody RdvRequest rdvRequest) {
        // Convertir les données de la requête en un objet Patient
        Patient patient = new Patient();
        patient.setNom(rdvRequest.getNom());
        patient.setPrenom(rdvRequest.getPrenom());
        patient.setAge(rdvRequest.getAge());
        patient.setGendre(rdvRequest.getGendre());
        patient.setMail(rdvRequest.getMail());
        patient.setAdresse(rdvRequest.getAdresse());
        patient.setBirth_date(rdvRequest.getBirth_date());
        patient.setDescription(rdvRequest.getDescription());
        patient.setTelmobile(rdvRequest.getTelmobile());
        patient.setTypemaladie(rdvRequest.getTypemaladie());
        // Créer un objet Rdv à partir des données de la requête
        Rdv rdv = new Rdv();
        // Ajoutez ici d'autres attributs du rendez-vous à partir de rdvRequest si nécessaire

        // Ajouter le rendez-vous en utilisant le service correspondant
        Rdv savedRdv = rdvServices.addRdv(rdv, rdvRequest.getIdPsy(), rdvRequest.getIdHoraire(), rdvRequest.getDate(), patient);

        return ResponseEntity.ok(savedRdv);
    }

 */
@PostMapping("/add/{idPsy}/{idHoraire}/{date}")
public ResponseEntity<Rdv> addRdv(@PathVariable String idPsy, @PathVariable String idHoraire, @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date, @RequestBody RdvRequest rdvRequest, String mail, String nom) {
    // Convertir les données de la requête en un objet Patient
    Patient patient = new Patient();
    patient.setNom(rdvRequest.getNom());
    patient.setPrenom(rdvRequest.getPrenom());
    patient.setAge(rdvRequest.getAge());
    patient.setGendre(rdvRequest.getGendre());
    patient.setMail(rdvRequest.getMail());
    patient.setAdresse(rdvRequest.getAdresse());
    patient.setBirth_date(rdvRequest.getBirth_date());
    patient.setDescription(rdvRequest.getDescription());
    patient.setTelmobile(rdvRequest.getTelmobile());
    patient.setTypemaladie(rdvRequest.getTypemaladie());

    // Créer un objet Rdv à partir des données de la requête
    Rdv rdv = new Rdv();
    // Ajoutez ici d'autres attributs du rendez-vous à partir de rdvRequest si nécessaire

    // Ajouter le rendez-vous en utilisant le service correspondant
    Rdv savedRdv = rdvServices.addRdv(rdv, idPsy, idHoraire, date, patient, mail , nom);

    return ResponseEntity.ok(savedRdv);
}


    @GetMapping("/psy/{psychiatreId}")
    public ResponseEntity<List<Rdv>> getRdvForPsychiatre(@PathVariable String psychiatreId) {
        List<Rdv> rdvList = rdvServices.getRdvForPsychiatre(psychiatreId);
        return new ResponseEntity<>(rdvList, HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
        public void deleteRdv(@PathVariable String id) {
            rdvServices.deleterdv(id);
        }
    }


