package org.skytads.msreserva.dtos.requests;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CriarReservaVooRequestDto {

    @JsonProperty("quantidadePoltronas")
    private Long quantidadePoltronas;
    
}
