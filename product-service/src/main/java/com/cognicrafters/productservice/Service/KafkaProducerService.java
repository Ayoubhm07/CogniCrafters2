package com.cognicrafters.productservice.Service;

import com.cognicrafters.productservice.Entity.ProductStockUpdate;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {
    private final KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    public KafkaProducerService(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendStockUpdate(String topic, ProductStockUpdate stockUpdate) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        String message = mapper.writeValueAsString(stockUpdate);
        kafkaTemplate.send(topic, message);
    }
    private static final String TOPIC = "chat_messages";


    public void sendMessage(String message) {
        kafkaTemplate.send(TOPIC, message);
    }
}
