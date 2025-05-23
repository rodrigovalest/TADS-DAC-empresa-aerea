package org.skytads.mscliente.dtos.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComprarMilhasResponseDto {
    private Long codigo;

    @JsonProperty(namespace = "saldo_milhas")
    private Long saldoMilhas;
}
