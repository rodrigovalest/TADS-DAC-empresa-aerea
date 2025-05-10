package org.skytads.msreserva.dtos.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CriarReservaResponseDto {
    private Long codigo;

    @JsonProperty("codigo_cliente")
    private Long codigoCliente;

    private String estado;

    private VooResponseDto voo;
}
