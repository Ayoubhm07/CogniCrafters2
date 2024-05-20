package com.CogniKids.Products.Entity;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ChatGptRequest {
    private String model;
    private List<Message> messages;
    private final static String ROLE_USER = "user";

    public ChatGptRequest(String model, String prompt) {
        this.model = model;
        this.messages = new ArrayList<>();
        this.messages.add(new Message(ROLE_USER, prompt));    }
}