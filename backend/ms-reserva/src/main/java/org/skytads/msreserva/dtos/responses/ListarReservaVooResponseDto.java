package org.skytads.msreserva.dtos.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListarReservaVooResponseDto {
    private Long codigo;
    private String data;

    @JsonProperty("aeroporto_origem")
    private AeroportoResponseDto aeroportoOrigem;

    @JsonProperty("aeroporto_destino")
    private AeroportoResponseDto aeroportoDestino;
}
