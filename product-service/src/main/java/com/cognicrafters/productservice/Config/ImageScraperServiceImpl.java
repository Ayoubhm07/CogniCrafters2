package com.cognicrafters.productservice.Config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

@Service
public class ImageScraperServiceImpl implements ImageScraperService{
    @Override
    public List<String> scrapeImages() {
        List<String> imageUrls = new ArrayList<>();

        try {
            Document doc = Jsoup.connect("https://www.autismediffusion.com/voir-tous-les-produits-sensoriels-c102x2076926?page=6").get();
            Elements imgElements = doc.select("img");

            for (Element imgElement : imgElements) {
                String imageUrl = imgElement.absUrl("src");
                if (!imageUrl.isEmpty()) {
                    imageUrls.add(imageUrl);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return imageUrls;
    }
    @Override
    public List<String> scrapeTableData() {
        List<String> tableData = new ArrayList<>();

        try {
            Document doc = Jsoup.connect("https://www.autismediffusion.com/voir-tous-les-produits-sensoriels-c102x2076926?page=7").get();
            Element table = doc.selectFirst(".table"); // Remplacez ".table" par le sélecteur CSS de votre table
            Elements rows = table.select("tbody tr");

            for (Element row : rows) {
                // Vous pouvez extraire les données de chaque ligne ici
                String rowData = row.text();
                tableData.add(rowData);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return tableData;
    }
}
