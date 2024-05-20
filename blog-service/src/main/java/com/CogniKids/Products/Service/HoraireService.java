package com.CogniKids.Products.Service;

import com.CogniKids.Products.Entity.Horairepsy;
import com.CogniKids.Products.Repo.HoraireRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;

@Service
public class HoraireService {
    @Autowired
    private HoraireRepo horaireRepo;
   // @Autowired
//public PsyRepo psyRepo;
    public Horairepsy addhpsy(LocalTime heureDebut, LocalTime heureFin,String idPsy) {
       // Psychiatre psy = psyRepo.findById(idPsy).orElseThrow(() -> new IllegalArgumentException("Psychiatre non trouvé avec l'ID : " + idPsy));
        Horairepsy horairepsy = new Horairepsy();
        horairepsy.setHeureDebut(heureDebut);
        horairepsy.setHeureFin(heureFin);
        horairepsy.setDispo(true);
        horairepsy.setIdpsychiatre(idPsy);
        horairepsy.setNbplace(14);
        return horaireRepo.save(horairepsy);
    }
    public Iterable<Horairepsy> listAll() {
        return this.horaireRepo.findAll();
    }

}
