package org.skytads.mscliente.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExtratoMilhasResponseDto {
    private Long codigo;
    private Long saldoMilhas;
    private List<TransacaoMilhaResponseDto> transacoes;
}
