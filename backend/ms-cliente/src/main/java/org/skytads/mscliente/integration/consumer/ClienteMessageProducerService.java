package org.skytads.mscliente.integration.consumer;

import lombok.RequiredArgsConstructor;
import org.skytads.mscliente.config.RabbitMQConfig;
import org.skytads.mscliente.dtos.messages.CriarClienteMessageDto;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClienteMessageProducerService {

    private final RabbitTemplate rabbitTemplate;

    public void sendToCriarClienteQueue(CriarClienteMessageDto message) {
        this.rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_CLIENTE, RabbitMQConfig.ROUTING_KEY_CRIAR_CLIENTE, message);
    }
}
