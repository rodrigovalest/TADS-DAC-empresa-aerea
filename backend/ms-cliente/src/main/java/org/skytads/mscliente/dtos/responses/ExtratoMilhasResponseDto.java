package org.skytads.mscliente.dtos.responses;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExtratoMilhasResponseDto {
    private Long codigo;
    private Long saldoMilhas;
    private List<TransacaoMilhaResponseDto> transacoes;
}
