package com.example.congicrafters.Repository;

import com.example.congicrafters.Entity.Reclamation;
import com.example.congicrafters.Entity.TypeRec;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface TypeRecRepository extends MongoRepository<TypeRec, Long> {

//    List<Emploi> findByTitreContaining(String titre);
//    List<Emploi> findByPublished(boolean published);
//
//
    @Query("{ '_id' : ?0 }")
    Optional<TypeRec> findByIdString(String id);
    @Query(value = "{ '_id' : ?0 }", delete = true)
    void deleteByIdString(String id);



}

