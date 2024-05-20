package com.cognicrafters.productservice.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class PromotionScheduler {
    @Autowired
    private PromotionService promotionService;

    @Scheduled(cron = "0 0 8 10 JAN ? 2024") // Début des soldes d'hiver le 10 janvier 2024 à 8h
    public void scheduleWinterPromotions() {
        promotionService.applyPromotions();
    }

    @Scheduled(cron = "0 0 8 L JUN ? 2024") // Début des soldes d'été le dernier mercredi de juin 2024 à 8h
    public void scheduleSummerPromotions() {
        promotionService.applyPromotions();
    }
}
