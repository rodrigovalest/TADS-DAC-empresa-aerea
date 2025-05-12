package org.skytads.msreserva.dtos.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VooResponseDto {
    private Long codigo;

    @JsonProperty("aeroporto_origem")
    private AeroportoResponseDto aeroportoOrigem;

    @JsonProperty("aeroporto_destino")
    private AeroportoResponseDto aeroportoDestino;
}
