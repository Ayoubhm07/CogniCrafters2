package com.cognicrafters.productservice.Service;

import org.springframework.stereotype.Service;

import java.io.IOException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
@Service
public class ScraperService {
    public void scrapeWebsite() {
        try {
            // Récupérer le document HTML du site cible
            Document doc = Jsoup.connect("https://paytm.com/tools/currency-converter/currency/").get();

            // Sélectionner les éléments HTML que vous souhaitez extraire
            Elements elements = doc.select("Currency");

            // Parcourir les éléments sélectionnés et extraire les données
            for (Element element : elements) {
                String data = element.text();
                System.out.println("Data: " + data);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
