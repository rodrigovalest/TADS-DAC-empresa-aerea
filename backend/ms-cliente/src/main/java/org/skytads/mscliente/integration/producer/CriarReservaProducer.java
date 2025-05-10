package org.skytads.mscliente.integration.producer;

import lombok.RequiredArgsConstructor;
import org.skytads.mscliente.config.RabbitMQConfig;
import org.skytads.mscliente.mappers.MessageMapper;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class CriarReservaProducer {

    private final RabbitTemplate rabbitTemplate;

    public void sendCriarReservaToCliente(Long reservaId, Long codigoCliente, Boolean success, String info) {
        var message = MessageMapper.toCriarReservaResponseMessageDto(reservaId, codigoCliente, success, info);

        this.rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_RESERVA, RabbitMQConfig.ROUTING_KEY_COMPRAR_MILHAS_CRIAR_RESERVA, message);
    }
}
