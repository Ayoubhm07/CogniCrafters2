package com.example.congicrafters.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.congicrafters.Entity.Reclamation;

@Repository

public interface ReclamationRepository extends MongoRepository<Reclamation, Long> {

//    List<Emploi> findByTitreContaining(String titre);
//    List<Emploi> findByPublished(boolean published);
//
//
    @Query("{ '_id' : ?0 }")
    Optional<Reclamation> findByIdString(String id);
    @Query(value = "{ '_id' : ?0 }", delete = true)
    void deleteByIdString(String id);



}

