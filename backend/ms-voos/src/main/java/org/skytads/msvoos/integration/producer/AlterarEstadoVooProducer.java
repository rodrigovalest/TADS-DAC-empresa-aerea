package org.skytads.msvoos.integration.producer;

import lombok.RequiredArgsConstructor;
import org.skytads.msvoos.configs.RabbitMQConfig;
import org.skytads.msvoos.dtos.messages.AlterarEstadoVooToReservaMessageDto;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class AlterarEstadoVooProducer {

    private final RabbitTemplate rabbitTemplate;

    public void sendCancelarVooToReserva(Long codigoVoo) {
        var message = new AlterarEstadoVooToReservaMessageDto(
                "cancelando voo" + codigoVoo + ". atualizar reservas",
                codigoVoo
        );

        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_RESERVA, RabbitMQConfig.ROUTING_KEY_CANCELAR_VOO_RESERVA, message);
    }

    public void sendRealizarVooToReserva(Long codigoVoo) {
        var message = new AlterarEstadoVooToReservaMessageDto(
                "realizar voo" + codigoVoo + ". atualizar reservas",
                codigoVoo
        );

        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_RESERVA, RabbitMQConfig.ROUTING_KEY_REALIZAR_VOO_RESERVA, message);
    }
}
