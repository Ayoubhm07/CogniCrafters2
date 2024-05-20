package com.example.congicrafters.Entity;


import org.springframework.data.annotation.CreatedDate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.congicrafters.Controller.ReclamationController;

import jakarta.persistence.Table;

import java.util.Date;

@Table(name = "reclamation")
public class Reclamation {

    private String _id;
    private String description ;
    private String type ;
    private String nom ;
    private String prenom ;
    private String repondre ;
    private int tel ;
    private String mail;
    private Date createdAt;

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }


    public String getRepondre() {
        return repondre;
    }

    public void setRepondre(String repondre) {
        this.repondre = repondre;
    }
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public int getTel() {
        return tel;
    }

    public void setTel(int tel) {
        this.tel = tel;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }
    public String get_id() {
        return _id;
    }
    public void set_id(String _id) {
        this._id = _id;
    }
    public Reclamation(String _id, String description, String type, String nom, String prenom, int tel, String mail,Date createdAt) {
        this._id = _id;

        this.description = description;
        this.type = type;
        this.nom = nom;
        this.prenom = prenom;
        this.tel = tel;
        this.mail = mail;
        this.createdAt=createdAt;
    }

    public Reclamation( String description, String type, String nom, String prenom, int tel, String mail,Date createdAt) {

        this.description = description;
        this.type = type;
        this.nom = nom;
        this.prenom = prenom;
        this.tel = tel;
        this.mail = mail;
        this.createdAt=createdAt;
    }
public Reclamation(){}

    @Override
    public String toString() {
        return "Reclamation{" +
                "_id='" + _id + '\'' +

                ", description='" + description + '\'' +
                ", repondre='" + repondre + '\'' +

                ", type='" + type + '\'' +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", tel=" + tel +
                ", mail='" + mail + '\'' +
                ", createdAt='" + createdAt + '\'' +
                '}';
    }






}
