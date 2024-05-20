package com.cognicrafters.productservice.Entity;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProductStockUpdate {
    private String productId;
    private int newStock;
    private int newQuantity;
    private int quantityPurchased;


}
