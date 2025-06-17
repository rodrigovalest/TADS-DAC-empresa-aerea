package org.skytads.msreserva.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.skytads.msreserva.enums.EstadoReservaEnum;

import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CriarReservaResponseDto {

    private Long codigo;
    private String data;
    private Float valor;
    @JsonProperty("milhas_utilizadas")
    private Long milhasUtilizadas;
    @JsonProperty("quantidade_poltronas")
    private Long quantidadePoltronas;

    @JsonProperty("codigo_cliente")
    private Long codigoCliente;
    private EstadoReservaEnum estado;

    private VooResponseDto voo;
}
