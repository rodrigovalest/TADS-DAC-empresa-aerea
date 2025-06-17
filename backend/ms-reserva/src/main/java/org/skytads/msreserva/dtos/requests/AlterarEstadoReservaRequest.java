package org.skytads.msreserva.dtos.requests;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AlterarEstadoReservaRequest {

    @NotNull
    private String estado;

}