package org.skytads.msvoos.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CriarReservaVooResponseDto {
    private Long codigo;
    private String data;
    private Float valorPassagem;
    private Long quantidadePoltronasTotal;
    private Long quantidadePoltronasOcupadas;
    private AeroportoResponseDto aeroportoOrigem;
    private AeroportoResponseDto aeroportoDestino;
}
