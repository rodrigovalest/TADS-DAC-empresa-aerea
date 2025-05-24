package org.skytads.msreserva.mappers;

import org.skytads.msreserva.dtos.responses.CriarReservaVooResponseDto;
import org.skytads.msreserva.entities.AeroportoEntity;
import org.skytads.msreserva.entities.VooEntity;

import java.time.LocalDateTime;

public class VooMapper {
    public static VooEntity toEntity(CriarReservaVooResponseDto dto) {
        AeroportoEntity aeroportoOrigemEntity = new AeroportoEntity(
                dto.getAeroportoOrigem().getCodigo(),
                dto.getAeroportoOrigem().getNome(),
                dto.getAeroportoOrigem().getCidade(),
                dto.getAeroportoOrigem().getUf()
        );

        AeroportoEntity aeroportoDestinoEntity = new AeroportoEntity(
                dto.getAeroportoDestino().getCodigo(),
                dto.getAeroportoDestino().getNome(),
                dto.getAeroportoDestino().getCidade(),
                dto.getAeroportoDestino().getUf()
        );

        return new VooEntity(
                dto.getCodigo(),
                dto.getData(),
                aeroportoOrigemEntity,
                aeroportoDestinoEntity,
                dto.getValorPassagem(),
                dto.getQuantidadePoltronasTotal(),
                dto.getQuantidadePoltronasOcupadas()
        );
    }
}
