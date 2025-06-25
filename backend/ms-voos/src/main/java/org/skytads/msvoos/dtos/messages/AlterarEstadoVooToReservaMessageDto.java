package org.skytads.msvoos.dtos.messages;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AlterarEstadoVooToReservaMessageDto {
    private String info;
    private Long codigoVoo;
}
