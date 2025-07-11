package org.skytads.mscliente.dtos.responses;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ClienteResponseDto {
    private Long codigo;
    private String cpf;
    private String email;
    private String nome;
    private Long saldoMilhas;
    private EnderecoResponseDto endereco;
}
