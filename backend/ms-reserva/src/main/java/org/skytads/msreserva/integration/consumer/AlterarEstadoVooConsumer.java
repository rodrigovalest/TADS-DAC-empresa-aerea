package org.skytads.msreserva.integration.consumer;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.skytads.msreserva.config.RabbitMQConfig;
import org.skytads.msreserva.dtos.messages.AlterarEstadoVooToReservaMessageDto;
import org.skytads.msreserva.services.ReservaService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class AlterarEstadoVooConsumer {

    private final ReservaService reservaService;

    @RabbitListener(queues = RabbitMQConfig.QUEUE_CANCELAR_VOO_RESERVA)
    public void cancelarVoo(AlterarEstadoVooToReservaMessageDto dto) {
        log.info("[Alterar estado voo listener] Cancelar voo {}", dto);
        this.reservaService.cancelarVoo(dto.getCodigoVoo());
    }

    @RabbitListener(queues = RabbitMQConfig.QUEUE_REALIZAR_VOO_RESERVA)
    public void realizarVoo(AlterarEstadoVooToReservaMessageDto dto) {
        log.info("[Alterar estado voo listener] Realizar voo {}", dto);
        this.reservaService.realizarVoo(dto.getCodigoVoo());
    }
}
