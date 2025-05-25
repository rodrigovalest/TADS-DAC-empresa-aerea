package org.skytads.msfuncionarios.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MensagemCriarUsuarioDTO {
    private Long codigo;
    private String cpf;
    private String email;
    private String senha;
}