package org.skytads.msreserva.integration.consumer;

import lombok.RequiredArgsConstructor;
import org.skytads.msreserva.config.RabbitMQConfig;
import org.skytads.msreserva.dtos.messages.CriarReservaUsarMilhasMessageDto;
import org.skytads.msreserva.entities.ReservaResumoEntity;
import org.skytads.msreserva.integration.producer.CriarReservaProducer;
import org.skytads.msreserva.services.ReservaResumoService;
import org.skytads.msreserva.services.ReservaService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class CriarReservaConsumer {

    private final CriarReservaProducer criarReservaProducer;
    private final ReservaService reservaService;
    private final ReservaResumoService reservaResumoService;

    @RabbitListener(queues = RabbitMQConfig.QUEUE_USAR_MILHAS_CRIAR_RESERVA)
    public void usarMilhasCriarReserva(CriarReservaUsarMilhasMessageDto dto) {
        System.out.println("Usar milhas criar reserva. Mensagem recebida: " + dto);

        if (!dto.getSuccess()) {
            this.reservaService.cancelarReserva(dto.getReservaId());
        } else {
            ReservaResumoEntity reservaResumo = this.reservaResumoService.findByCodigoReserva(dto.getReservaId());
            this.criarReservaProducer.sendCriarReservaToVoo(
                    reservaResumo.getCodigoReserva(), reservaResumo.getCodigoVoo(), reservaResumo.getQuantidadePoltronas()
            );
        }
    }
}
