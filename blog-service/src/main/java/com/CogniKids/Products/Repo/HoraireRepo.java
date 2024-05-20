package com.CogniKids.Products.Repo;

import com.CogniKids.Products.Entity.Horairepsy;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
    public interface HoraireRepo extends MongoRepository<Horairepsy,String> {
        List<Horairepsy>findHorairepsyByIdpsychiatre(String idPsy);
    }

