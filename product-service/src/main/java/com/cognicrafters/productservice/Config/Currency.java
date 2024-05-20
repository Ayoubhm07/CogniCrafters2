package com.cognicrafters.productservice.Config;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class Currency {
    private String country;
    private String currency;
    private String code;
    private double taux;

    @JsonCreator
    public Currency(@JsonProperty("country") String country,
                    @JsonProperty("currency") String currency,
                    @JsonProperty("code") String code,
                    @JsonProperty("taux") double taux) {
        this.country = country;
        this.currency = currency;
        this.code = code;
        this.taux = taux;
    }

}
