package org.skytads.msreserva.dtos.messages;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CriarReservaVooResponseMessageDto {
    private Boolean success;
    private String info;
    private Long reservaId;
    private Long codigoVoo;
    private Float valorPassagem;
}
