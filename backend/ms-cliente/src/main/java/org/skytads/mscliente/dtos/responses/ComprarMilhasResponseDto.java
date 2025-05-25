package org.skytads.mscliente.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComprarMilhasResponseDto {
    private Long codigo;
    private Long saldoMilhas;
}
