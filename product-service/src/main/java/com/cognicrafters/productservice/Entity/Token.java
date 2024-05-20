package com.cognicrafters.productservice.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Token {
    private String id;
    private String object;
    private Card card;
    private String client_ip;
    private long created;
    private String email;
    private boolean livemode;
    private String type;
    private boolean used;

    @Override
    public String toString() {
        return "Token{" +
                "id='" + id + '\'' +
                ", object='" + object + '\'' +
                ", card=" + card +
                ", client_ip='" + client_ip + '\'' +
                ", created=" + created +
                ", email='" + email + '\'' +
                ", livemode=" + livemode +
                ", type='" + type + '\'' +
                ", used=" + used +
                '}';
    }
}
