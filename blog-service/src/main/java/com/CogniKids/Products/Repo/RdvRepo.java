package com.CogniKids.Products.Repo;

import com.CogniKids.Products.Entity.Rdv;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface RdvRepo extends MongoRepository<Rdv,String> {

List<Rdv>findRdvByIdpsychiatre(String psychiatreId );


}
