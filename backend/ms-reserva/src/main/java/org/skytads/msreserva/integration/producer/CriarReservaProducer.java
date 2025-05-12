package org.skytads.msreserva.integration.producer;

import lombok.RequiredArgsConstructor;
import org.skytads.msreserva.config.RabbitMQConfig;
import org.skytads.msreserva.dtos.messages.CriarReservaClienteMessageDto;
import org.skytads.msreserva.dtos.messages.CriarReservaVooMessageDto;
import org.skytads.msreserva.mappers.MessageMapper;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class CriarReservaProducer {

    private final RabbitTemplate rabbitTemplate;

    public void sendCriarReservaToCliente(Long reservaId, Long codigoCliente, Long milhasUtilizadas, Float valor) {
        CriarReservaClienteMessageDto message = MessageMapper.toCriarReservaClienteMessageDto(
                "criar reserva: validar cliente e usar milhas",
                reservaId,
                codigoCliente,
                milhasUtilizadas,
                valor
        );

        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_RESERVA, RabbitMQConfig.ROUTING_KEY_CRIAR_RESERVA_CLIENTE, message);
    }

    public void sendCriarReservaToVoo(Long reservaId, Long codigoVoo, Long quantidadePoltronas) {
        CriarReservaVooMessageDto message = MessageMapper.toCriarReservaVooMessageDto(
            "criar reserva: validar voo e reservar poltronas",
                reservaId,
                codigoVoo,
                quantidadePoltronas
        );

        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_RESERVA, RabbitMQConfig.ROUTING_KEY_CRIAR_RESERVA_VOO, message);
    }
}
