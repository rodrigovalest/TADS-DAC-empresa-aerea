package org.skytads.mscliente.integration.producer;

import lombok.RequiredArgsConstructor;
import org.skytads.mscliente.config.RabbitMQConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class ReservaProducer {

    private final RabbitTemplate rabbitTemplate;

    public void requestReservasByCliente(Long codigoCliente) {
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_CLIENTE, RabbitMQConfig.ROUTING_KEY_REQUEST_RESERVAS, codigoCliente);
    }
}