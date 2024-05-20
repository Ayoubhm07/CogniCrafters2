package com.cognicrafters.productservice.Repo;

import com.cognicrafters.productservice.Entity.PaymentInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentInfoRepo extends MongoRepository<PaymentInfo, String> {
    List<PaymentInfo> findByPanier_Produit__id(String productId); // Use _id instead of id
    @Query("{ 'panier.produit._id': ?0 }")
    List<PaymentInfo> findByProductId(String productId);
    @Query("{ 'token.email': ?0 }")
    List<PaymentInfo> findByCustomerEmail(String email);}
