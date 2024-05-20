package com.cognicrafters.productservice.Config;

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
    CurrencyScraperService currencyScraperService;

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
}
