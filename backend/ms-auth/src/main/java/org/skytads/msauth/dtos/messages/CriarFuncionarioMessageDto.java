package org.skytads.msauth.dtos.messages;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CriarFuncionarioMessageDto {
    private String codigo;
    private String cpf;
    private String email;
    private String senha;
}
