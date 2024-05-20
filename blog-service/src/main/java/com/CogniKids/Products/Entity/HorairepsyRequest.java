package com.CogniKids.Products.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class HorairepsyRequest {
    private String heureDebut;
    private String heureFin;
    private String idpsychiatre;
}
