package com.CogniKids.Products.Repo;

import com.CogniKids.Products.Entity.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepo extends MongoRepository<Patient,String> {
}
