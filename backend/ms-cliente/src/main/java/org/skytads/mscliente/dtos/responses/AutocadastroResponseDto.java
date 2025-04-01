package org.skytads.mscliente.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class AutocadastroResponseDto {
    private Long codigo;
    private String cpf;
    private String email;
    private String nome;
}
