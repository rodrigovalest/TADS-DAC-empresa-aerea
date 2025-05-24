package org.skytads.msvoos.mappers;

import org.skytads.msvoos.dtos.responses.AeroportoResponseDto;
import org.skytads.msvoos.dtos.responses.CriarVooResponseDto;
import org.skytads.msvoos.dtos.responses.VooResponseDto;
import org.skytads.msvoos.entities.VooEntity;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

public class VooMapper {
    public static CriarVooResponseDto toCriarVooResponseDto(VooEntity voo) {
        return new CriarVooResponseDto(
                voo.getCodigo(),
                OffsetDateTime.of(voo.getData(), ZoneOffset.of("-03:00")).toString(),
                String.format("%.2f", voo.getValorPassagem()),
                voo.getQuantidadePoltronas(),
                voo.getQuantidadePoltronasOcupadas(),
                voo.getStatusVoo(),
                new AeroportoResponseDto(
                        voo.getAeroportoOrigem().getCodigo(),
                        voo.getAeroportoOrigem().getNome(),
                        voo.getAeroportoOrigem().getCidade(),
                        voo.getAeroportoOrigem().getUf()
                ),
                new AeroportoResponseDto(
                        voo.getAeroportoDestino().getCodigo(),
                        voo.getAeroportoDestino().getNome(),
                        voo.getAeroportoDestino().getCidade(),
                        voo.getAeroportoDestino().getUf()
                )
        );
    }

    public static VooResponseDto toVooResponseDto(VooEntity voo) {
        return new VooResponseDto(
                voo.getCodigo(),
                OffsetDateTime.of(voo.getData(), ZoneOffset.of("-03:00")).toString(),
                String.format("%.2f", voo.getValorPassagem()),
                voo.getQuantidadePoltronas(),
                voo.getQuantidadePoltronasOcupadas(),
                voo.getStatusVoo(),
                new AeroportoResponseDto(
                        voo.getAeroportoOrigem().getCodigo(),
                        voo.getAeroportoOrigem().getNome(),
                        voo.getAeroportoOrigem().getCidade(),
                        voo.getAeroportoOrigem().getUf()
                ),
                new AeroportoResponseDto(
                        voo.getAeroportoDestino().getCodigo(),
                        voo.getAeroportoDestino().getNome(),
                        voo.getAeroportoDestino().getCidade(),
                        voo.getAeroportoDestino().getUf()
                )
        );
    }
}
