package org.skytads.msvoos.mappers;

import org.skytads.msvoos.dtos.responses.*;
import org.skytads.msvoos.entities.VooEntity;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.stream.Collectors;

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

    public static CriarReservaVooResponseDto toCriarReservaVooResponseDto(VooEntity voo) {
        return new CriarReservaVooResponseDto(
                voo.getCodigo(),
                OffsetDateTime.of(voo.getData(), ZoneOffset.of("-03:00")).toString(),
                voo.getValorPassagem(),
                voo.getQuantidadePoltronas(),
                voo.getQuantidadePoltronasOcupadas(),
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

    public static ListarVoosPorParamsResponseDto toListarVooPorParamsResponseDto(
            String origem,
            String destino,
            LocalDate inicio,
            LocalDate fim,
            LocalDate data,
            List<VooEntity> voos
    ) {
        List<VooResponseDto> voosDto = voos.stream()
                .map(VooMapper::toVooResponseDto)
                .collect(Collectors.toList());

        return new ListarVoosPorParamsResponseDto(
                inicio != null ? inicio.toString() : null,
                fim != null ? fim.toString() : null,
                data != null ? data.toString() : null,
                origem,
                destino,
                voosDto
        );
    }

    public static AlterarEstadoVooResponseDto toAlterarEstadoVooResponseDto(VooEntity voo) {
        return new AlterarEstadoVooResponseDto(
                voo.getCodigo(),
                voo.getStatusVoo(),
                OffsetDateTime.of(voo.getData(), ZoneOffset.of("-03:00")).toString(),
                voo.getValorPassagem(),
                voo.getQuantidadePoltronas(),
                voo.getQuantidadePoltronasOcupadas(),
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
