package com.cognicrafters.productservice.Config;

public class ConversionResponse {
    private ConversionData to;

    public ConversionData getTo() {
        return to;
    }

    public void setTo(ConversionData to) {
        this.to = to;
    }
}

class ConversionData {
    private double amount;

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}