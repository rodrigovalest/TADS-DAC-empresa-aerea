package org.skytads.msfuncionarios.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AtualizarFuncionarioMessageDto {
    private Long codigo;
    private String cpf;
    private String oldEmail;
    private String newEmail;
    private String senha;
}
