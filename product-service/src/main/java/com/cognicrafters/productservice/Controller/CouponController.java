package com.cognicrafters.productservice.Controller;

import com.cognicrafters.productservice.Entity.Coupon;
import com.cognicrafters.productservice.Service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class CouponController {
    @Autowired
    private CouponService couponService;
    @PostMapping(value = "/saveCodePromo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Coupon saveCodePromo(@RequestParam("code") String coupon,
                                @RequestParam("reduction") double reduction,
                                @RequestParam("expirationDate") Date expirationDate) {
        // Créez un objet Coupon à partir des données reçues
        Coupon couponObject = new Coupon();
        couponObject.setCode(coupon);
        couponObject.setReduction(reduction);
        couponObject.setExpirationDate(expirationDate);

        // Enregistrez le coupon dans la base de données ou effectuez d'autres opérations nécessaires
        return couponService.createCoupon(couponObject);
    }
    @GetMapping("/coupons/{code}")
    public ResponseEntity<Coupon> getCouponByCode(@PathVariable String code) {
        Coupon coupon = couponService.getCouponByCode(code);
        if (coupon != null) {
            System.out.println("voici le code : " + coupon.getCode()); // Imprimer le code du coupon
            return ResponseEntity.ok(coupon);
        } else {
            System.out.println("erreur: "); // Imprimer le code du coupon

            return ResponseEntity.notFound().build();
        }
    }

}
