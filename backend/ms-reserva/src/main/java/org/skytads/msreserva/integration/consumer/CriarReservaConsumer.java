package org.skytads.msreserva.integration.consumer;

import lombok.RequiredArgsConstructor;
import org.skytads.msreserva.config.RabbitMQConfig;
import org.skytads.msreserva.dtos.messages.CriarReservaUsarMilhasMessageDto;
import org.skytads.msreserva.dtos.messages.CriarReservaVooResponseMessageDto;
import org.skytads.msreserva.services.ReservaResumoService;
import org.skytads.msreserva.services.ReservaService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class CriarReservaConsumer {

    private final ReservaService reservaService;
    private final ReservaResumoService reservaResumoService;

    @RabbitListener(queues = RabbitMQConfig.QUEUE_RESERVAR_POLTRONA_RESERVA)
    public void reservarPoltronaVoo(CriarReservaVooResponseMessageDto dto) {
        System.out.println("Reservar poltrona criar reserva. Mensagem recebida: " + dto);

        if (dto.getSuccess()) {
            this.reservaService.usarMilhasCliente(dto.getReservaId(), dto.getValorPassagem());
        } else {
            this.reservaService.cancelarReserva(dto.getReservaId());
        }
    }

    @RabbitListener(queues = RabbitMQConfig.QUEUE_USAR_MILHAS_RESERVA)
    public void usarMilhas(CriarReservaUsarMilhasMessageDto dto) {
        System.out.println("Usar milhas criar reserva. Mensagem recebida: " + dto);

        if (dto.getSuccess()) {
            System.out.println("RESERVA {" + dto.getReservaId() + "} efetuada com sucesso");
            this.reservaResumoService.finalizarCriarReserva(dto.getReservaId());
        } else {
            this.reservaService.cancelarReserva(dto.getReservaId());
            this.reservaService.reverterReservaPoltronasVoo(dto.getReservaId());
        }
    }
}
