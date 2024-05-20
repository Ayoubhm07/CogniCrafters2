package com.cognicrafters.productservice.Controller;

import com.cognicrafters.productservice.Entity.*;
import com.cognicrafters.productservice.Repo.PaymentInfoRepo;
import com.cognicrafters.productservice.Repo.ProductRepo;
import com.cognicrafters.productservice.Service.CouponService;
import com.cognicrafters.productservice.Service.EmailSenderService;
import com.cognicrafters.productservice.Service.KafkaProducerService;
import com.cognicrafters.productservice.Service.ProductServices;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class PaiementController {

    @Autowired
    private PaymentInfoRepo paymentInfoRepo;
    @Autowired
    private ProductServices productServices;

    @Autowired
    private EmailSenderService emailSenderService; // Injection du service d'envoi d'e-mails
    @Autowired
    private CouponService couponService;
    @Autowired
    private ProductRepo productRepo;
    @Autowired
    private KafkaProducerService kafkaProducerService;
    @PostMapping("/payments")
    public ResponseEntity<?> processPayment(@RequestBody PaymentInfo paymentInfo) throws MessagingException, MessagingException, jakarta.mail.MessagingException {
        System.out.println("Payment data received: " + paymentInfo);

        // Check if all products in the cart have sufficient stock
        for (CartItem item : paymentInfo.getPanier()) {
            Product product = productRepo.findById(item.getProduit().get_id())
                    .orElseThrow(() -> new RuntimeException("Product not found with ID: " + item.getProduit().get_id()));

            if (product.getQuantity() < item.getQuantite() || product.getStock() == 0) {
                System.out.println("Cannot process payment: Insufficient stock for product ID " + product.get_id());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot process payment: Insufficient stock for product ID " + product.get_id());
            }
        }

        // If stock checks are passed, process the payment and send stock updates
        paymentInfoRepo.save(paymentInfo);
        String toEmail = paymentInfo.getToken().getEmail();
        emailSenderService.sendPaymentConfirmationEmail(toEmail, paymentInfo);

        for (CartItem item : paymentInfo.getPanier()) {
            ProductStockUpdate stockUpdate = new ProductStockUpdate();
            stockUpdate.setProductId(item.getProduit().get_id());
            stockUpdate.setQuantityPurchased(item.getQuantite());

            // Now using the updated sendStockUpdate method
            try {
                kafkaProducerService.sendStockUpdate("purchase-events", stockUpdate);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }

        }
        /*String customerId = paymentInfo.getToken().getEmail(); // Ou toute autre identifiant unique du client
        List<PaymentInfo> customerPayments = paymentInfoRepo.findByCustomerEmail(customerId);

        if (customerPayments.size() > 3) {
            // Le client a effectué plus de trois achats, générer un code promo
            Coupon newCoupon = couponService.generateCouponForCustomer();

            // Enregistrer le nouveau coupon dans la base de données
            couponService.createCoupon(newCoupon);

            // Envoyer le coupon au client par e-mail
            emailSenderService.sendCouponEmail(customerId, newCoupon);
        }*/
        return ResponseEntity.ok(paymentInfo);
    }


    private boolean checkAllProductsInStock(List<CartItem> cartItems) {
        for (CartItem cartItem : cartItems) {
            Product product = cartItem.getProduit();
            if (product.getStock() == 0) {
                return false; // Si un produit est en rupture de stock, retournez false
            }
        }
        return true; // Si tous les produits sont en stock, retournez true
    }
    /* @PostMapping("/payments")
     public PaymentInfo processPayment(@RequestBody PaymentInfo paymentInfo) throws MessagingException , MessagingException, jakarta.mail.MessagingException {
         // Récupérer le code promo saisi par l'utilisateur depuis le panier
         String couponCode = paymentInfo.getCoupon().toString();

         // Vérifier si le code promo est valide
         Coupon coupon = couponService.getCouponByCode(couponCode);
         if (coupon != null && coupon.isValid()) {
             // Vérifier si un coupon est déjà appliqué au panier
             if (paymentInfo.getCoupon() == null) {
                 // Appliquer le nouveau coupon au panier
                 paymentInfo.setCoupon(coupon);
             } else {
                 // Un coupon est déjà appliqué au panier. Vous pouvez choisir de le remplacer par le nouveau coupon ou de ne pas appliquer le nouveau coupon.
                 // Dans cet exemple, nous choisissons de ne pas appliquer le nouveau coupon.
                 // Vous pouvez ajuster cette logique selon vos besoins.
                 // Retournez éventuellement une erreur indiquant que le panier a déjà un coupon appliqué.
             }

             // Appliquer la réduction du coupon sur le total du panier
             double totalWithDiscount = coupon.applyReduction(paymentInfo.getTotal());
             paymentInfo.setTotal(totalWithDiscount);
         }

         // Traitez les détails du paiement ici, comme la sauvegarde dans la base de données
         System.out.println("Données du paiement reçues : " + paymentInfo);

         // Envoyer un e-mail de confirmation au client avec les détails du panier
         emailSenderService.sendPaymentConfirmationEmail(paymentInfo.getToken().getEmail(), paymentInfo);

         return paymentInfo; // Retournez le paiement
     }*/
    @GetMapping("/related-products/{productId}")
    public ResponseEntity<List<Product>> getRelatedProducts(@PathVariable String productId) {
        List<Product> relatedProducts = new ArrayList<>();

        List<PaymentInfo> paymentsContainingProduct = paymentInfoRepo.findByPanier_Produit__id(productId);

        for (PaymentInfo payment : paymentsContainingProduct) {
            for (CartItem item : payment.getPanier()) {
                if (!item.getProduit().get_id().equals(productId)) {
                    relatedProducts.add(item.getProduit());
                }
            }
        }

        return ResponseEntity.ok(relatedProducts);
    }

    @GetMapping("/payments")
    public List<PaymentInfo> getAllPayments() {
        return paymentInfoRepo.findAll();

    }
    @PostMapping("/codePromo")

    public ResponseEntity<PaymentInfo> processPaymentAndSendCoupon(PaymentInfo paymentInfo) throws MessagingException, MessagingException, jakarta.mail.MessagingException{
        String customerId = paymentInfo.getToken().getEmail(); // Ou toute autre identifiant unique du client
        List<PaymentInfo> customerPayments = paymentInfoRepo.findByCustomerEmail(customerId);

        if (customerPayments.size() > 3) {
            // Le client a effectué plus de trois achats, générer un code promo
            Coupon newCoupon = couponService.generateCouponForCustomer();

            // Enregistrer le nouveau coupon dans la base de données
            couponService.createCoupon(newCoupon);

            // Envoyer le coupon au client par e-mail
            emailSenderService.sendCouponEmail(customerId, newCoupon);
        }
        return ResponseEntity.ok(paymentInfo);
    }
    @PostMapping("/generate-coupon")
    public ResponseEntity<?> generateCouponForUser(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        List<PaymentInfo> customerPayments = paymentInfoRepo.findByCustomerEmail(email);

        if (customerPayments.size() > 3) {
            // L'utilisateur a effectué plus de trois achats, générer un code promo
            Coupon newCoupon = couponService.generateCouponForCustomer();
            System.out.println(newCoupon);
            return ResponseEntity.ok(newCoupon);
        } else {
            // L'utilisateur n'a pas acheté plus de 3 produits
            System.out.println("User has not purchased more than 3 products");
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("User has not purchased more than 3 products");
        }
    }



}