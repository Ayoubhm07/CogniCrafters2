package com.cognicrafters.productservice.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Document(collection = "paiements")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentInfo {
    @Id
    private String id;
    @JsonProperty("token")
    private Token  token;
    @JsonProperty("panier")
    private List<CartItem> panier;
    @JsonProperty("total")

    private double total;

    @Override
    public String toString() {
        return "PaymentInfo{" +
                "token='" + token + '\'' +
                ", panier=" + panier +
                ", total=" + total +
                '}';
    }
}
