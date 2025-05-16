package org.skytads.msreserva.dtos.messages;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CriarReservaReverterPoltronasMessageDto {
    private String info;
    private Long reservaId;
    private Long codigoVoo;
    private Long quantidadePoltronas;
}
