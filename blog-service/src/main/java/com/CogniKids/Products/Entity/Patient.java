package com.CogniKids.Products.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.Date;

@Document(collection = "patients")
@Getter
@Setter
@ToString
@AllArgsConstructor

public class Patient {
    @Id
    private String _id;
    private String nom;
    private String prenom;
    private String adresse;
    private String mail;
    private int age;
    private Date birth_date;
    private String gendre;
    private String typemaladie;
    private String telmobile;
    private String description;
    public Patient() {
    }
    public Patient(String _id) {
        this._id=_id;
    }
}