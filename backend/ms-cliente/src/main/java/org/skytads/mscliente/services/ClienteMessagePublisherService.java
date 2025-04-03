package org.skytads.mscliente.services;

import lombok.RequiredArgsConstructor;
import org.skytads.mscliente.dtos.messages.CriarClienteMessageDto;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClienteMessagePublisherService {

    private final RabbitTemplate rabbitTemplate;
    private final Queue filaCriarCliente;

    public void sendPointsMessage(CriarClienteMessageDto message) {
        this.rabbitTemplate.convertAndSend(
                this.filaCriarCliente.getName(),
                message
        );
    }
}
