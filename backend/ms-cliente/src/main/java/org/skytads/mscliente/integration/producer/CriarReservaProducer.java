package org.skytads.mscliente.integration.producer;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.skytads.mscliente.config.RabbitMQConfig;
import org.skytads.mscliente.mappers.MessageMapper;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class CriarReservaProducer {

    private final RabbitTemplate rabbitTemplate;

    public void sendUsarMilhasToReserva(Long reservaId, Long codigoCliente, Boolean success, String info) {
        var message = MessageMapper.toCriarReservaResponseMessageDto(reservaId, codigoCliente, success, info);

        this.rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_RESERVA, RabbitMQConfig.ROUTING_KEY_USAR_MILHAS_RESERVA, message);
    }
}
