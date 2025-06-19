package org.skytads.msreserva.dtos.requests;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.skytads.msreserva.enums.EstadoReservaEnum;

@Data
public class AlterarEstadoReservaRequestDto {

    @NotNull
    private EstadoReservaEnum estado;
}
