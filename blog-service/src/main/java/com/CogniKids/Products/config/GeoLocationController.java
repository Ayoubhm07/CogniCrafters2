package com.CogniKids.Products.config;

import com.maxmind.geoip2.exception.GeoIp2Exception;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class GeoLocationController {
@Autowired
    private final GeoLocationService geoLocationService;
@Autowired

    public GeoLocationController(GeoLocationService geoLocationService) {
        this.geoLocationService = geoLocationService;
    }

    @GetMapping("/location/{ipAddress}")
    public ResponseEntity<GeoLocation> getGeoLocation(@PathVariable String ipAddress) {
        System.out.println("Début de la méthode getGeoLocation");

        try {
            GeoLocation geoLocation = geoLocationService.getGeoLocation(ipAddress);
            System.out.println("GeoLocation récupérée :" + geoLocation);
            return ResponseEntity.ok().body(geoLocation);
        } catch (IOException | GeoIp2Exception e) {
            e.printStackTrace();
            System.err.println("Erreur lors de la récupération de la GeoLocation :" + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } finally {
            System.out.println("Fin de la méthode getGeoLocation");
        }
    }
   /* @GetMapping("/convertCurrencyByLocation")
    public ResponseEntity<Double> convertCurrencyByLocation(@RequestParam String sourceCurrency,
                                                            @RequestParam double amount,
                                                            HttpServletRequest request) {
        // Obtenez l'adresse IP de la demande
        String ipAddress = request.getRemoteAddr();

        try {
            // Obtenez la localisation de l'utilisateur
            GeoLocation geoLocation = geoLocationService.getGeoLocation(ipAddress);
            System.out.println("GeoLocation récupérée : " + geoLocation);

            // Obtenez la région de la localisation de l'utilisateur
            String region = geoLocation.getRegion();

            // Obtenez la liste des devises
            List<Currency> currencies = currencyScraperService.getCurrencyData();

            // Recherchez la devise correspondant à la région de l'utilisateur
            String targetCurrency = findCurrencyByRegion(currencies, region);

            if (targetCurrency != null) {
                // Effectuez la conversion de devises
                double convertedAmount = currencyScraperService.convertCurrency(sourceCurrency, targetCurrency, amount);
                return ResponseEntity.ok(convertedAmount);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (IOException | GeoIp2Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Méthode pour rechercher la devise correspondant à la région de l'utilisateur
    private String findCurrencyByRegion(List<Currency> currencies, String region) {
        for (Currency currency : currencies) {
            if (currency.getCountry().equalsIgnoreCase(region)) {
                return currency.getCode(); // Retourne le code de devise si la région correspond à un pays dans la liste
            }
        }
        return null; // Retourne null si aucune devise n'est trouvée pour la région
    }

    */
}
