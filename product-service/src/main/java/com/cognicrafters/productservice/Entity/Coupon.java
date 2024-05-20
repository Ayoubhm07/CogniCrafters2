package com.cognicrafters.productservice.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "coupon")

public class Coupon {
    @Id
    private String code;
    private double reduction;
    private Date expirationDate;
    private int usageCount; // Champ pour suivre le nombre d'utilisations du coupon


    public boolean isValid() {
        return expirationDate != null && !expirationDate.before(new Date());
    }

    public double applyReduction(double totalAmount) {
        return isValid() ? totalAmount * (1 - reduction / 100) : totalAmount;
    }
}
