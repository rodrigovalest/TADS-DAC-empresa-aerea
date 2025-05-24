package org.skytads.msreserva.dtos.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CriarReservaVooRequestDto {
    private Long quantidadePoltronas;
}
