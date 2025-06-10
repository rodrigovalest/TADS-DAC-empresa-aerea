package org.skytads.msvoos.dtos.responses;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
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
