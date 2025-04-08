package org.skytads.msauth.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDto {
    private String accessToken;
    private String tokenType;
    private UsuarioResponseDto usuario;
    private String tipo;
}
