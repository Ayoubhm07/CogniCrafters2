package com.CogniKids.Products.config;
import com.maxmind.geoip2.DatabaseReader;
import com.maxmind.geoip2.exception.GeoIp2Exception;
import com.maxmind.geoip2.model.CountryResponse;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.InetAddress;
@Service
public class GeoLocationService {

    private DatabaseReader reader;

    public GeoLocationService() throws IOException {
        // Chemin absolu vers le fichier GeoLite2-City.mmdb sur votre PC
        String filePath = "C:\\Users\\HP\\Desktop\\Autisme Integration\\blog-service\\src\\main\\resources\\GeoLite2-City.mmdb";

        // Créez un objet File à partir du chemin absolu
        File database = new File(filePath);

        // Vérifiez si le fichier existe
        if (!database.exists()) {
            throw new FileNotFoundException("GeoLite2-City.mmdb not found at " + filePath);
        }

        // Créer un objet DatabaseReader en utilisant le fichier MMDB
        reader = new DatabaseReader.Builder(database).build();
    }

    public GeoLocation getGeoLocation(String ipAddress) throws IOException, GeoIp2Exception {
        // Obtenez des informations sur la ville à partir de l'adresse IP
        InetAddress ip = InetAddress.getByName(ipAddress);

        CountryResponse response = reader.country(ip);

        // Déclarez une variable GeoLocation à retourner à la fin de la méthode
        GeoLocation geoLocation = new GeoLocation();

        // Vérifiez si getMostSpecificSubdivision() retourne null
        if (response.getRegisteredCountry() != null) {
            // Récupérez les informations sur la subdivision à partir de la réponse
            String region = response.getRegisteredCountry().getName();
            // Utilisez la valeur de la région récupérée
            geoLocation.setRegion(region);
        } else {
            // Traitez le cas où la subdivision est null
            // Gérez ce cas en conséquence
            geoLocation.setRegion("Unknown"); // Par exemple, définissez une valeur par défaut
        }

        // Ajoutez d'autres attributs à l'objet GeoLocation si nécessaire

        // Retournez l'objet GeoLocation à la fin de la méthode
        return geoLocation;
    }
}
