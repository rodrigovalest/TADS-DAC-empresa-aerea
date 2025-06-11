package org.skytads.mscliente.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservaResponseDto {
    private Long codigo;
    private Long codigoCliente;
    private Long codigoVoo;
    private Long quantidadePoltronas;
    private LocalDateTime dataReserva;
    private String estado;
}