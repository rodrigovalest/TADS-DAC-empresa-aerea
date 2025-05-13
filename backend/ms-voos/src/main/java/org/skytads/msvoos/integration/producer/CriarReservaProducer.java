package org.skytads.msvoos.integration.producer;

import lombok.RequiredArgsConstructor;
import org.skytads.msvoos.configs.RabbitMQConfig;
import org.skytads.msvoos.dtos.messages.CriarReservaVooMessageResponseDto;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class CriarReservaProducer {

    private final RabbitTemplate rabbitTemplate;

    public void sendCriarReservaResponseToReserva(String info, Boolean success, Long reservaId, Long codigoVoo, Float valorPassagem) {
        CriarReservaVooMessageResponseDto message = new CriarReservaVooMessageResponseDto(
                success,
                info,
                reservaId,
                codigoVoo,
                valorPassagem
        );

        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_RESERVA, RabbitMQConfig.ROUTING_KEY_RESERVAR_POLTRONA_RESERVA, message);
    }
}
