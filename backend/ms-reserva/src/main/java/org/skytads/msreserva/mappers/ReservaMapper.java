package org.skytads.msreserva.mappers;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.skytads.msreserva.dtos.responses.*;
import org.skytads.msreserva.entities.ReservaEntity;
import org.skytads.msreserva.entities.VooEntity;
import org.skytads.msreserva.services.ReservaResumoService;

import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

@Component
@RequiredArgsConstructor
public class ReservaMapper {

    private final ReservaResumoService reservaResumoService;

    public CriarReservaResponseDto toCriarReservaResponseDto(ReservaEntity reserva) {

        VooEntity voo = reserva.getVoo();

        AeroportoResponseDto origem = new AeroportoResponseDto(
                voo.getAeroportoOrigem().getCodigo(),
                voo.getAeroportoOrigem().getNome(),
                voo.getAeroportoOrigem().getCidade(),
                voo.getAeroportoOrigem().getUf()
        );
        AeroportoResponseDto destino = new AeroportoResponseDto(
                voo.getAeroportoDestino().getCodigo(),
                voo.getAeroportoDestino().getNome(),
                voo.getAeroportoDestino().getCidade(),
                voo.getAeroportoDestino().getUf()
        );

        var resumo = reservaResumoService.findByCodigoReserva(reserva.getCodigo());

        return new CriarReservaResponseDto(
                reserva.getCodigo(),
                reserva.getDataHoraReserva()
                       .atOffset(ZoneOffset.of("-03:00"))
                       .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME),
                resumo.getValor(),
                resumo.getMilhasUtilizadas(),
                reserva.getQuantidadePoltronas(),
                reserva.getCodigoCliente(),
                reserva.getEstado(),
                new VooResponseDto(voo.getCodigo(), origem, destino)
        );
    }

    public ConsultaReservaResponseDto toConsultaReservaResponseDto(ReservaEntity reserva) {
        return ConsultaReservaResponseDto.builder()
                .codigo(reserva.getCodigo())
                .codigoCliente(reserva.getCodigoCliente())
                .estado(reserva.getEstado().name())
                .voo(null)
                .build();
    }

    public ReservaResponseDto toReservaResponseDto(ReservaEntity reserva) {
        return new ReservaResponseDto(
                reserva.getCodigo(),
                reserva.getCodigoCliente(),
                reserva.getEstado().name(),
                reserva.getVoo().getCodigo(),
                Math.toIntExact(reserva.getQuantidadePoltronas())
        );
    }
}
