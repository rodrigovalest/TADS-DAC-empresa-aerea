package org.skytads.msvoos.dtos.messages;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CriarReservaVooMessageResponseDto {
    private Boolean success;
    private String info;
    private Long reservaId;
    private Long codigoVoo;
    private Float valorPassagem;
}
