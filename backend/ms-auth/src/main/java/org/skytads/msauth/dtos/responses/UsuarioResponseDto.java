package org.skytads.msauth.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UsuarioResponseDto {
    private String codigo;
    private String cpf;
    private String email;
}
