package org.skytads.msreserva.dtos.messages;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CriarReservaClienteMessageDto {
    private String info;
    private Long reservaId;
    private Long codigoCliente;
    private Long milhasUtilizadas;
    private Float valor;
}
