package com.CogniKids.Products.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;

@Document(collection = "rendezvous")
@Getter
@Setter
@ToString
@AllArgsConstructor
public class Rdv {
    @Id
    private String _id;
    private LocalDate date;
    //private int nbplace;

    @DBRef
    private Horairepsy horairepsy;
    @DBRef
    private Patient patient;

    @DBRef
    private String idpsychiatre;


    public Rdv() {

    }
}
