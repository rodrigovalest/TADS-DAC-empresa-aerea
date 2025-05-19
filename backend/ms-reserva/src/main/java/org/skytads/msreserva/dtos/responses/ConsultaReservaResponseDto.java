package org.skytads.msreserva.dtos.responses;

import org.skytads.msreserva.entities.VooDto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ConsultaReservaResponseDto {
    private Long codigo;
    private Long codigoCliente;
    private String estado;
    private VooDto voo;
}