package com.example.congicrafters.Entity;


import jakarta.persistence.Table;

import java.util.Date;

@Table(name = "typerec")
public class TypeRec {

    private String _id;

    private String nom ;

    private Date createdAt;

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }




    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }


    public String get_id() {
        return _id;
    }
    public void set_id(String _id) {
        this._id = _id;
    }
    public TypeRec(String _id,  String nom,  Date createdAt) {
        this._id = _id;


        this.nom = nom;

        this.createdAt=createdAt;
    }

    public TypeRec(String nom, Date createdAt) {


        this.nom = nom;

        this.createdAt=createdAt;
    }
public TypeRec(){}

    @Override
    public String toString() {
        return "Reclamation{" +
                "_id='" + _id + '\'' +


                ", nom='" + nom + '\'' +

                ", createdAt='" + createdAt + '\'' +
                '}';
    }






}
