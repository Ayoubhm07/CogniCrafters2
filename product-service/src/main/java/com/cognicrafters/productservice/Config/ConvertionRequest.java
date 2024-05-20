package com.cognicrafters.productservice.Config;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConvertionRequest {
    private double amount;
    private String fromCountry;
    private String toCountry;

}
