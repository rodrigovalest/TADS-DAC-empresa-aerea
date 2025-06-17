package org.skytads.msreserva.usecases;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.skytads.msreserva.dtos.requests.CriarReservaVooRequestDto;
import org.skytads.msreserva.dtos.responses.CriarReservaVooResponseDto;
import org.skytads.msreserva.entities.AeroportoEntity;
import org.skytads.msreserva.entities.ReservaEntity;
import org.skytads.msreserva.entities.VooEntity;
import org.skytads.msreserva.integration.clients.VooClient;
import org.skytads.msreserva.integration.producer.CriarReservaProducer;
import org.skytads.msreserva.mappers.VooMapper;
import org.skytads.msreserva.services.AeroportoService;
import org.skytads.msreserva.services.ReservaService;
import org.skytads.msreserva.services.VooService;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Component
public class CriarReservaUseCase {
    private final ReservaService reservaService;
    private final VooService vooService;
    private final AeroportoService aeroportoService;
    private final VooClient vooClient;

    @Transactional
    public ReservaEntity execute(Float valor, Long milhas, Long quantidadePoltronas, Long codigoCliente, Long codigoVoo) {
        log.info("[SAGA criar reserva (1)] criar reserva | valor {} | milhas {} | quantidadePoltronas {} | codigoCliente {} | codigoVoo {}", valor, milhas, quantidadePoltronas, codigoCliente, codigoVoo);

        CriarReservaVooResponseDto criarReservaVooResponseDto = this.vooClient.criarReservaReservarPoltronasVoo(
                codigoVoo, new CriarReservaVooRequestDto(quantidadePoltronas)
        );

        log.info("[SAGA criar reserva (2)] reservar poltronas voo response: {}", criarReservaVooResponseDto);
        VooEntity voo = VooMapper.toEntity(criarReservaVooResponseDto);
        AeroportoEntity aeroportoOrigem = this.aeroportoService.criarOuAtualizarCopiaAeroporto(voo.getAeroportoOrigem());
        AeroportoEntity aeroportoDestino = this.aeroportoService.criarOuAtualizarCopiaAeroporto(voo.getAeroportoDestino());

        voo.setAeroportoOrigem(aeroportoOrigem);
        voo.setAeroportoDestino(aeroportoDestino);
        VooEntity persistedVoo = this.vooService.criarOuAtualizarCopiaVoo(voo);

        ReservaEntity reserva = this.reservaService.criarReserva(valor, milhas, quantidadePoltronas, codigoCliente, persistedVoo);

        log.info("[SAGA criar reserva (3)] Validar cliente e usar milhas | reservaId {}, milhas {}, cliente id {}", reserva.getCodigo(), milhas, codigoCliente);
        reservaService.usarMilhasCliente(reserva.getCodigo());

        return reserva;
    }
}
