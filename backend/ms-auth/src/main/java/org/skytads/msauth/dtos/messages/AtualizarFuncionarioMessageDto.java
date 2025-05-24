package org.skytads.msauth.dtos.messages;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AtualizarFuncionarioMessageDto {
    private String codigo;
    private String cpf;
    private String oldEmail;
    private String newEmail;
    private String senha;
}
