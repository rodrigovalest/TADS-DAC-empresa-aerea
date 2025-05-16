package org.skytads.msreserva.exceptions;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReservaNotFoundException extends RuntimeException {
    private Long codigoReserva;

    public ReservaNotFoundException(String message, Long codigoReserva) {
        super(message);
        this.codigoReserva = codigoReserva;
    }
}
