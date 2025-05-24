package org.skytads.msvoos.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.skytads.msvoos.enums.StatusVooEnum;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VooResponseDto {
    private Long codigo;
    private String data;
    private String valorPassagem;
    private Long quantidadePoltronasTotal;
    private Long quantidadePoltronasOcupadas;
    private StatusVooEnum estado;
    private AeroportoResponseDto aeroportoOrigem;
    private AeroportoResponseDto aeroportoDestino;
}
