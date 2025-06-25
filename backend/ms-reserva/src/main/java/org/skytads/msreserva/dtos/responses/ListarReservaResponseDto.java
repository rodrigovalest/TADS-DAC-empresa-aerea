package org.skytads.msreserva.dtos.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.skytads.msreserva.enums.EstadoReservaEnum;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListarReservaResponseDto {
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
    private ListarReservaVooResponseDto voo;
}
