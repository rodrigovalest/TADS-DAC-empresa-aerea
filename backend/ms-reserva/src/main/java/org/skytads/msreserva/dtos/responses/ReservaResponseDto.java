package org.skytads.msreserva.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservaResponseDto {
    private Long codigo;
    private Long codigoCliente;
    private String estado;
    private Long codigoVoo;
    private Integer quantidadePoltronas;
}