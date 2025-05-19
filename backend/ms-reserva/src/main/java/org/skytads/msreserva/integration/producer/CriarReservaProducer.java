package org.skytads.msreserva.integration.producer;

import lombok.RequiredArgsConstructor;
import org.skytads.msreserva.config.RabbitMQConfig;
import org.skytads.msreserva.dtos.messages.CriarReservaClienteMessageDto;
import org.skytads.msreserva.dtos.messages.CriarReservaReverterPoltronasMessageDto;
import org.skytads.msreserva.dtos.messages.CriarReservaVooRequestMessageDto;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class CriarReservaProducer {

    private final RabbitTemplate rabbitTemplate;

    public void sendReservarPoltronaToVoo(Long reservaId, Long codigoVoo, Long quantidadePoltronas) {
        CriarReservaVooRequestMessageDto message = new CriarReservaVooRequestMessageDto(
                "Criar reserva (1): validar codigo voo, reservar poltronas e retornar valor da passagem",
                reservaId,
                codigoVoo,
                quantidadePoltronas
        );

        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_RESERVA, RabbitMQConfig.ROUTING_KEY_RESERVAR_POLTRONA_VOO, message);
    }

    public void sendUsarMilhasToCliente(Long reservaId, Long codigoCliente, Long milhasUtilizadas) {
        CriarReservaClienteMessageDto message = new CriarReservaClienteMessageDto(
                "Criar reserva (3): validar cliente e usar milhas",
                reservaId,
                codigoCliente,
                milhasUtilizadas
        );

        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_RESERVA, RabbitMQConfig.ROUTING_KEY_USAR_MILHAS_CLIENTE, message);
    }

    public void reverterReservaToPoltronasVoo(Long reservaId, Long codigoVoo, Long quantidadePoltronas) {
        CriarReservaReverterPoltronasMessageDto message = new CriarReservaReverterPoltronasMessageDto(
                "Criar reserva (5): algo deu errado. Reverter reserva de poltronas",
                reservaId,
                codigoVoo,
                quantidadePoltronas
        );

        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_RESERVA, RabbitMQConfig.ROUTING_KEY_REVERTER_RESERVA_POLTRONAS_VOO, message);
    }
}
