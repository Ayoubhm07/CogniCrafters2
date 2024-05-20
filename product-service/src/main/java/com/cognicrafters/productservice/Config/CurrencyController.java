package com.cognicrafters.productservice.Config;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class CurrencyController {
    @Autowired
    private CurrencyScraperService currencyService;

    private List<Currency> currencies; // Injectez cette liste avec vos données de devise

    @GetMapping("/currencies")
    public List<Currency> getCurrenciesFromFile() {
        String filePath = "C:\\Users\\saada\\OneDrive\\Bureau\\Devise.txt";
        return currencyService.getCurrenciesFromFile(filePath);
    }
    @GetMapping("/api/convertCurrency")
    public ResponseEntity<String> convertCurrency(
            @RequestParam("sourceCountry") String sourceCountry,
            @RequestParam("targetCountry") String targetCountry,
            @RequestParam("amount") double amount
    ) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            // Charger le fichier JSON
            JsonNode rootNode = objectMapper.readTree(new File("C:\\Users\\HP\\Desktop\\AutismeIntegration\\product-service\\src\\main\\resources\\countries.json"));

            // Récupérer la liste des pays
            ArrayNode countries = (ArrayNode) rootNode.get("countries");

            // Rechercher les codes de devise pour les pays source et cible
            String sourceCurrency = null;
            String targetCurrency = null;
            for (JsonNode countryNode : countries) {
                String countryName = countryNode.get("country").asText();
                String countryCode = countryNode.get("code").asText();

                if (countryName.equalsIgnoreCase(sourceCountry)) {
                    sourceCurrency = countryCode;
                }
                if (countryName.equalsIgnoreCase(targetCountry)) {
                    targetCurrency = countryCode;
                }

                // Sortir de la boucle si les deux codes de devise sont trouvés
                if (sourceCurrency != null && targetCurrency != null) {
                    break;
                }
            }

            // Vérifier si les codes de devise sont trouvés pour les deux pays
            if (sourceCurrency == null || targetCurrency == null) {
                return ResponseEntity.badRequest().body("Impossible de trouver les codes de devise pour les pays spécifiés.");
            }

            // Convertir la devise
            double convertedAmount = currencyService.convertCurrency(sourceCurrency, targetCurrency, amount);

            // Formater la réponse
            String response = String.format("%.2f %s is equal to %.2f %s",
                    amount, sourceCurrency, convertedAmount, targetCurrency);

            // Afficher la réponse
            System.out.println(response);

            // Retourner la réponse dans un objet ResponseEntity avec le statut OK
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erreur lors de la lecture du fichier JSON.");
        }
    }
}
