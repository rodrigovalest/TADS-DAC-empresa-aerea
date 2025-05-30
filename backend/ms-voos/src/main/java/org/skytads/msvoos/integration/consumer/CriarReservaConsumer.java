package org.skytads.msvoos.integration.consumer;

import lombok.RequiredArgsConstructor;
import org.skytads.msvoos.configs.RabbitMQConfig;
import org.skytads.msvoos.dtos.messages.CriarReservaReverterPoltronasMessageDto;
import org.skytads.msvoos.dtos.messages.CriarReservaVooMessageRequestDto;
import org.skytads.msvoos.entities.VooEntity;
import org.skytads.msvoos.exceptions.EntityNotFoundException;
import org.skytads.msvoos.exceptions.QuantidadePoltronasInsuficientesException;
import org.skytads.msvoos.exceptions.StatusVooInvalidoException;
import org.skytads.msvoos.integration.producer.CriarReservaProducer;
import org.skytads.msvoos.services.VooService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class CriarReservaConsumer {

    private final VooService vooService;
    private final CriarReservaProducer criarReservaProducer;

    @RabbitListener(queues = RabbitMQConfig.QUEUE_RESERVAR_POLTRONA_VOO)
    public void reservarPoltronasVoo(CriarReservaVooMessageRequestDto dto) {
        System.out.println(dto);

        try {
            VooEntity voo = this.vooService.reservarPoltronas(
                    dto.getCodigoVoo(), dto.getQuantidadePoltronas()
            );

            this.criarReservaProducer.sendCriarReservaResponseToReserva(
                    "Criar reserva (2). Reservar poltronas: voo validado com sucesso, poltronas reservadas e valor da passagem retornada",
                    true,
                    dto.getReservaId(),
                    voo.getCodigo(),
                    voo.getValorPassagem()
            );
        } catch (EntityNotFoundException e) {
            this.criarReservaProducer.sendCriarReservaResponseToReserva(
                    "Criar reserva (2). Reservar poltronas: voo com o codigo" + dto.getCodigoVoo() + " nao existe",
                    false,
                    dto.getReservaId(),
                    dto.getCodigoVoo(),
                    null
            );
        } catch (StatusVooInvalidoException e) {
            this.criarReservaProducer.sendCriarReservaResponseToReserva(
                    "Criar reserva (2). Reservar poltronas: status do voo invalido. Status deve ser CONFIRMADO",
                    false,
                    dto.getReservaId(),
                    dto.getCodigoVoo(),
                    null
            );
        } catch (QuantidadePoltronasInsuficientesException e) {
            this.criarReservaProducer.sendCriarReservaResponseToReserva(
                    "Criar reserva (2). Reservar poltronas: não há poltronas suficientes disponíveis no voo",
                    false,
                    dto.getReservaId(),
                    dto.getCodigoVoo(),
                    null
            );
        } catch (Exception e) {
            this.criarReservaProducer.sendCriarReservaResponseToReserva(
                    "Criar reserva (2). Reservar poltronas: algo deu errado",
                    false,
                    dto.getReservaId(),
                    dto.getCodigoVoo(),
                    null
            );
        }
    }

    @RabbitListener(queues = RabbitMQConfig.QUEUE_REVERTER_RESERVA_POLTRONAS_VOO)
    public void reverterReservaPoltronasVoo(CriarReservaReverterPoltronasMessageDto dto) {
        System.out.println(dto);
        this.vooService.reservarPoltronas(dto.getCodigoVoo(), dto.getQuantidadePoltronas());
    }
    @RabbitListener(queues = RabbitMQConfig.QUEUE_CANCELAR_RESERVA_POLTRONAS_VOO)
    public void liberarPoltronas(CriarReservaReverterPoltronasMessageDto dto) {
        log.info("[SAGA cancelar reserva] Liberar poltronas no voo. {}", dto);

        try {
            this.vooService.liberarPoltronas(dto.getCodigoVoo(), dto.getQuantidadePoltronas());
            log.info("[SAGA cancelar reserva] Poltronas liberadas com sucesso para a reserva {}", dto.getReservaId());
        } catch (Exception e) {
            log.error("[SAGA cancelar reserva] Falha ao liberar poltronas para a reserva {}", dto.getReservaId(), e);
        }
    }

}
