package org.skytads.msreserva.dtos.responses;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VooDto {
    private Long codigo;
    private AeroportoDto aeroportoOrigem;
    private AeroportoDto aeroportoDestino;
}