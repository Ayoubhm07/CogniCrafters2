package com.cognicrafters.productservice.Config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class CurrencyScraperService {
    private List<Currency> currencies;
    public CurrencyScraperService() {
        try {
            this.currencies = loadCurrenciesFromFile("C:\\Users\\HP\\Desktop\\AutismeIntegration\\product-service\\src\\main\\resources\\currencies.json");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    public List<Currency> loadCurrenciesFromFile(String filePath) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(new File(filePath), new TypeReference<List<Currency>>(){});
    }
    public double convertCurrency(String sourceCurrencyCode, String targetCurrencyCode, double amount) {
        double sourceRate = findExchangeRate(sourceCurrencyCode);
        double targetRate = findExchangeRate(targetCurrencyCode);
        return (amount / sourceRate) * targetRate;
    }

    private double findExchangeRate(String currencyCode) {
        for (Currency currency : currencies) {
            if (currency.getCode().equalsIgnoreCase(currencyCode)) {
                return currency.getTaux();
            }
        }
        throw new IllegalArgumentException("Devise non trouvée : " + currencyCode);
    }
    public String findCurrencyCodeByCountry(String countryName) {
        for (Currency currency : currencies) {
            if (currency.getCountry().equalsIgnoreCase(countryName)) {
                return currency.getCode();
            }
        }
        throw new IllegalArgumentException("Aucun code de devise trouvé pour le pays : " + countryName);
    }
    public List<Currency> getCurrenciesFromFile(String filePath) {
        List<Currency> currencies = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            // Ignorer la première ligne contenant les en-têtes
            br.readLine();
            while ((line = br.readLine()) != null) {
                // Split the line by comma
                String[] parts = line.split(",");
                if (parts.length == 4) {
                    String code = parts[0].replace("\"", "").trim();
                    String country = parts[1].replace("\"", "").trim();
                    String currency = parts[2].replace("\"", "").trim();
                    String rate = parts[3].replace("\"", "").trim();
                    Currency currencyObj = new Currency(code, country, currency, Double.parseDouble(rate));
                    currencies.add(currencyObj);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return currencies;
    }
}
