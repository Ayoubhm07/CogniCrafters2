package com.cognicrafters.productservice.Service;

import com.stripe.Stripe;
import com.stripe.model.Charge;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class StripeService {
    @Value("${stripe.api.key}")
    private String stripeApiKey;

    public String chargeCard(String token, double amount) throws Exception {
        Stripe.apiKey = stripeApiKey;

        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", (int) (amount * 100)); // montant en centimes
        chargeParams.put("currency", "usd");
        chargeParams.put("source", token);

        Charge charge = Charge.create(chargeParams);
        return charge.getId(); // retourne l'ID de la transaction Stripe
    }
}
