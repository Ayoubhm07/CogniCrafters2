package com.cognicrafters.productservice.Service;

import com.cognicrafters.productservice.Entity.Coupon;
import com.cognicrafters.productservice.Repo.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class CouponService {
    @Autowired
    private CouponRepository couponRepository;

    public Coupon createCoupon(Coupon coupon) {
        return couponRepository.save(coupon);
    }

    public Optional<Coupon> getCouponById(String id) {
        return couponRepository.findById(id);
    }

    public Coupon getCouponByCode(String code) {
        return couponRepository.findByCode(code);
    }

    public List<Coupon> getAllCoupons() {
        return couponRepository.findAll();
    }

    public Coupon updateCoupon(Coupon coupon) {
        return couponRepository.save(coupon);
    }
    private static final String ALPHA_NUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int COUPON_CODE_LENGTH = 10; // Longueur du code promo

    public Coupon generateCouponForCustomer() {
        String couponCode = generateRandomCode(COUPON_CODE_LENGTH);
        Coupon coupon = new Coupon();
        coupon.setCode(couponCode);
        coupon.setReduction(20); // Par exemple, 20% de réduction
        // Enregistrer le coupon si nécessaire
        couponRepository.save(coupon);
        return coupon;
    }

    private String generateRandomCode(int length) {
        StringBuilder builder = new StringBuilder();
        Random random = new Random();
        while (length-- != 0) {
            int character = (int)(random.nextDouble() * ALPHA_NUMERIC_STRING.length());
            builder.append(ALPHA_NUMERIC_STRING.charAt(character));
        }
        return builder.toString();
    }
}
