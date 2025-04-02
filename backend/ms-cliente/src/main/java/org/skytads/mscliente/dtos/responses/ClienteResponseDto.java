package org.skytads.mscliente.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ClienteResponseDto {
    private String cpf;
    private String email;
    private String nome;
    private Long saldoMilhas;
    private EnderecoResponseDto endereco;
}
