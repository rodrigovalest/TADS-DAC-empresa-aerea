package org.skytads.msauth.dtos.messages;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CriarFuncionarioMessageDto {
    private int codigo;
    private String cpf;
    private String email;
    private String senha;
}
