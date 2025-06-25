package org.skytads.msvoos.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.skytads.msvoos.enums.EstadoReservaEnum;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FindReservaByIdResponseDto {
    private Long codigo;
    private String data;
    private Float valor;
    private Long milhasUtilizadas;
    private Long quantidadePoltronas;
    private Long codigoCliente;
    private EstadoReservaEnum estado;
    private VooFindReservaByIdResponseDto voo;
}
