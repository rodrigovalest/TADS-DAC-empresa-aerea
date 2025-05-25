package org.skytads.msreserva.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.skytads.msreserva.enums.EstadoReservaEnum;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CriarReservaResponseDto {
    private Long codigo;
    private String data;
    private Float valor;
    private Long milhasUtilizadas;
    private Long quantidadePoltronas;
    private Long codigoCliente;
    private EstadoReservaEnum estado;
    private Long codigoVoo;
    private AeroportoResponseDto aeroportoOrigem;
    private AeroportoResponseDto aeroportoDestino;
}
