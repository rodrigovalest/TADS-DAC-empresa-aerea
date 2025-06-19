package org.skytads.msreserva.integration.consumer;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.skytads.msreserva.config.RabbitMQConfig;
import org.skytads.msreserva.dtos.messages.CriarReservaReverterPoltronasMessageDto;
import org.skytads.msreserva.dtos.messages.CriarReservaUsarMilhasMessageDto;
import org.skytads.msreserva.dtos.messages.CriarReservaVooResponseMessageDto;
import org.skytads.msreserva.services.ReservaResumoService;
import org.skytads.msreserva.services.ReservaService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class CriarReservaConsumer {

    private final ReservaService reservaService;
    private final ReservaResumoService reservaResumoService;

    @RabbitListener(queues = RabbitMQConfig.QUEUE_RESERVAR_POLTRONA_RESERVA)
    public void reservarPoltronaVoo(CriarReservaVooResponseMessageDto dto) {
        log.info("[SAGA criar reserva (2)] Reservar poltrona. {}", dto);

        if (dto.getSuccess()) {
            log.info("[SAGA criar reserva (2)] Sucesso reservar poltrona. Usando milhas do cliente {}", dto);
            this.reservaService.usarMilhasCliente(dto.getReservaId());
        } else {
            log.error("[SAGA criar reserva (2)] Falha ao efetuar reserva {} | {}", dto.getReservaId(), dto);
            this.reservaService.cancelarReserva(dto.getReservaId());
        }
    }

    @RabbitListener(queues = RabbitMQConfig.QUEUE_USAR_MILHAS_RESERVA)
    public void usarMilhas(CriarReservaUsarMilhasMessageDto dto) {
        log.info("[SAGA criar reserva (4)] Usar milhas criar reserva. {}", dto);

        if (dto.getSuccess()) {
            log.info("[SAGA criar reserva (4)] RESERVA {} efetuada com sucesso", dto.getReservaId());
        } else {
            log.error("[SAGA criar reserva (4)] Falha ao efetuar reserva {} | {}", dto.getReservaId(), dto);
            this.reservaService.cancelarReserva(dto.getReservaId());
            this.reservaService.reverterReservaPoltronasVoo(dto.getReservaId());
        }
    }

    @RabbitListener(queues = RabbitMQConfig.QUEUE_CANCELAR_RESERVA_MILHAS_CLIENTE)
    public void cancelarMilhasCliente(CriarReservaUsarMilhasMessageDto dto) {
        log.info("[SAGA cancelar reserva] Reverter milhas do cliente. {}", dto);

        if (dto.getSuccess()) {
            log.info("[SAGA cancelar reserva] Milhas revertidas com sucesso para a reserva {}", dto.getReservaId());
        } else {
            log.error("[SAGA cancelar reserva] Falha ao reverter milhas para a reserva {}", dto.getReservaId());
        }
    }

    @RabbitListener(queues = RabbitMQConfig.QUEUE_CANCELAR_RESERVA_POLTRONAS_VOO)
    public void cancelarPoltronasVoo(CriarReservaReverterPoltronasMessageDto dto) {
        log.info("[SAGA cancelar reserva] Liberar poltronas no voo. {}", dto);

        log.info("[SAGA cancelar reserva] Poltronas liberadas com sucesso para a reserva {}", dto.getReservaId());
    }

}
