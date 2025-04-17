package org.skytads.msvoos.mappers;

import org.skytads.msvoos.dtos.responses.AeroportoResponseDto;
import org.skytads.msvoos.entities.AeroportoEntity;

import java.util.List;
import java.util.stream.Collectors;

public class AeroportoMapper {
    public static AeroportoResponseDto toAeroportoResponseDto(AeroportoEntity aeroportoEntity) {
        return new AeroportoResponseDto(
                aeroportoEntity.getCodigo(),
                aeroportoEntity.getNome(),
                aeroportoEntity.getCidade(),
                aeroportoEntity.getUf()
        );
    }

    public static List<AeroportoResponseDto> toAeroportoResponseDto(List<AeroportoEntity> aeroportoEntityList) {
        return aeroportoEntityList.stream()
                .map(AeroportoMapper::toAeroportoResponseDto)
                .collect(Collectors.toList());
    }
}
