package org.skytads.msreserva.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.skytads.msreserva.enums.StatusVooEnum;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FindVooByCodigoResponseDto {
    private Long codigo;
    private String data;
    private String valorPassagem;
    private Long quantidadePoltronasTotal;
    private Long quantidadePoltronasOcupadas;
    private StatusVooEnum estado;
    private AeroportoResponseDto aeroportoOrigem;
    private AeroportoResponseDto aeroportoDestino;
}
