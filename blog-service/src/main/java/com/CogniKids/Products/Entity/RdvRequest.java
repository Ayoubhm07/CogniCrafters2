package com.CogniKids.Products.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class RdvRequest {
    private String idPsy;
    private String idHoraire;
    private LocalDate date;
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

}