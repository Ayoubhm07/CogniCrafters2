package com.cognicrafters.productservice.Repo;

import com.cognicrafters.productservice.Entity.Coupon;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CouponRepository extends MongoRepository<Coupon, String> {
    Coupon findByCode(String code);
}
