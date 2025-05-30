package org.skytads.msreserva.integration.producer;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.skytads.msreserva.config.RabbitMQConfig;
import org.skytads.msreserva.dtos.messages.*;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class CriarReservaProducer {

    private final RabbitTemplate rabbitTemplate;

    // UNUSED - now using syncronous calls (HTTP client) in this step
    public void sendReservarPoltronaToVoo(Long reservaId, Long codigoVoo, Long quantidadePoltronas) {
        CriarReservaVooRequestMessageDto message = new CriarReservaVooRequestMessageDto(
                "Criar reserva (1): validar codigo voo, reservar poltronas e retornar valor da passagem",
                reservaId,
                codigoVoo,
                quantidadePoltronas
        );

        log.info("[SAGA criar reserva (1)] Validar codigo voo, reservar poltronas e retornar valor da passagem. {}", message);
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_RESERVA, RabbitMQConfig.ROUTING_KEY_RESERVAR_POLTRONA_VOO, message);
    }

    public void sendUsarMilhasToCliente(Long reservaId, Long codigoCliente, Long milhasUtilizadas) {
        CriarReservaClienteMessageDto message = new CriarReservaClienteMessageDto(
                "Criar reserva (3): validar cliente e usar milhas",
                reservaId,
                codigoCliente,
                milhasUtilizadas
        );

        log.info("[SAGA criar reserva (3)] Validar cliente e usar milhas. {}", message);
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_RESERVA, RabbitMQConfig.ROUTING_KEY_USAR_MILHAS_CLIENTE, message);
    }

    public void reverterReservaToPoltronasVoo(Long reservaId, Long codigoVoo, Long quantidadePoltronas) {
        CriarReservaReverterPoltronasMessageDto message = new CriarReservaReverterPoltronasMessageDto(
                "Criar reserva (5): algo deu errado. Reverter reserva de poltronas",
                reservaId,
                codigoVoo,
                quantidadePoltronas
        );

        log.info("[SAGA criar reserva (5)] Algo deu errado. Reverter reserva de poltronas {}", message);
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_RESERVA, RabbitMQConfig.ROUTING_KEY_REVERTER_RESERVA_POLTRONAS_VOO, message);
    }

    public void sendCancelarMilhasToCliente(Long reservaId, Long codigoCliente, Long milhasUtilizadas) {
        CriarReservaClienteMessageDto message = new CriarReservaClienteMessageDto(
                "Cancelar reserva: reverter milhas do cliente",
                reservaId,
                codigoCliente,
                milhasUtilizadas
        );

        log.info("[SAGA cancelar reserva] Reverter milhas do cliente. {}", message);
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_RESERVA, RabbitMQConfig.ROUTING_KEY_CANCELAR_RESERVA_MILHAS_CLIENTE, message);
    }

    public void sendCancelarPoltronasToVoo(Long reservaId, Long codigoVoo, Long quantidadePoltronas) {
        CriarReservaReverterPoltronasMessageDto message = new CriarReservaReverterPoltronasMessageDto(
                "Cancelar reserva: liberar poltronas no voo",
                reservaId,
                codigoVoo,
                quantidadePoltronas
        );

        log.info("[SAGA cancelar reserva] Liberar poltronas no voo. {}", message);
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_RESERVA, RabbitMQConfig.ROUTING_KEY_CANCELAR_RESERVA_POLTRONAS_VOO, message);
    }

}
