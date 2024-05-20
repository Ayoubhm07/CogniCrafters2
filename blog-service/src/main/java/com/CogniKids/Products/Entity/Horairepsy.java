package com.CogniKids.Products.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Document(collection = "horairepsy")
@Getter
@Setter
@ToString
@AllArgsConstructor
public class Horairepsy {
    @Id
    private String _id;
    private LocalTime heureDebut;
    private LocalTime heureFin;
    private boolean dispo;
    private int nbplace;
    private String idpsychiatre;
    public Horairepsy() {

    }
}
