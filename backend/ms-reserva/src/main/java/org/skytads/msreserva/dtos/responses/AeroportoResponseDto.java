package org.skytads.msreserva.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AeroportoResponseDto {
    private String codigo;
    private String nome;
    private String cidade;
    private String uf;
}
