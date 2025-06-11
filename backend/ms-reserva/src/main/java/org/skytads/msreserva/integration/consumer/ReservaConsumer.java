package org.skytads.msreserva.integration.consumer;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.skytads.msreserva.config.RabbitMQConfig;
import org.skytads.msreserva.dtos.responses.ReservaResponseDto;
import org.skytads.msreserva.services.ReservaService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class ReservaConsumer {

    private final ReservaService reservaService;

    @RabbitListener(queues = RabbitMQConfig.QUEUE_REQUEST_RESERVAS)
    public List<ReservaResponseDto> handleReservasRequest(Long codigoCliente) {
        log.info("Received request for reservations of client {}", codigoCliente);
        return reservaService.getReservasByCliente(codigoCliente);
    }
}