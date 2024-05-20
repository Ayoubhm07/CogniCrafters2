package com.cognicrafters.productservice.Service;

import com.cognicrafters.productservice.Entity.Coupon;
import com.cognicrafters.productservice.Entity.PaymentInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import jakarta.mail.internet.MimeMessage;

import javax.mail.MessagingException;

@Service
public class EmailSenderService {
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    public void sendPaymentConfirmationEmail(String toEmail, PaymentInfo paymentInfo) throws MessagingException, jakarta.mail.MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        // Construire le contexte pour le template Thymeleaf
        Context context = new Context();
        context.setVariable("panier", paymentInfo.getPanier());

        // Récupérer le contenu du template Thymeleaf
        String emailContent = templateEngine.process("emails", context);

        // Paramètres de l'e-mail
        helper.setFrom("saadallahchaima58@gmail.com");
        helper.setTo(toEmail);
        helper.setSubject("Confirmation de paiement");
        helper.setText(emailContent, true);

        // Envoyer l'e-mail
        mailSender.send(message);
        System.out.println("Mail Send...");
    }

    public void sendCouponEmail(String email, Coupon coupon)  throws MessagingException, jakarta.mail.MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        // Construire le contexte pour le template Thymeleaf
        Context context = new Context();
        context.setVariable("coupon", coupon.getCode());

        // Récupérer le contenu du template Thymeleaf
        String emailContent = templateEngine.process("CodePromoEmail", context);

        // Paramètres de l'e-mail
        helper.setFrom("saadallahchaima58@gmail.com");
        helper.setTo(email);
        helper.setSubject("Code Promo");
        helper.setText(emailContent, true);

        // Envoyer l'e-mail
        mailSender.send(message);
        System.out.println("Mail Send...");
    }
}

