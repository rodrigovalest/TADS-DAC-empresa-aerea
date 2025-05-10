package org.skytads.mscliente.dtos.messages;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CriarReservaResponseMessageDto {
    private Boolean success;
    private String info;
    private Long reservaId;
    private Long codigoCliente;
}
