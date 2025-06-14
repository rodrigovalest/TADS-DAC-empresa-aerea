package org.skytads.msreserva.mappers;

import org.skytads.msreserva.dtos.responses.AeroportoResponseDto;
import org.skytads.msreserva.dtos.responses.ConsultaReservaResponseDto;
import org.skytads.msreserva.dtos.responses.CriarReservaResponseDto;
import org.skytads.msreserva.dtos.responses.ReservaResponseDto;
import org.skytads.msreserva.entities.ReservaEntity;
import org.skytads.msreserva.entities.VooEntity;

import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

public class ReservaMapper {
    public static CriarReservaResponseDto toCriarReservaResponseDto(ReservaEntity reserva) {
        VooEntity voo = reserva.getVoo();

        AeroportoResponseDto aeroportoOrigemEntity = new AeroportoResponseDto(
                voo.getAeroportoOrigem().getCodigo(),
                voo.getAeroportoOrigem().getNome(),
                voo.getAeroportoOrigem().getCidade(),
                voo.getAeroportoOrigem().getUf()
        );

        AeroportoResponseDto aeroportoDestinoEntity = new AeroportoResponseDto(
                voo.getAeroportoDestino().getCodigo(),
                voo.getAeroportoDestino().getNome(),
                voo.getAeroportoDestino().getCidade(),
                voo.getAeroportoDestino().getUf()
        );

        return new CriarReservaResponseDto(
                reserva.getCodigo(),
                reserva.getDataHoraReserva().atOffset(ZoneOffset.of("-03:00")).format(DateTimeFormatter.ISO_OFFSET_DATE_TIME),
                voo.getValorPassagem(),
                reserva.getCodigoCliente(),
                reserva.getQuantidadePoltronas(),
                reserva.getCodigoCliente(),
                reserva.getEstado(),
                voo.getCodigo(),
                aeroportoOrigemEntity,
                aeroportoDestinoEntity
        );
    }
    public static ConsultaReservaResponseDto toConsultaReservaResponseDto(ReservaEntity reserva) {
        return ConsultaReservaResponseDto.builder()
                .codigo(reserva.getCodigo())
                .codigoCliente(reserva.getCodigoCliente())
                .estado(reserva.getEstado().name())
                .voo(null)
                .build();
    }
    public static ReservaResponseDto toReservaResponseDto(ReservaEntity reserva) {
        return new ReservaResponseDto(
                reserva.getCodigo(),
                reserva.getCodigoCliente(),
                reserva.getEstado().name(),
                reserva.getVoo().getCodigo(),
                Math.toIntExact(reserva.getQuantidadePoltronas())
        );
    }
}
